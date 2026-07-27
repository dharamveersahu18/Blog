import React from "react";

function Logo({ width = "50px" }) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      {/* Logo Background */}
      <rect
        width="120"
        height="120"
        rx="28"
        fill="#2563EB"
      />


      {/* Blog Icon */}
      <path
        d="M42 35H62C70.2843 35 77 41.7157 77 50C77 55.4802 74.062 60.2731 69.6644 62.8687C74.8718 65.6179 78 70.9234 78 77C78 85.2843 71.2843 92 63 92H42V35Z"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />


      {/* Middle Line */}
      <line
        x1="42"
        y1="63.5"
        x2="66"
        y2="63.5"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
      />


    </svg>
  );
}

export default Logo;