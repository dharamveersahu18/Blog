import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Braces,
  Palette,
  Database,
  Server,
  Brain,
  Bot,
} from "lucide-react";

const categories = [
  {
    name: "Travel",
    icon: <Code2 size={24} />,
    color: "from-sky-500 to-cyan-500",
  },
  {
    name: "Food & Recipes",
    icon: <Braces size={24} />,
    color: "from-yellow-400 to-orange-500",
  },

  
  {
    name: "Business & Finance",
    icon: <Server size={24} />,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Lifestyle & Wellness",
    icon: <Brain size={24} />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Tech & Software",
    icon: <Bot size={24} />,
    color: "from-violet-500 to-fuchsia-600",
  },
];

function Categories() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Browse Categories
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Explore articles across different technologies and programming
            topics.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
           <Link
  key={category.name}
  to={`/category/${category.name}`}
  className="
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-white/10
    bg-slate-900
    p-6
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-blue-500
    hover:shadow-2xl
    hover:shadow-blue-500/20
  "
>
              {/* Gradient Background */}

              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-300 bg-gradient-to-br ${category.color}`}
              />

              {/* Icon */}

              <div
                className={`
                  relative
                  w-14
                  h-14
                  rounded-xl
                  bg-gradient-to-br
                  ${category.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  mx-auto
                  shadow-lg
                `}
              >
                {category.icon}
              </div>

              {/* Title */}

              <h3 className="relative mt-5 text-lg font-semibold text-white">
                {category.name}
              </h3>

              {/* Subtitle */}

              <p className="relative mt-2 text-sm text-slate-400">
                Read articles & tutorials
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;