import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// $id => Appwrite document id
function PostCard({ $id, title, featuredImage, category }) {
  console.log({
    id:$id,
    title,
    featuredImage
  });
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="
        w-full
        bg-slate-900
        rounded-xl
        p-4
        hover:scale-105
        transition
        duration-300
      "
      >
        <div
          className="
          w-full
          mb-4
        "
        >
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="
              rounded-xl
              w-full
              h-52
              object-cover
            "
          />
        </div>
  <p className="text-blue-400 text-sm mt-3">
        {category}
      </p>

        <h2
          className="
          text-xl
          font-bold
          text-white
        "
        >
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
