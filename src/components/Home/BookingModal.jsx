import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BookingModal = ({ service, isOpen, closeModal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookingDate, setBookingDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    _id,
    service_name,
    image,
    cost,
    unit,
    serviceMode,
    description,
  } = service || {};
  console.log(service)

  if (isOpen && !user) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please log in to book this service.',
      confirmButtonText: 'OK',
    }).then(() => closeModal());
  }

  const handleBooking = async () => {
    if (!bookingDate || !location.trim()) {
      Swal.fire('Oops!', 'Please select a date and provide location.', 'warning');
      return;
    }

    setLoading(true);

    const usdPrice = Number((cost / 118).toFixed(2));

const bookingInfo = {
  serviceId: _id,
  serviceName: service_name,
  serviceImage: image,
  price: usdPrice,          // ✅ USD price
  originalPriceBDT: cost,   // optional but useful
  unit,
  serviceMode,
  description,
  customer: {
    name: user?.displayName || 'Guest',
    email: user?.email,
  },
  bookingDate,
  location,
};



    try {
      const { data } = await axiosSecure.post('/create-booking-session', bookingInfo);

      if (data.url) {

        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        'Error',
        err.response?.data?.message || 'Failed to proceed to payment.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl backdrop-blur-2xl 
                     duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-2xl font-bold text-center text-gray-900 mb-6">
            Confirm Your Booking
          </DialogTitle>

          {/* Service Summary */}
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Service:</span>
              <span>{service_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Type:</span>
              <span>{serviceMode === 'on-site' ? 'On-site Service' : 'In-studio Consultation'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Price:</span>
              <div className="text-right">
                <span className="font-bold text-primary text-lg">
                  ৳{cost?.toLocaleString()}
                </span>
                <span className="block text-sm text-gray-500">
                  (Payment in USD: ${(cost / 118).toFixed(2)})
                </span>
                <span className="block text-xs text-gray-400">
                  per {unit?.replace(/-/g, ' ')}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Customer:</span>
              <span>{user?.displayName || 'Not logged in'}</span>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Booking Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location / Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. House #10, Road #5, Mirpur, Dhaka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={closeModal}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleBooking}
              disabled={loading || !user}
              className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>

          {!user && (
            <p className="text-center text-red-600 text-sm mt-4">
              You must be logged in to book.
            </p>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookingModal;