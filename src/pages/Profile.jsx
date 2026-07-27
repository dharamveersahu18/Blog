import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../component";

function Profile() {

  const userData = useSelector(
    (state) => state.auth.userData
  );


  return (
    <section className="min-h-screen bg-slate-950 py-20">

      <Container>

        <div
          className="
          max-w-xl
          mx-auto
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-xl
        "
        >

          {/* Avatar */}

          <div className="flex justify-center">

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              text-white
            "
            >
              {userData?.name
                ?.split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()}
            </div>

          </div>


          {/* User Info */}

          <div className="text-center mt-6">

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              {userData?.name}
            </h1>


            <p className="
              text-slate-400
              mt-2
            ">
              {userData?.email}
            </p>

          </div>


          {/* Stats */}

          <div
            className="
            grid
            grid-cols-3
            gap-4
            mt-8
          "
          >

            <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-center
            ">
              <h3 className="text-white font-bold">
                12
              </h3>
              <p className="text-slate-400 text-sm">
                Posts
              </p>
            </div>


            <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-center
            ">
              <h3 className="text-white font-bold">
                240
              </h3>
              <p className="text-slate-400 text-sm">
                Likes
              </p>
            </div>


            <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-center
            ">
              <h3 className="text-white font-bold">
                5
              </h3>
              <p className="text-slate-400 text-sm">
                Saved
              </p>
            </div>

          </div>


          {/* Buttons */}

          <div className="mt-8 space-y-3">

            <button
              className="
              w-full
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              transition
            "
            >
              Edit Profile
            </button>


            <button
              className="
              w-full
              py-3
              rounded-xl
              bg-slate-800
              hover:bg-slate-700
              text-white
              transition
            "
            >
              My Posts
            </button>

          </div>


        </div>

      </Container>

    </section>
  );
}

export default Profile;