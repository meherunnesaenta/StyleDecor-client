import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router';
import useAxiosPublic from '../../../public/useAxiosPublic';

const ServicesSection = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: services = [],
    isLoading,
  } = useQuery({
    queryKey: ['services-home'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/services');
      return data.slice(0, 6);
    },
  });

  console.log('Services data:', services); // debug

  if (isLoading) {
    return (
      <div className="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Premium Decoration Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your space with our expert interior decoration packages. Professional, creative, and tailored to your style.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white px-5 py-3 rounded-full font-bold text-lg shadow-lg">
                  ৳{service.cost.toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.service_name}
                </h3>
                <p className="text-gray-600 mb-5 line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-500">
                    {service.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ In-studio'}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    per {service.unit.replace(/-/g, ' ')}
                  </span>
                </div>

                {/* Button */}
                <Link
                  to={`/service/${service._id}`}
                  className="block w-full text-center bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link
            to="/services"
            className="inline-block bg-gray-800 text-white font-semibold px-12 py-4 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;