import React from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Utensils,
  Briefcase,
  HeartPulse,
  Laptop,
} from "lucide-react";

const categories = [
  {
    id: "travel",
    title: "Travel",
    description: "Read articles & tutorials",
    icon: Plane,
    color: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "food",
    title: "Food & Recipes",
    description: "Read articles & tutorials",
    icon: Utensils,
    color: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "business",
    title: "Business & Finance",
    description: "Read articles & tutorials",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lifestyle",
    title: "Lifestyle & Wellness",
    description: "Read articles & tutorials",
    icon: HeartPulse,
    color: "from-purple-500 to-indigo-500",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tech",
    title: "Tech & Software",
    description: "Read articles & tutorials",
    icon: Laptop,
    color: "from-violet-500 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
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
            Explore articles across different technologies and topics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            // Assign component reference to a capitalized variable to render dynamically
            const IconComponent = category.icon;

            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
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
                {/* Background Image Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-slate-950/85 group-hover:bg-slate-950/75 transition-colors duration-300" />

                {/* Dynamic Hover Gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-300 bg-gradient-to-br ${category.color}`}
                />

                {/* Card Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-xl
                      bg-gradient-to-br
                      ${category.color}
                      flex
                      items-center
                      justify-center
                      text-white
                      shadow-lg
                    `}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm text-slate-400">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;