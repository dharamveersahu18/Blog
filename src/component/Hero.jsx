import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
   <section className="bg-slate-950 text-white">
  <div className="max-w-7xl mx-auto px-6 py-20">

    <div className="grid md:grid-cols-2 gap-16 items-center">


      {/* Left Side */}
      <div>

        <p className="text-blue-400 font-semibold mb-5">
          🚀 Modern Blogging Platform
        </p>


        <h1 className="
          text-4xl 
          sm:text-5xl 
          md:text-6xl
          font-extrabold 
          leading-tight
        ">
          Share Your
          <span className="text-blue-500"> Ideas </span>
          With The World
        </h1>


        <p className="
          text-gray-400 
          mt-6 
          text-lg 
          max-w-xl
        ">
          Create, publish and manage blogs beautifully using
          React, Tailwind CSS and Appwrite.
        </p>


        <div className="mt-8 flex flex-wrap gap-5">


          <button
            onClick={() => navigate("/add-post")}
            className="
            bg-blue-600
            hover:bg-blue-700
            px-8
            py-3.5
            rounded-xl
            font-semibold
            transition
            "
          >
            Start Writing
          </button>


          <button
            onClick={() => navigate("/explore")}
            className="
            border
            border-gray-700
            hover:border-blue-500
            hover:text-blue-400
            px-8
            py-3.5
            rounded-xl
            transition
            "
          >
            Explore Blogs
          </button>


        </div>



        {/* Stats */}

        <div className="
          flex 
          gap-10 
          mt-12
          flex-wrap
        ">


          <div>
            <h2 className="text-3xl font-bold">
              500+
            </h2>
            <p className="text-gray-500">
              Articles
            </p>
          </div>


          <div>
            <h2 className="text-3xl font-bold">
              150+
            </h2>
            <p className="text-gray-500">
              Authors
            </p>
          </div>


          <div>
            <h2 className="text-3xl font-bold">
              10K+
            </h2>
            <p className="text-gray-500">
              Readers
            </p>
          </div>


        </div>


      </div>



      {/* Right Side */}


      <div className="flex justify-center">


        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          shadow-2xl
          p-6
          max-w-md
          "
        >


          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="Hero"
            className="
            rounded-2xl
            h-64
            w-full
            object-cover
            "
          />


          <h3 className="
            text-2xl 
            font-bold 
            mt-6
          ">
            Latest Technology Blogs
          </h3>


          <p className="
            text-gray-400 
            mt-3
          ">
            Read articles about React, JavaScript,
            AI, Web Development and much more.
          </p>


        </div>


      </div>


    </div>

  </div>
</section>
  );
}

export default Hero;