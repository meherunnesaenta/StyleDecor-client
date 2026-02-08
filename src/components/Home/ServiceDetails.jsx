import Container from '../../components/Shared/Container';
import Heading from '../../components/Shared/Heading';
import Button from '../../components/Shared/Button/Button';
import { useState } from 'react';
import { useParams } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth'; 
import { FaClock, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import BookingModal from './BookingModal';
import Loading from '../Loading/Loading';

import useAxiosSecure from '../../hooks/useAxiosSecure';

const ServiceDetails = () => {
  const { user } = useAuth(); 
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  // Service details fetch
  const { data: service = {}, isLoading: serviceLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/service/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const { data: hasBooked = false, isLoading: checkLoading } = useQuery({
    queryKey: ['has-booked', user?.email, id],
    queryFn: async () => {
      if (!user?.email || !id) return false;

      try {
        const { data } = await axiosSecure.get('/check-booking', {
          params: { serviceId: id },
        });
        return data?.hasBooked || false;
      } catch (err) {
        console.error('Booking check failed:', err);
        return false;
      }
    },
    enabled: !!user?.email && !!id && !serviceLoading,
  });

  const isLoading = serviceLoading || checkLoading;

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

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    : '';

  const formattedUnit = unit ? unit.replace(/-/g, ' ') : '';

  const modeIcon = serviceMode === 'on-site' ? <FaMapMarkerAlt /> : <FaClock />;
  const modeText = serviceMode === 'on-site' ? 'On-site Service' : 'In-studio Consultation';

  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 pt-20">
        {/* Left: Image */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              src={image || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={service_name || 'Service'}
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <Heading
              title={service_name || 'Service Name'}
              subtitle={`Category: ${formattedCategory || 'N/A'}`}
            />
          </div>

          <hr className="border-gray-300" />

          <div className="text-lg font-light text-neutral-600 leading-relaxed">
            {description || 'No description available.'}
          </div>

          <hr className="border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <div className="text-primary text-xl">{modeIcon}</div>
              <div>
                <p className="font-medium">Service Type</p>
                <p className="text-neutral-500">{modeText}</p>
              </div>
            </div>

            {estimated_time && (
              <div className="flex items-center gap-3">
                <FaClock className="text-primary text-xl" />
                <div>
                  <p className="font-medium">Estimated Time</p>
                  <p className="text-neutral-500">{estimated_time}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <FaUserTie className="text-primary text-xl" />
              <div>
                <p className="font-medium">Provided By</p>
                <p className="text-neutral-500">StyleDecor Team</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-primary text-xl">📧</div>
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-neutral-500">{createdByEmail || 'info@styledecor.com'}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Price & Booking Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-4xl font-bold text-primary">
                ৳{(cost || 0).toLocaleString()}
              </p>
              <p className="text-lg text-neutral-500 font-medium mt-1">
                per {formattedUnit || 'unit'}
              </p>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              label={hasBooked ? 'Already Booked' : 'Book This Service'}
              disabled={hasBooked}
              className={`w-full sm:w-auto transition-colors ${
                hasBooked
                  ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-focus'
              }`}
            />
          </div>

          <hr className="border-gray-300" />

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