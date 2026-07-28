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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        {/* Cataegory  */}
        <div className=" mt-2 mb-4">
          <label className=" block  text-gray-900">Category</label>

          <select
            className="w-full bg-slate-800 text-white p-3 rounded-lg"
            {...register("category", {
              required: true,
            })}
          >
            <option value="">Select Category</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="DSA">DSA</option>
            <option value="AI">AI</option>
            <option value="Career">Career</option>
          </select>
        </div>

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
