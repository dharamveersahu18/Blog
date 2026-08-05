import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu, X } from "lucide-react";
import { ChevronDown } from "lucide-react";

import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Explore",
      slug: "/explore",
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header
      className="
      fixed
      top-0
      left-0
      w-full
      z-50

      bg-slate-950/90
      backdrop-blur-xl

      border-b
      border-white/10
      "
    >
      <Container>
        <nav
          className="
          max-w-7xl
          mx-auto

          h-16

          flex
          items-center
          justify-between
          "
        >
          {/* ================= Logo ================= */}

          <Link
            to="/"
            className="
            flex
            items-center
            gap-3
            "
          >
            <Logo width="38px" />

            <span
              className="
              text-xl
              font-bold
              text-white
              tracking-wide
              "
            >
              LinkedPost
            </span>
          </Link>

          {/* ================= Desktop Navigation ================= */}

          <div
            className="
            hidden
            md:flex

            items-center
            gap-2
            "
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `
                      px-4
                      py-2

                      rounded-xl

                      font-medium

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "text-gray-300 hover:text-white hover:bg-slate-800"
                      }
                      `
                    }
                  >
                    {item.name}
                  </NavLink>
                ),
            )}

            {/* ================= Profile Hover Dropdown ================= */}

            {authStatus && (
              <div className="relative group ml-3">
                {/* Avatar */}

                <div
                  className="
      flex
      items-center
      gap-2
      cursor-pointer
      "
                >
                  <div
                    className="
        w-11
        h-11

        rounded-full

        bg-gradient-to-br
        from-blue-500
        via-indigo-500
        to-purple-600

        flex
        items-center
        justify-center

        text-white
        font-semibold

        ring-2
        ring-white/10

        group-hover:ring-blue-400

        transition-all
        duration-300
        "
                  >
                    {userData?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <ChevronDown
                    size={18}
                    className="
        text-gray-400

        group-hover:rotate-180

        transition-transform
        duration-300
        "
                  />
                </div>

                {/* Invisible Hover Bridge */}

                <div className="absolute right-0 top-full h-3 w-72"></div>

                {/* Dropdown */}

                <div
                  className="
      absolute

      right-0
      top-[calc(100%+12px)]

      w-72

      rounded-2xl

      border
      border-white/10

      bg-slate-900/95
      backdrop-blur-xl

      shadow-2xl

      overflow-hidden

      invisible
      opacity-0
      scale-95

      group-hover:visible
      group-hover:opacity-100
      group-hover:scale-100

      transition-all
      duration-300
      "
                >
                  {/* Header */}

                  <div
                    className="
        p-5

        bg-gradient-to-r
        from-blue-600/20
        to-purple-600/20

        border-b
        border-white/10
        "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
            w-14
            h-14

            rounded-full

            bg-gradient-to-br
            from-blue-500
            to-purple-600

            flex
            items-center
            justify-center

            text-lg
            font-bold
            text-white
            "
                      >
                        {userData?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <h2 className="text-white font-semibold">
                          {userData?.name}
                        </h2>

                        <p className="text-sm text-gray-400 truncate max-w-[170px]">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}

                  <div className="p-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="
          w-full

          flex
          items-center

          px-4
          py-3

          rounded-xl

          text-gray-300

          hover:bg-slate-800
          hover:text-blue-400

          transition
          "
                    >
                      👤
                      <span className="ml-3">Profile</span>
                    </button>

                    <button
                      onClick={() => navigate("/my-posts")}
                      className="
          w-full

          flex
          items-center

          px-4
          py-3

          rounded-xl

          text-gray-300

          hover:bg-slate-800
          hover:text-blue-400

          transition
          "
                    >
                      📝
                      <span className="ml-3">My Posts</span>
                    </button>

                    <button
                      onClick={() => navigate("/edit-profile")}
                      className="
          w-full

          flex
          items-center

          px-4
          py-3

          rounded-xl

          text-gray-300

          hover:bg-slate-800
          hover:text-blue-400

          transition
          "
                    >
                      ⚙️
                      <span className="ml-3">Edit Profile</span>
                    </button>

                    <div
                      className="
          mt-2
          pt-2

          border-t
          border-white/10
          "
                    >
                      <div
                        className="
            rounded-xl

            hover:bg-red-500/10

            transition
            "
                      >
                        <LogoutBtn />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= Mobile Hamburger ================= */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
            md:hidden

            p-2

            rounded-lg

            text-white

            hover:bg-slate-800

            transition
            "
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* ================= Mobile Menu ================= */}

        {mobileMenu && (
          <div
            className="
    md:hidden

    mt-3
    mb-4

    rounded-2xl

    border
    border-white/10

    bg-slate-900/95
    backdrop-blur-xl

    shadow-2xl

    overflow-hidden

    animate-in
    slide-in-from-top-3
    duration-300
    "
          >
            {/* User Card */}

            {authStatus && (
              <div
                className="
        p-5

        border-b
        border-white/10

        bg-gradient-to-r
        from-blue-600/20
        to-purple-600/20
        "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
            w-12
            h-12

            rounded-full

            bg-gradient-to-br
            from-blue-500
            to-purple-600

            flex
            items-center
            justify-center

            text-white
            font-bold
            "
                  >
                    {userData?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      {userData?.name}
                    </h3>

                    <p className="text-sm text-gray-400 truncate">
                      {userData?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}

            <div className="p-3 flex flex-col gap-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <NavLink
                      key={item.name}
                      to={item.slug}
                      onClick={() => setMobileMenu(false)}
                      className={({ isActive }) =>
                        `
                px-4
                py-3

                rounded-xl

                font-medium

                transition-all

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }
                `
                      }
                    >
                      {item.name}
                    </NavLink>
                  ),
              )}

              {authStatus && (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenu(false);
                    }}
                    className="
            w-full
            text-left

            px-4
            py-3

            rounded-xl

            text-gray-300

            hover:bg-slate-800
            hover:text-blue-400

            transition
            "
                  >
                    👤 Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/my-posts");
                      setMobileMenu(false);
                    }}
                    className="
            w-full
            text-left

            px-4
            py-3

            rounded-xl

            text-gray-300

            hover:bg-slate-800
            hover:text-blue-400

            transition
            "
                  >
                    📝 My Posts
                  </button>

                  <button
                    onClick={() => {
                      navigate("/edit-profile");
                      setMobileMenu(false);
                    }}
                    className="
            w-full
            text-left

            px-4
            py-3

            rounded-xl

            text-gray-300

            hover:bg-slate-800
            hover:text-blue-400

            transition
            "
                  >
                    ⚙️ Edit Profile
                  </button>

                  <div
                    className="
            mt-2
            pt-3

            border-t
            border-white/10
            "
                  >
                    <LogoutBtn />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
