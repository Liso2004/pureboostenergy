import React from "react";

const HeroVideo = () => {
  // Scroll handler for button
  const handleScroll = () => {
    const section = document.getElementById("product-grid");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative h-[90vh] md:h-[95vh]">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/y2mate--So-Win-Nike_1080.mp4"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>

        {/* Centered content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Fuel Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                Potential
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Premium energy drinks, pro equipment, and performance sportswear
              for athletes who demand excellence.
            </p>
            <button
              onClick={handleScroll}
              className="mt-4 bg-white text-black px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
