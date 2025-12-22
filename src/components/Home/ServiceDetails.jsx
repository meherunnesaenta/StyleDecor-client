import Container from '../../components/Shared/Container';
import Heading from '../../components/Shared/Heading';
import Button from '../../components/Shared/Button/Button';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaClock, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import BookingModal from './BookingModal';
import Loading from '../Loading/Loading';

const ServiceDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

const { data: service = {}, isLoading } = useQuery({
  queryKey: ['service', id],
  queryFn: async () => {
    const { data } = await axiosSecure.get(`/service/${id}`);
    
    return data;
  },
});

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <Loading />;

  const {
    image,
    service_name,
    description,
    category,
    cost,
    unit,
    serviceMode,
    estimated_time,
    createdByEmail,
  } = service;

  // Format category & unit
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    : '';
  const formattedUnit = unit ? unit.replace(/-/g, ' ') : '';

  // Service Mode Icon & Text
  const modeIcon = serviceMode === 'on-site' ? <FaMapMarkerAlt /> : <FaClock />;
  const modeText = serviceMode === 'on-site' ? 'On-site Service' : 'In-studio Consultation';

  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 pt-20'>
        {/* Left: Image */}
        <div className='flex flex-col gap-6 flex-1'>
          <div className='w-full overflow-hidden rounded-2xl shadow-xl '>
            <img
              className='object-cover w-full h-full hover:scale-105 transition-transform duration-500'
              src={image}
              alt={service_name}
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className='flex-1 flex flex-col gap-8'>
          {/* Title & Category */}
          <div>
            <Heading
              title={service_name}
              subtitle={`Category: ${formattedCategory}`}
            />
          </div>

          <hr className='border-gray-300' />

          {/* Description */}
          <div className='text-lg font-light text-neutral-600 leading-relaxed'>
            {description}
          </div>

          <hr className='border-gray-300' />

          {/* Service Info Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700'>
            <div className='flex items-center gap-3'>
              <div className='text-primary text-xl'>{modeIcon}</div>
              <div>
                <p className='font-medium'>Service Type</p>
                <p className='text-neutral-500'>{modeText}</p>
              </div>
            </div>

            {estimated_time && (
              <div className='flex items-center gap-3'>
                <FaClock className='text-primary text-xl' />
                <div>
                  <p className='font-medium'>Estimated Time</p>
                  <p className='text-neutral-500'>{estimated_time}</p>
                </div>
              </div>
            )}

            <div className='flex items-center gap-3'>
              <FaUserTie className='text-primary text-xl' />
              <div>
                <p className='font-medium'>Provided By</p>
                <p className='text-neutral-500'>StyleDecor Team</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='text-primary text-xl'>📧</div>
              <div>
                <p className='font-medium'>Contact</p>
                <p className='text-neutral-500'>{createdByEmail || 'info@styledecor.com'}</p>
              </div>
            </div>
          </div>

          <hr className='border-gray-300' />

          {/* Price & Booking Button */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
            <div>
              <p className='text-4xl font-bold text-primary'>
                ৳{cost?.toLocaleString()}
              </p>
              <p className='text-lg text-neutral-500 font-medium mt-1'>
                per {formattedUnit}
              </p>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              label='Book This Service'
              className='w-full sm:w-auto'
            />
          </div>

          <hr className='border-gray-300' />

          {/* Booking Modal */}
          <BookingModal
            service={service}
            isOpen={isOpen}
            closeModal={closeModal}
          />
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetails;