import React from "react";

function Logo({ width = "45px" }) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Modern Gradient */}
        <linearGradient id="nexusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Background Container */}
      <rect width="120" height="120" rx="28" fill="url(#nexusGrad)" />

      {/* Connected Network / Nexus N Path */}
      <path
        d="M38 82V38L82 82V38"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing Connection Nodes */}
      <circle cx="38" cy="38" r="7" fill="white" />
      <circle cx="82" cy="82" r="7" fill="white" />
      <circle cx="60" cy="60" r="5" fill="#3B82F6" />
    </svg>
  );
}

export default Logo;