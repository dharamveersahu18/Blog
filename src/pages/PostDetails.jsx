import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import appwriteService from "../appwrite/config";


function PostDetails(){


const {id}=useParams();


const [post,setPost]=useState(null);



useEffect(()=>{


appwriteService
.getPost(id)
.then((data)=>{

if(data){

setPost(data)

}

})


},[id])





if(!post){

return(

<div className="
bg-slate-950
min-h-screen
text-white
flex
justify-center
items-center
">

Loading...

</div>

)

}




return (

<section className="
bg-slate-950
min-h-screen
text-white
py-20
">


<div className="
max-w-4xl
mx-auto
px-6
">


<h1 className="
text-4xl
md:text-5xl
font-bold
">

{post.title}

</h1>



<img

src={
appwriteService.getFilePreview(
post.featuredImage
)
}

alt={post.title}

className="
mt-8
rounded-2xl
w-full
"

/>



<div className="
mt-8
text-lg
text-gray-300
leading-8
">

{post.content}

</div>



</div>


</section>


)

}


export default PostDetails;