import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, ChevronDown, Menu, X } from "lucide-react";

import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Explore ",
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

  const handleSearch = (e) => {
    setSearch(e.target.value);

    // Later you can navigate to search page
    // navigate(`/search?q=${e.target.value}`)
  };

  return (
    <header
      className="
fixed
top-0
left-0
w-full
z-50
bg-slate-950/90
backdrop-blur-lg
border-b
border-white/10
"
    >
      <Container className="max-w-6xl mx-auto px-4">
        <nav
          className="
  max-w-7xl
  mx-auto
  px-6
  py-4
  "
        >
          {/* ================= TOP NAVBAR ================= */}

          <div className="flex items-center justify-between gap-5">
            {/* Logo */}

            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <Logo width="38px" />

                <span className="text-xl font-bold text-white">Blog</span>
              </Link>
            </div>

            {/* Search Desktop */}

            <div className="hidden lg:flex flex-1 justify-center">
              <div className="relative w-full max-w-md">
                {/* <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                /> */}

                {/* <input
                
                  value={search}
                  onChange={handleSearch}
                  
                  type="text"
                  placeholder="Search blogs..."
                  className="
                    w-full
                    rounded-full
                    py-2.5
                    pl-11
                    pr-4
                    bg-white/10
                    border border-white/10
                    text-white
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                /> */}
              </div>
            </div>

            {/* Desktop Nav */}

            <div className="hidden md:flex items-center gap-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <NavLink
                    key={item.name}
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-xl transition ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ),
              )}

              {/* Profile */}

              {authStatus && (
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="
                    flex items-center
                    gap-2
                    ml-3
                  "
                  >
                    <div
                      className="
                      w-10
                      h-10
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-indigo-600
                      flex
                      items-center
                      justify-center
                      text-white
                      font-semibold
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
                      className={`text-white transition-transform ${
                        showProfile ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showProfile && (
                    <div
                      className="
                      absolute
                      right-0
                      mt-4
                      w-64
                      rounded-2xl
                      bg-slate-900
                      border
                      border-white/10
                      shadow-2xl
                      overflow-hidden
                    "
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-white font-semibold">
                          {userData?.name}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          {userData?.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfile(false);
                        }}
                        className="
                        w-full
                        text-left
                        px-4
                        py-3
                        text-white
                        hover:bg-slate-800
                      "
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          navigate("/all-posts");
                          setShowProfile(false);
                        }}
                        className="
                        w-full
                        text-left
                        px-4
                        py-3
                        text-white
                        hover:bg-slate-800
                      "
                      >
                        My Posts
                      </button>

                   <div
  className="w-full px-4 py-2 text-left text-white hover:text-red-400 hover:bg-red-500/10 rounded-lg transition duration-300"
>
  <LogoutBtn />
</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger */}

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}

          {mobileMenu && (
            <div
              className="
              md:hidden
              mt-5
              border-t
              border-white/10
              pt-5
            "
            >
              {/* Mobile Search */}

              <div className="relative mb-5">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search blogs..."
                  className="
                    w-full
                    rounded-xl
                    py-3
                    pl-11
                    pr-4
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              {/* Mobile Links */}

              <div className="flex flex-col gap-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <NavLink
                        key={item.name}
                        to={item.slug}
                        onClick={() => setMobileMenu(false)}
                        className={({ isActive }) =>
                          `rounded-xl px-4 py-3 transition ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-white hover:bg-slate-800"
                          }`
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
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      text-white
                      hover:bg-slate-800
                    "
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/all-posts");
                        setMobileMenu(false);
                      }}
                      className="
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      text-white
                      hover:bg-slate-800
                    "
                    >
                      My Posts
                    </button>

                    <div className="pt-2 text-white hover:text-red-400 hover:bg-red-500/10 ">
                      <LogoutBtn />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
