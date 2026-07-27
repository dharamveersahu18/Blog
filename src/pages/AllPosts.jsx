import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../component";
import appwriteService from "../appwrite/config";

function AllPosts() {

    const [posts, setPosts] = useState([]);


    useEffect(() => {

        appwriteService.getPosts()
        .then((posts) => {

            if(posts){
                setPosts(posts.documents);
            }

        });

    }, []);



    return (

        <section className="
        bg-slate-950
        min-h-screen
        pt-28
        pb-16
        ">


            <Container>


                <h1 className="
                text-4xl
                font-bold
                text-white
                mb-10
                ">
                    MY POSTS
                </h1>



                <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
                ">


                {
                    posts.map((post)=>(

                        <PostCard
                            key={post.$id}
                            {...post}
                        />

                    ))
                }


                </div>


            </Container>


        </section>

    )
}

export default AllPosts;