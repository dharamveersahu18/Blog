import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../component";
import Button from "../component/Button";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";

export default function Post() {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(0);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Fetch Post

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then(async (res) => {
        if (res) {
          setPost(res);

          const likeData = await appwriteService.getPostLikes(res.$id);

          setLikes(likeData.total);

          // check current user liked or not
          if (userData) {
            const check = await appwriteService.checkLike(
              res.$id,
              userData.$id,
            );

            if (check.total > 0) {
              setLiked(true);
            }
          }

          setViews(res.views || 0);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate, userData]);

  // Increase Views

  useEffect(() => {
    if (post) {
      appwriteService.incrementViewCount(post.$id, post.views || 0).then(() => {
        setViews((post.views || 0) + 1);
      });
    }
  }, [post]);

  const handleLike = async () => {
    if (!userData) {
      return;
    }

    try {
      const check = await appwriteService.checkLike(post.$id, userData.$id);

      if (check.total > 0) {
        // already liked
        await appwriteService.unlikePost(check.documents[0].$id);

        setLiked(false);
        setLikes((prevs) => Math.max(0, prevs - 1));
      } else {
        await appwriteService.likePost(post.$id, userData.$id, userData.email);

        setLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Post.jsx :: handleLike :: error", error);
    }
  };

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);

        navigate("/");
      }
    });
  };

  if (!post) {
    return null;
  }

  //                      Return
  return (
    <div
      className="
py-12
pt-28
w-full
"
    >
      <Container>
        <div
          className="
w-full
bg-slate-900
border
border-white/10
rounded-2xl
p-5
"
        >
          {/* IMAGE */}

          <div
            className="
flex
justify-center
"
          >
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="
rounded-xl
max-h-[600px]
object-contain
w-full
"
            />
          </div>

          {/* ACTION BAR */}

          <div
            className="
flex
justify-between
items-center
mt-6
flex-wrap
gap-4
"
          >
            <div
              className="
flex
items-center
gap-4
"
            >
              <div>
                <button
                  onClick={handleLike}
                  className="
flex
items-center
gap-3
px-4
py-2
rounded-xl
bg-slate-800
hover:bg-slate-700
text-lg
transition
"
                >
                  <span className="text-2xl">{liked ? "❤️" : "🤍"}</span>

                  <span className="text-white font-semibold">{likes}</span>
                </button>
              </div>

              <div
                className="
flex
items-center
gap-3
px-4
py-2
rounded-xl
bg-slate-800
text-slate-300
hover:bg-slate-700
transition
"
              >
                <span className="text-xl">👁</span>

                <span className="font-semibold text-white">{views}</span>

                <span className="text-sm text-slate-400"></span>
              </div>
            </div>

            {isAuthor && (
              <div
                className="
flex
gap-3
"
              >
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>

                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* TITLE */}

          <div
            className="
mt-8
"
          >
            <h1
              className="
text-3xl
font-bold
text-white
"
            >
              {post.title}
            </h1>
          </div>

          {/* CONTENT */}

          <div
            className="
mt-6
text-slate-300
browser-css
"
          >
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  );
}
