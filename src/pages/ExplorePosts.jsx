import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../component";
import appwriteService from "../appwrite/config";

function ExplorePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    appwriteService
      .getPosts()
      .then((response) => {
        if (response?.documents) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.log("Explore Posts Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  return (
    <section className="min-h-screen bg-slate-950 py-20">

      <Container>

        {/* Header */}

        <div className="mb-12">

          <span
            className="
            text-blue-500
            font-semibold
            uppercase
            tracking-widest
            text-sm
            "
          >
            Explore
          </span>


          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-white
            mt-3
            "
          >
            Explore All Articles
          </h1>


          <p
            className="
            text-slate-400
            mt-4
            max-w-2xl
            "
          >
            Discover tutorials, experiences and knowledge shared by our
            developer community.
          </p>

        </div>



        {/* Loading */}

        {loading && (
          <div className="text-center py-16">

            <p className="text-white text-lg">
              Loading articles...
            </p>

          </div>
        )}



        {/* Empty State */}

        {!loading && posts.length === 0 && (

          <div
            className="
            text-center
            py-16
            rounded-3xl
            bg-slate-900
            border
            border-white/10
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-white
              "
            >
              No articles found 🚀
            </h2>


            <p className="text-slate-400 mt-3">
              Be the first one to publish an article.
            </p>

          </div>

        )}



        {/* Posts */}

        {!loading && posts.length > 0 && (

          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            "
          >

            {posts.map((post) => (

              <PostCard
                key={post.$id}
                {...post}
              />

            ))}

          </div>

        )}


      </Container>

    </section>
  );
}

export default ExplorePosts;