import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';
import { Link } from 'react-router';


import banner1 from '../../assets/luxury.jpg';
import banner2 from '../../assets/image.png';
import banner3 from '../../assets/image2.png';
import banner4 from '../../assets/image3.png';

const Banner = () => {
  return (
    <div className="relative -mt-20">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={6000}
        transitionTime={1200}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        className="overflow-hidden"
      >
        {/* Slide 1 */}
        <div className="relative h-[600px] md:h-[750px] lg:h-[850px]">
          <img 
            src={banner1} 
            alt="Luxury Living Room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            >
              Transform Your Space with <span className="text-primary">Elegance</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 drop-shadow-lg"
            >
              Professional interior decoration services tailored to your unique style and vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/services"
                className="inline-block bg-primary text-white font-bold text-lg md:text-xl px-10 py-5 rounded-xl shadow-2xl hover:bg-primary-dark transition-all duration-300"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[600px] md:h-[750px] lg:h-[850px]">
          <img 
            src={banner2} 
            alt="Modern Bedroom" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-1/2 right-8 md:right-16 transform -translate-y-1/2 max-w-2xl text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
            >
              Create Your <span className="text-primary">Dream Bedroom</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 drop-shadow-lg"
            >
              Relaxing, sophisticated, and perfectly designed for comfort and luxury.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/services"
                className="inline-block bg-primary text-white font-bold text-lg md:text-xl px-10 py-5 rounded-xl shadow-2xl hover:bg-primary-dark transition-all"
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[600px] md:h-[750px] lg:h-[850px]">
          <img 
            src={banner3} 
            alt="Elegant Dining" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-center px-8"
          >
            <div className="max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 drop-shadow-3xl"
              >
                Where Design Meets <span className="text-primary">Comfort</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 drop-shadow-lg"
              >
                Expert decorators bringing timeless elegance to every corner of your home
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block bg-white text-primary font-bold text-xl md:text-2xl px-12 py-6 rounded-2xl shadow-3xl hover:shadow-4xl transition-all duration-300"
                >
                  Book Decoration Service
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide 4 */}
        <div className="relative h-[600px] md:h-[750px] lg:h-[850px]">
          <img 
            src={banner4} 
            alt="Contemporary Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />
          
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-16 left-8 md:left-16 max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
            >
              Professional Spaces, <span className="text-primary">Professional Results</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-gray-200 mb-10 drop-shadow-lg"
            >
              From homes to offices – we create environments that inspire productivity and creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/services"
                className="inline-block bg-primary text-white font-bold text-lg md:text-xl px-10 py-5 rounded-xl shadow-2xl hover:bg-primary-dark transition-all"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;