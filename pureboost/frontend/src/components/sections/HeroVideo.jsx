import React from 'react';

const HeroVideo = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative h-96 md:h-[500px] lg:h-[600px]">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          src="/y2mate--So-Win-Nike_1080.mp4"
        />
        
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Fuel Your <span className="text-gray-300">Potential</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
              Premium energy drinks, professional equipment, and performance sportswear for athletes who demand excellence.
            </p>
            <button className="mt-8 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;