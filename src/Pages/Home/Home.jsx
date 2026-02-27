import React from 'react';
import ServicesSection from '../../components/Home/ServiceSection';
import TopDecoratorsSection from '../../components/Home/TopDecoratorsSection';
import Banner from './Banner';

import Heading from '../../components/Shared/Heading';
import { FiCalendar, FiClock, FiCreditCard, FiDollarSign, FiEdit3, FiHeadphones, FiPackage, FiScissors, FiSearch, FiUsers } from 'react-icons/fi';

import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Coverage from '../../components/Home/Coverage';

const Home = () => {

  const steps = [
    {
      step: "01",
      title: "Browse Services",
      description: "Explore our curated decoration packages for homes, weddings, offices & special events.",
      icon: <FiSearch className="w-10 h-10" />,
    },
    {
      step: "02",
      title: "Select Date & Venue",
      description: "Choose your preferred date, time, and share detailed venue information.",
      icon: <FiCalendar className="w-10 h-10" />,
    },
    {
      step: "03",
      title: "Secure Payment",
      description: "Complete your booking safely via our trusted Stripe payment gateway.",
      icon: <FiCreditCard className="w-10 h-10" />,
    },
    {
      step: "04",
      title: "We Create Magic",
      description: "Our professional team arrives on-site and transforms your space beautifully.",
      icon: <FiScissors className="w-10 h-10" />,
    },
  ];

  const features = [
    {
      title: "Expert Decorators",
      description: "Hand-selected professionals with extensive experience in luxury & bespoke decoration.",
      icon: <FiUsers className="w-12 h-12 text-primary" />,
    },
    {
      title: "Premium Materials",
      description: "Only the finest, durable, and eco-conscious materials for enduring elegance.",
      icon: <FiPackage className="w-12 h-12 text-primary" />,  // ← এটা চেঞ্জ করলাম
    },
    {
      title: "Fully Custom Designs",
      description: "Every project is uniquely crafted to reflect your personal style and vision.",
      icon: <FiEdit3 className="w-12 h-12 text-primary" />,
    },
    {
      title: "Guaranteed On-Time",
      description: "We commit to precise scheduling so your event is ready exactly when needed.",
      icon: <FiClock className="w-12 h-12 text-primary" />,
    },
    {
      title: "Transparent Pricing",
      description: "Luxury-level service with clear, competitive quotes — no hidden costs.",
      icon: <FiDollarSign className="w-12 h-12 text-primary" />,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance from our dedicated team for complete peace of mind.",
      icon: <FiHeadphones className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <Coverage ></Coverage>
      <TopDecoratorsSection></TopDecoratorsSection>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

          <Heading
            title="How It Works"
            subtitle="A simple, seamless 4-step journey to your perfectly decorated space"
            center={true}
          />

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative mb-8 inline-block">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      {step.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 md:py-28 bg-base overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

          <Heading
            title="Why Choose StyleDecor"
            subtitle="Delivering timeless elegance, unmatched quality, and complete peace of mind"
            center={true}
          />



          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: '50%',
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white
        rounded-3xl 
        shadow-xl 
        p-8 md:p-10 
        text-center 
        border border-base
        transition-all duration-500 
        hover:shadow-2xl 
        hover:scale-[1.03] 
        min-h-[380px] flex flex-col justify-center items-center">
                  {/* Icon with subtle background */}
                  <div className="
              w-24 h-24 md:w-32 md:h-32 
              rounded-full 
              bg-gradient-to-br from-primary/10 to-secondary/10 
              flex items-center justify-center 
              mb-8 
              shadow-md
            ">
                    {feature.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-black  mb-5">
                    {feature.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-md mx-auto">
                    {feature.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CTA below slider */}
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/services"
              className="
          inline-block 
          bg-primary 
          text-base 
          font-semibold 
          text-lg 
          px-10 py-5 
          rounded-full 
          shadow-lg 
          hover:bg-primary/90 
          hover:shadow-xl 
          transition-all duration-300
        "
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>

  );
};

export default Home;