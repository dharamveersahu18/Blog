import React from "react";
import { Clock3, Eye, Heart, ArrowRight } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
  import { useEffect, useState } from "react";
import appwriteService from '../appwrite/config'


function TrendingPosts() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const loadTrending = async () => {
    try {
      const response = await appwriteService.getPosts();

      if (!response) return;

      const postsWithLikes = await Promise.all(
        response.documents.slice(0, 3).map(async (post) => {
          const likeData = await appwriteService.getPostLikes(post.$id);

          console.log(post.title, likeData.total);

          return {
            ...post,
            likes: likeData.total,
          };
        })
      );

      setBlogs(postsWithLikes);
    } catch (err) {
      console.log(err);
    }
  };

  loadTrending();
}, []);
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-blue-500 font-semibold uppercase tracking-widest">
              Featured
            </span>

            <h2 className="text-4xl font-bold text-white mt-2">
              🔥 Trending Blogs
            </h2>

            <p className="text-slate-400 mt-3">
              Discover the most popular articles loved by developers.
            </p>
          </div>

           <button
    onClick={() => navigate("/explore")}
    className="
      mt-6 md:mt-0
      flex items-center justify-center gap-2
      w-full md:w-auto
      px-6 py-3
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-semibold
      transition
    "
  >
    View All
    <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
             
     
                 
          {blogs.map((blog) => (
            <Link
                  to={`/post/${blog.$id}`}
                  className="text-blue-400 hover:text-white transition">
            <article
              key={blog.$id}
              className="
              group
              overflow-hidden
              rounded-3xl
              bg-slate-900
              border
              border-white/10
              hover:border-blue-500/40
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              hover:shadow-blue-500/20
            "
            >
             
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={appwriteService.getFileView(blog.featuredImage)}
                  alt={blog.title}
                  className="
                    h-60
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Badge */}

                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
              </div>

              {/* Content */}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
                  {blog.title}
                </h3>


                {/* Author */}

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${blog.author || "Anonymous"}`}
                      alt={blog.author}
                      className="w-11 h-11 rounded-full"
                    />

                    <div>
                      <h4 className="text-white text-sm font-semibold">
                        {blog.author}
                      </h4>

                      <p className="text-slate-500 text-xs">
                        {blog.$createdAt}
                      </p>
                    </div>
                  </div>

               <span className="text-blue-400 hover:text-white transition">
   Read →
</span>
                
                </div>

                {/* Footer */}

                <div className="flex justify-between mt-6 pt-5 border-t border-white/10 text-slate-400 text-sm">
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {blog.readTime}
                  </span>

                  <span className="flex items-center gap-2">
                    <Eye size={16} />
                    {blog.views}
                  </span>

                  <span className="flex items-center gap-2">
                    <Heart size={16} />
                    {blog.likes}
                  </span>
                </div>
              </div>
            </article> 
             </Link>
          ))}
        
        </div>

      
      </div>
    </section>
  );
}

export default TrendingPosts;
