import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';
import { Link } from 'react-router'; 

// Images (high-res luxury photos use করা উচিত)
import banner1 from '../../assets/luxury.jpg';
import banner2 from '../../assets/image.png';
import banner3 from '../../assets/image2.png';
import banner4 from '../../assets/image3.png';

const Banner = () => {
  return (
    <div className="relative -mt-20 overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={5500}
        transitionTime={1000}
        stopOnHover
        swipeable
        emulateTouch
        className="overflow-hidden"
      >
        {/* Slide 1 */}
        <div className="relative h-[580px] sm:h-[680px] md:h-[780px] lg:h-[880px] xl:h-[920px]">
          <img
            src={banner1}
            alt="Luxury Living Room"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24"
          >
            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.1, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
              >
                Elevate Your Home with{" "}
                <span className="text-primary">Timeless Elegance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl drop-shadow-lg"
              >
                Bespoke interior decoration services that blend sophistication, comfort, and your personal story.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center bg-primary text-white font-semibold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-secondary hover:shadow-3xl transition-all duration-400"
                >
                  Discover Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide 2 – Bedroom */}
        <div className="relative h-[580px] sm:h-[680px] md:h-[780px] lg:h-[880px] xl:h-[920px]">
          <img src={banner2} alt="Modern Bedroom" className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/45 to-black/30" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-16 lg:px-24"
          >
            <div className="max-w-4xl text-right">
              <motion.h1
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
              >
                Design Your <span className="text-primary">Dream Sanctuary</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-100 drop-shadow-lg"
              >
                Serene bedrooms crafted with luxury fabrics, perfect lighting, and calming aesthetics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="mt-10 inline-block"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center bg-primary text-white font-semibold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-secondary hover:shadow-3xl transition-all duration-400"
                >
                  Book Your Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide 3 – Dining (Centered) */}
        <div className="relative h-[580px] sm:h-[680px] md:h-[780px] lg:h-[880px] xl:h-[920px]">
          <img src={banner3} alt="Elegant Dining" className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-center px-6 sm:px-12"
          >
            <div className="max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 drop-shadow-3xl"
              >
                Where Every Moment Feels <span className="text-primary">Extraordinary</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-lg max-w-4xl mx-auto"
              >
                Breathtaking dining spaces that turn meals into cherished memories.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                whileHover={{ scale: 1.08 }}
                className="inline-block"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center bg-white text-primary font-bold text-lg md:text-xl px-12 py-6 rounded-2xl shadow-3xl hover:bg-secondary hover:text-white hover:shadow-4xl transition-all duration-400"
                >
                  Reserve Your Vision
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide 4 – Office */}
        <div className="relative h-[580px] sm:h-[680px] md:h-[780px] lg:h-[880px] xl:h-[920px]">
          <img src={banner4} alt="Contemporary Office" className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24"
          >
            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
              >
                Spaces That <span className="text-primary">Inspire</span> Excellence
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-100 drop-shadow-lg"
              >
                Modern offices designed for focus, collaboration, and professional pride.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="mt-10 inline-block"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center bg-primary text-white font-semibold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-secondary hover:shadow-3xl transition-all duration-400"
                >
                  See Our Portfolio
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;