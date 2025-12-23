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
      const { data } = await axiosPublic.get('/top-decorators');
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

  if (decorators.length === 0) {
    return null; 
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Top Decorators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals ready to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {decorators.map((decorator) => (
            <div
              key={decorator._id || decorator.email}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={decorator.photoURL || 'https://i.ibb.co.com/0s7Y5Zn/user-placeholder.jpg'}
                  alt={decorator.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="font-bold text-gray-800">
                    {decorator.rating || '5.0'}
                  </span>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {decorator.name}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {decorator.specialty || 'Interior Specialist'}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {decorator.experience} Years Experience
                </p>
                <Link
                  to={`/decorator/${decorator.email}`} // অথবা _id
                  className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecoratorsSection;