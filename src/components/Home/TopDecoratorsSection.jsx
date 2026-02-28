import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosPublic from '../../../public/useAxiosPublic';
import Heading from '../Shared/Heading';

const TopDecoratorsSection = () => {
  const axiosPublic = useAxiosPublic()

  const { data: decorator = [], isLoading } = useQuery({
    queryKey: ['top-decorator'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/users/decorator?role=decorator');
      return data;
    }
  })
 const skeletons = Array.from({ length: 4 });
  return (
<section className="py-16 bg-base">
      <div className="container mx-auto px-4">
        <Heading
          title="Meet Our Top Decorators"
          subtitle="Experienced professionals ready to bring your vision to life"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? skeletons.map((_, index) => (
              <div
                key={index}
                className="group bg-base rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-72 bg-gray-300 rounded-t-2xl"></div>
                </div>
                <div className="p-6 text-center">
                  <div className="h-6 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            ))
            : decorator.map((decorator) => (
              <div
                key={decorator._id || decorator.email}
                className="group bg-base rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={decorator.photoURL || 'https://i.ibb.co/0s7Y5Zn/user-placeholder.jpg'}
                    alt={decorator.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-base mb-2">{decorator.name}</h3>
                  <p className="text-primary font-medium mb-2">
                    Decorator: {decorator.displayName}
                  </p>
                  <p className="text-base text-sm mb-4">{decorator.email}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
export default TopDecoratorsSection;
