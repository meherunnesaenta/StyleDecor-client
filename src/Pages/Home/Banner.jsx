import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from '../../assets/luxury.jpg';
import banner2 from '../../assets/image.png';
import banner3 from '../../assets/image2.png';
import banner4 from '../../assets/image3.png';


const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        className="rounded-b-3xl overflow-hidden shadow-2xl"
      >
        {/* Banner 1 */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[750px]">
          <img 
            src={banner1} 
            alt="Luxury Living Room Design" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Transform Your Space with <span className="text-primary">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Professional interior decoration services tailored to your unique style and vision.
            </p>
            <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
              Explore Services
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[750px]">
          <img 
            src={banner2} 
            alt="Modern Bedroom Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 right-0 p-8 md:p-16 max-w-2xl text-right">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Create Your <span className="text-primary">Dream Bedroom</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Relaxing, sophisticated, and perfectly designed for comfort and luxury.
            </p>
            <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
              Book Consultation
            </button>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[750px]">
          <img 
            src={banner3} 
            alt="Elegant Dining Area" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Where Design Meets <span className="text-primary">Comfort</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10">
                Expert decorators bringing timeless elegance to every corner of your home
              </p>
              <button className="bg-primary text-secondary font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-xl">
                Get Started Today
              </button>
            </div>
          </div>
        </div>

        {/* Banner 4 */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[750px]">
          <img 
            src={banner4} 
            alt="Contemporary Office Space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Professional Spaces, <span className="text-primary">Professional Results</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              From homes to offices – we create environments that inspire.
            </p>
            <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
              View Portfolio
            </button>
          </div>
        </div>
      </Carousel>

      {/* Custom Arrow Indicators (optional enhancement) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        <div className="w-3 h-3 bg-white/60 rounded-full hover:bg-white transition"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full hover:bg-white transition"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full hover:bg-white transition"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full hover:bg-white transition"></div>
      </div>
    </div>
  );
};

export default Banner;