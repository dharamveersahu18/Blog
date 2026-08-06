import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import PostCard from "../component/PostCard";
import { Link } from "react-router-dom";

function MyPosts() {

  const userData = useSelector((state) => state.auth.userData);

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (userData) {

      const fetchPosts = async () => {
        try {
          const posts = await appwriteService.getUserPosts(userData.$id);
          setPosts(posts.documents || []);
        } 
        catch (error) {
          console.log("My Posts Error:", error);
        }
      };

      fetchPosts();
    }

  }, [userData]);


return (
  <div
    className="
        min-h-screen
        bg-slate-950
        pt-28
        pb-16
        px-4
    "
>

    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">
        My Posts
      </h1>
      <p className="text-slate-400 mt-1 font-semibold text-2xl">
        Manage and explore your published posts
      </p>
    </div>

    

      {
        posts.length > 0 ? (
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6
          ">
            {
              posts.map((post) => (
                <div
                  key={post.$id}
                  className="
                    border 
                    border-slate-700
                    rounded-xl
                    overflow-hidden
                    hover:border-blue-500
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  <PostCard {...post} />
                </div>
              ))
            }
          </div>
        ) : (
          <div className="
            text-center 
            py-16 
            text-gray-400
          ">
            <h2 className="text-xl font-semibold">
              No Posts Yet
            </h2>
            <p className="mt-2">
              Start creating your first post 🚀
            </p>
          </div>
        )
      }

    </div>

 
);
}
export default MyPosts;