import React, { useState } from "react";

function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    alert(`Thanks for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            p-10
            md:p-16
            shadow-2xl
            text-center
            text-white
          "
        >
          <span className="text-5xl">📩</span>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold">
            Stay Updated
          </h2>

          <p className="mt-4 text-blue-100 max-w-2xl mx-auto leading-7">
            Subscribe to receive the latest articles on React, JavaScript,
            Web Development, and programming tips directly in your inbox.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                md:w-[420px]
                px-5
                py-4
                rounded-xl
                text-slate-900
                outline-none
                focus:ring-4
                focus:ring-white/40
              "
            />

            <button
              onClick={handleSubscribe}
              className="
                px-8
                py-4
                rounded-xl
                bg-slate-900
                hover:bg-black
                transition-all
                duration-300
                font-semibold
                hover:scale-105
                shadow-lg
              "
            >
              Subscribe
            </button>
          </div>

          <p className="mt-5 text-sm text-blue-100">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;