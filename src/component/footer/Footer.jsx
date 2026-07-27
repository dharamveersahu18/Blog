import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              DevBlog
            </h2>

            <p className="text-gray-400 leading-7">
              A modern blogging platform built using React,
              Tailwind CSS and Appwrite.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-blue-400 duration-300">
                  Home
                </a>
              </li>

              <li>
                <a href="/all-posts" className="hover:text-blue-400 duration-300">
                  Blogs
                </a>
              </li>

              <li>
                <a href="/add-post" className="hover:text-blue-400 duration-300">
                  Write
                </a>
              </li>

              <li>
                <a href="/login" className="hover:text-blue-400 duration-300">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Resources
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-blue-400 cursor-pointer duration-300">
                React
              </li>

              <li className="hover:text-blue-400 cursor-pointer duration-300">
                Tailwind CSS
              </li>

              <li className="hover:text-blue-400 cursor-pointer duration-300">
                Appwrite
              </li>

              <li className="hover:text-blue-400 cursor-pointer duration-300">
                Documentation
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">

              <a href="#">
                <FaGithub className="hover:text-white duration-300" />
              </a>

              <a href="#">
                <FaLinkedin className="hover:text-blue-500 duration-300" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-sky-400 duration-300" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-pink-500 duration-300" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DevBlog. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Made with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;