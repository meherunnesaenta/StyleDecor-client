import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router';
import useAxiosPublic from '../../../public/useAxiosPublic';

const TopDecoratorsSection = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: decorators = [],
    isLoading,
  } = useQuery({
    queryKey: ['top-decorators'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/top-decorators'); // backend route
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Top Decorators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals with outstanding ratings and unique specialties to bring your vision to life.
          </p>
        </div>

        {/* Decorators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {decorators.map((decorator) => (
            <div
              key={decorator._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <img
                  src={decorator.photoURL || 'https://i.ibb.co/0s7Y5Zn/user-placeholder.jpg'}
                  alt={decorator.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-lg font-bold">{decorator.specialty || 'Interior Specialist'}</p>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="font-bold text-gray-800">{decorator.rating?.toFixed(1) || '5.0'}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{decorator.name}</h3>
                <p className="text-gray-600 mb-4">{decorator.experience} Years Experience</p>

                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                  {decorator.bio || 'Expert in modern and luxury interior designs'}
                </p>

                <Link
                  to={`/decorator/${decorator._id}`} // decorator profile page
                  className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition shadow-md hover:shadow-lg"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/decorators"
            className="inline-block bg-gray-800 text-white font-semibold px-10 py-4 rounded-xl hover:bg-gray-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Decorators →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDecoratorsSection;