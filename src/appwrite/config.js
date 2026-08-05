import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create Post

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    provider,
    category,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,

        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
          provider,
          category,
          views: 0,
        },
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error", error);
    }
  }

  // Update Post

  async updatePost(slug, { title, content, featuredImage, status, category }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          category,
        },
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error", error);
    }
  }

  // Delete Post

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );

      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);

      return false;
    }
  }

  // Get Single Post

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);

      return false;
    }
  }

  // Get All Posts

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: error", error);

      return false;
    }
  }

  // User Posts

  async getUserPosts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log("Appwrite Service :: getUserPosts :: error", error);
    }
  }

  // Views

  async incrementViewCount(postId, currentViews) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        postId,
        {
          views: currentViews + 1,
        },
      );
    } catch (error) {
      console.log("Appwrite Service :: incrementViewCount :: error", error);
    }
  }

  // LIKE POST

  async likePost(postId, userId, email) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostLikesCollectionId,
        ID.unique(),
        {
          postId,
          userId,
          userEmail: email,
        },
      );
    } catch (error) {
      console.log("Appwrite Service :: likePost :: error", error);
    }
  }

  // REMOVE LIKE

  async unlikePost(likeId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostLikesCollectionId,
        likeId,
      );
    } catch (error) {
      console.log("Appwrite Service :: unlikePost :: error", error);
    }
  }

  // Get Likes

  async getPostLikes(postId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostLikesCollectionId,
        [Query.equal("postId", postId)],
      );
    } catch (error) {
      console.log("Appwrite Service :: getPostLikes :: error", error);

      return {
        total: 0,
        documents: [],
      };
    }
  }

  // Check User Already Liked

  async checkLike(postId, userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostLikesCollectionId,
        [Query.equal("postId", postId), Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log("Appwrite Service :: checkLike :: error", error);

      return {
        total: 0,
        documents: [],
      };
    }
  }

  // File Upload

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);

      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);

      return false;
    }
  }

  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  async updateUserProfile(userId, data) {
    try {
      console.log("Updating user:");
      console.log("Collection:", conf.appwriteUsersCollectionId);
      console.log("Document:", userId);
      console.log("Data:", data);

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId,
        data,
      );
    } catch (error) {
      console.log("Update Profile Error", error);
    }
  }
}

const service = new Service();

export default service;
