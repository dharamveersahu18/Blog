import React from "react";
import { Clock3, Eye, Heart, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    readTime: "5 min read",
    author: "John Doe",
    date: "15 Jul 2026",
    views: "2.4k",
    likes: "310",
  },
  {
    id: 2,
    title: "Master JavaScript in 2026",
    category: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    readTime: "7 min read",
    author: "Dharam",
    date: "20 Jul 2026",
    views: "4.8k",
    likes: "720",
  },
  {
    id: 3,
    title: "Tailwind CSS Tips",
    category: "Tailwind CSS",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    readTime: "4 min read",
    author: "Alex",
    date: "24 Jul 2026",
    views: "1.9k",
    likes: "180",
  },
];

function TrendingPosts() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="flex items-end justify-between mb-12">
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

          <button className="hidden md:flex items-center gap-2 text-blue-400 hover:text-white transition">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
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
                  src={blog.image}
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

                <p className="text-slate-400 mt-3 leading-7">
                  Learn modern concepts with practical examples and improve your
                  development skills.
                </p>

                {/* Author */}

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${blog.author}`}
                      alt={blog.author}
                      className="w-11 h-11 rounded-full"
                    />

                    <div>
                      <h4 className="text-white text-sm font-semibold">
                        {blog.author}
                      </h4>

                      <p className="text-slate-500 text-xs">
                        {blog.date}
                      </p>
                    </div>
                  </div>

                  <button className="text-blue-400 hover:text-white transition">
                    Read →
                  </button>
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
          ))}
        </div>

        {/* Mobile Button */}

        <div className="flex justify-center mt-12 md:hidden">
          <button className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
}

export default TrendingPosts;