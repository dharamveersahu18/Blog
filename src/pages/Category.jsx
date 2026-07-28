import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostCard } from "../component";

function Category() {

    const {categoryName} = useParams();

    const [posts,setPosts] = useState([]);


    useEffect(()=>{

        appwriteService.getPosts([])
        .then((posts)=>{

            if(posts){
                const filteredPosts = posts.documents.filter(
                    (post)=>post.category === categoryName
                );

                setPosts(filteredPosts);
            }

        })


    },[categoryName])


    return (

        <section className="bg-slate-950 min-h-screen py-20">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-4xl text-white font-bold mb-10">
                    {categoryName} Articles
                </h1>


                <div className="grid md:grid-cols-3 gap-6">

                    {
                        posts.map((post)=>(
                            <PostCard
                              key={post.$id}
                              {...post}
                            />
                        ))
                    }

                </div>


            </div>

        </section>

    )
}


export default Category;