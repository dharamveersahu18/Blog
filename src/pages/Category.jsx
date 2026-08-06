import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostCard } from "../component";

// Map short route IDs to their actual category titles in the Database
const categoryNameMap = {
  travel: "Travel",
  food: "Food & Recipes",
  business: "Business & Finance",
  lifestyle: "Lifestyle & Wellness",
  tech: "Tech & Software",
};

function Category() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get display title or fallback to URL param
  const currentCategoryTitle =
    categoryNameMap[categoryName?.toLowerCase()] || categoryName;

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts([]).then((response) => {
      if (response && response.documents) {
        console.log("All posts from DB:", response.documents); // Helpful for debugging

        const filteredPosts = response.documents.filter((post) => {
          if (!post.category) return false;

          const dbCat = post.category.toLowerCase().trim();
          const targetCat = currentCategoryTitle.toLowerCase().trim();
          const rawUrlParam = categoryName.toLowerCase().trim();

          // Match exact title, short ID, or partial name
          return (
            dbCat === targetCat ||
            dbCat === rawUrlParam ||
            dbCat.includes(rawUrlParam) ||
            rawUrlParam.includes(dbCat)
          );
        });

        setPosts(filteredPosts);
      }
      setLoading(false);
    });
  }, [categoryName]);

  if (loading) {
    return (
      <section className="bg-slate-950 min-h-screen py-20 flex items-center justify-center">
        <p className="text-xl text-slate-400">Loading posts...</p>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl text-white font-bold mb-10">
          {currentCategoryTitle} Articles
        </h1>

        {/* Display Posts or Empty Fallback */}
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-2">
              No posts found
            </h2>
            <p className="text-slate-400">
              There are currently no published posts under{" "}
              <span className="text-blue-400 font-semibold">
                "{currentCategoryTitle}"
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;