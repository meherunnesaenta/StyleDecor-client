import { Link } from 'react-router';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; 

const Card = ({ service }) => {
  const {
    _id,
    service_name,
    image,
    cost,
    unit,
    category,
    serviceMode,
    estimated_time,
    description,
  } = service || {};

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
    : '';

  const modeIcon = serviceMode === 'on-site' ? <FaMapMarkerAlt /> : <FaClock />;

  return (
    <Link
      to={`/service/${_id}`}  
      className='col-span-1 cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden bg-white'
    >
      <div className='flex flex-col w-full h-full'>
        {/* Image Section */}
        <div className='aspect-square w-full relative overflow-hidden'>
          <img
            className='object-cover h-full w-full group-hover:scale-110 transition-transform duration-500 ease-in-out'
            src={image}
            alt={service_name}
          />
          {/* Overlay Badge for Service Mode */}
          <div className='absolute top-3 right-3 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg'>
            {modeIcon}
            {serviceMode === 'on-site' ? 'On-site' : 'In-studio'}
          </div>

          {/* Category Badge */}
          <div className='absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm font-medium'>
            {formattedCategory}
          </div>
        </div>

        {/* Content Section */}
        <div className='p-6 flex flex-col gap-3 flex-grow'>
          <h3 className='font-bold text-xl text-gray-800 group-hover:text-primary transition-colors'>
            {service_name}
          </h3>

          {/* Short Description */}
          <p className='text-gray-600 text-sm line-clamp-2'>
            {description || 'Professional decoration service tailored to your needs.'}
          </p>

          {/* Estimated Time (if available) */}
          {estimated_time && (
            <div className='flex items-center gap-2 text-gray-500 text-sm'>
              <FaClock />
              <span>Est. Time: {estimated_time}</span>
            </div>
          )}

          {/* Price Section */}
          <div className='mt-auto'>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold text-primary'>
                ৳{cost?.toLocaleString()}
              </div>
              <div className='text-sm text-gray-500 font-medium'>
                /{unit?.replace('-', ' ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;