import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        category: post?.category || "AI",
      },
    });

  const navigate = useNavigate();

  // Grabs user state from auth slice
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("Submit clicked", data);

    // 1. CRITICAL GUARD: Stop execution if Redux lost user state due to a page refresh/disconnect
    if (!userData) {
      alert(
        "Submission blocked: You do not seem to be logged in. Your session might have expired or disconnected. Please refresh and log in again.",
      );
      console.error("Submit aborted: state.auth.userData is undefined.");
      return;
    }

    // 2. BACKUP GUARD: Extract user ID safely from the object structure
    const userId = userData.$id;
    if (!userId) {
      alert(
        "Submission blocked: Could not locate your User ID profile token. Try logging out and back in.",
      );
      console.error("userData exists but lacks an '$id' key:", userData);
      return;
    }

    try {
      if (post) {
        // UPDATE POST OPERATION
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            
            
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // CREATE NEW POST OPERATION
        if (!data.image || !data.image[0]) {
          alert("Please select a featured image before submitting.");
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          data.featuredImage = file.$id;

          // Safely binding the verified userId here
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Appwrite service error during post handling:", error);
      alert(
        "A network error occurred while reaching Appwrite Cloud. Please check your internet connection stability and try again.",
      );
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B] py-10">
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-7xl mx-auto flex flex-wrap gap-6"
    >
      {/* Left Section */}
      <div className="w-full lg:w-[65%] bg-[#1E293B]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-6">
        <Input
          label="Title"
          placeholder="Enter blog title"
          className="
            w-full
            bg-[#111827]
            border
            border-slate-700
            text-white
            placeholder:text-slate-400
            rounded-xl
            px-4
            py-3
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/30
            transition-all
          "
          {...register("title", { required: true })}
        />

        {/* Category */}
        <div className="mt-6">
          <label className="block text-slate-200 font-medium mb-2">
            Category
          </label>

          <select
            {...register("category", { required: true })}
            className="
              w-full
              bg-[#111827]
              border
              border-slate-700
              text-white
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/30
              focus:border-blue-500
              transition-all
            "
          >
            Select a category
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="DSA">DSA</option>
            <option value="AI">AI</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Slug */}
        <div className="mt-6">
          <Input
            label="Slug"
            placeholder="Slug"
            className="
              w-full
              bg-[#111827]
              border
              border-slate-700
              text-white
              placeholder:text-slate-400
              rounded-xl
              px-4
              py-3
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/30
              transition-all
            "
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>

        {/* Editor */}
        <div className="mt-6 text-white ">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[32%]">
        <div className="bg-[#1E293B]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-6">

          <Input
            label="Featured Image"
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/gif"
            className="
              w-full
              bg-[#111827]
              border
              border-slate-700
              text-white
              rounded-xl
              px-4
              py-3
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/30
              transition-all
            "
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full my-6">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="rounded-xl border border-slate-700"
              />
            </div>
          )}

          <div className="mt-6">
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="bg-[#111827] text-white border border-slate-700 rounded-xl"
              {...register("status", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="
              w-full
              mt-8
              py-3
              rounded-xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-violet-600
              hover:from-blue-500
              hover:via-indigo-500
              hover:to-violet-500
              transition-all
              duration-300
              shadow-lg
              hover:shadow-blue-500/30
            "
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  </div>
)
};
