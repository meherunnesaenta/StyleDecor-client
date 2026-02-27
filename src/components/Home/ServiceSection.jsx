import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosPublic from '../../../public/useAxiosPublic';
import Heading from '../Shared/Heading';

const ServicesSection = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: services = [],
    isLoading,
  } = useQuery({
    queryKey: ['services-home'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/services');
      return data.slice(0, 8);
    },
  });

  // Skeleton Card (Loading-এ দেখানোর জন্য)
  const SkeletonCard = () => (
    <div className=" rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
      <div className="relative h-64 md:h-72 " />
      <div className="p-7 md:p-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-12 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <Heading
              title="Our Signature Services"
              subtitle="Timeless decoration solutions crafted with artistry and precision"
              center={true}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl text-center">
          <Heading
            title="Our Signature Services"
            subtitle="Discover elegant decoration solutions crafted for sophistication"
            center={true}
          />
          <p className="mt-10 text-xl text-gray-600">
            No services available right now. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b ">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <Heading
            title="Our Signature Services"
            subtitle="Timeless decoration solutions crafted with artistry and precision for your most cherished spaces."
            center={true}
          />
        </div>

        {/* 4 Cards per row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service) => (
            <div
              key={service._id}
              className="
                group bg-base rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-2xl 
                transition-all duration-500 
                transform hover:-translate-y-4
                border border-base
              "
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64 md:h-72">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="
                    w-full h-full object-cover 
                    transition-transform duration-700 
                    group-hover:scale-110
                  "
                />
                <div className="
                  absolute inset-0 text-base to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500
                " />
                <div className="
                  absolute bottom-0 left-0 right-0 p-6 
                  transform translate-y-10 group-hover:translate-y-0 
                  transition-transform duration-500
                ">
                  <h3 className="
                    text-xl md:text-2xl font-playfair font-semibold 
                    text-base drop-shadow-lg
                  ">
                    {service.service_name}
                  </h3>
                </div>

                {/* Price Badge */}
                <div className="
                  absolute top-5 right-5 
                  bg-primary text-base 
                  px-5 py-2.5 rounded-full 
                  font-semibold text-lg shadow-lg
                  transform group-hover:scale-110 transition-transform duration-300
                ">
                  ৳{Number(service.cost).toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                <p className="text-base mb-5 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2 text-base">
                    {service.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ In-studio'}
                  </span>
                  <span className="font-medium text-primary">
                     {service.unit.replace(/-/g, ' ')}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  to={`/service/${service._id}`}
                  className="
                    block w-full 
                    text-center bg-primary text-white 
                    font-semibold text-base md:text-lg 
                    py-3.5 rounded-xl 
                    shadow-md hover:shadow-xl 
                    hover:bg-secondary 
                    transition-all duration-400 
                    transform hover:scale-[1.02]
                  "
                >
                  View & Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16 md:mt-20">
          <Link
            to="/services"
            className="
              inline-flex items-center gap-3
              bg-primary text-white 
              font-semibold text-lg 
              px-10 py-5 rounded-full 
              shadow-xl hover:shadow-2xl 
              hover:bg-secondary 
              transition-all duration-400 
              transform hover:scale-105
            "
          >
            View All Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;