import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../component";
import { useSelector } from "react-redux";
import Hero from "../component/Hero";
import TrendingPosts from "../component/TrendingPosts"
import Categories from "../component/Categories";
import NewsLetter from "../component/NewsLetter";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 
  const authStatus = useSelector((state) => state.auth.status);
  

  useEffect(() => {
    console.log("1. Home component mounted! Fetching posts...");

    if (!authStatus) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    appwriteService
      .getPosts()
      .then((res) => {
        console.log("2. Appwrite server response received:", res);
        if (res && res.documents) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        console.error("Home component :: getPosts :: error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authStatus]);

  // Show a small message while reading data from Appwrite
return (
  <>
    <Hero />

    <TrendingPosts />

    <Categories />

    <section className="py-20 bg-slate-950">
  <Container>

    {/* Section Header */}
    <div className="mb-12">

      <span className="
        text-blue-500
        font-semibold
        uppercase
        tracking-widest
        text-sm
      ">
        Recent Posts
      </span>

      <h2 className="
        text-4xl
        md:text-5xl
        font-bold
        text-white
        mt-3
      ">
        Latest Articles
      </h2>

      <p className="
        text-slate-400
        mt-4
        max-w-2xl
      ">
        Explore the latest blogs, tutorials, and insights from our developer
        community.
      </p>

    </div>


    {loading ? (

      <div className="
        text-center
        py-12
        text-white
      ">
        Loading posts...
      </div>


    ) : !authStatus ? (

      <div className="
        text-center
        py-16
        rounded-3xl
        bg-slate-900
        border
        border-white/10
      ">
        <h3 className="
          text-xl
          font-semibold
          text-white
        ">
          Login to explore blogs
        </h3>

        <p className="
          mt-2
          text-slate-400
        ">
          Create an account and start reading amazing articles.
        </p>

      </div>


    ) : posts.length === 0 ? (

      <div className="
        text-center
        py-16
        rounded-3xl
        bg-slate-900
        border
        border-white/10
      ">

        <h3 className="
          text-2xl
          font-bold
          text-white
        ">
          No blogs found 🚀
        </h3>

        <p className="
          mt-3
          text-slate-400
        ">
          Be the first developer to publish an article.
        </p>

      </div>


    ) : (

      <div className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-4
      ">

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

    <NewsLetter />
  </>
);
}