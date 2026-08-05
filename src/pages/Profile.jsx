import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);

  const [posts, setPosts] = useState([]);

  const [stats, setStats] = useState({
    likes: 0,
    views: 0,
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!userData) return;

      const res = await appwriteService.getUserPosts(userData.$id);

      if (!res) return;

      const userPosts = await Promise.all(
        res.documents.map(async (post) => {
          const likeData = await appwriteService.getPostLikes(post.$id);

          return {
            ...post,
            likes: likeData.total,
          };
        }),
      );

      setPosts(userPosts);

      const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);

      const totalViews = userPosts.reduce(
        (sum, post) => sum + (post.views || 0),
        0,
      );

      setStats({
        likes: totalLikes,
        views: totalViews,
      });
    };

    loadProfile();
  }, [userData]);

  return (
    <section className="min-h-screen bg-slate-950 py-20">
      <Container>
        <div
          className="
max-w-xl
mx-auto
bg-slate-900
border
border-white/10
rounded-3xl
p-8
shadow-xl
"
        >
          {/* Avatar */}

          <div className="flex justify-center">
            <div
              className="
w-28
h-28
rounded-full
bg-gradient-to-r
from-blue-500
to-indigo-600
flex
items-center
justify-center
text-4xl
font-bold
text-white
"
            >
              {userData?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>

          {/* User Info */}

          <div className="text-center mt-6">
            <h1
              className="
text-3xl
font-bold
text-white
"
            >
              {userData?.name}
            </h1>

            <p
              className="
text-slate-400
mt-2
"
            >
              {userData?.email}
            </p>

            <p className="text-slate-400 mt-2">
              Joined on {new Date(userData?.$createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats */}

          <div
            className="
grid
grid-cols-3
gap-4

mt-8
"
          >
            <div
              className="
bg-slate-800
rounded-xl
p-4
text-center
"
            >
              <h3 className="text-white font-bold">{posts.length}</h3>

              <p className="text-slate-400 text-sm">Posts</p>
            </div>

            <div
              className="
bg-slate-800
rounded-xl
p-4
text-center
"
            >
              <h3 className="text-white font-bold">{stats.likes}</h3>

              <p className="text-slate-400 text-sm">Likes</p>
            </div>

            <div
              className="
bg-slate-800
rounded-xl
p-4
text-center
"
            >
              <h3 className="text-white font-bold">{stats.views}</h3>

              <p className="text-slate-400 text-sm">Views</p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-8 space-y-3">
            <button
              className="
w-full
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
transition
"
            >
              Edit Profile
            </button>
          </div>

          {/* Recent Posts */}

          <div className="mt-10">
            <h2
              className="
text-xl
font-bold
text-white
mb-4
"
            >
              Recent Posts
            </h2>

            {posts.length === 0 ? (
              <p className="text-slate-400">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.$id}
                  className="
bg-slate-800
rounded-xl
p-4
mb-3
"
                >
                  <h3
                    className="
text-white
font-semibold
"
                  >
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Profile;
