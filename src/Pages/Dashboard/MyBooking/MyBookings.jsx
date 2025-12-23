import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/my-bookings');
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  if (bookings.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-8 opacity-20">📅</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              No Bookings Yet
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              You haven't booked any decoration service. Start planning your perfect space today!
            </p>
            <Link
              to="/services"
              className="inline-block bg-primary text-white font-bold text-xl px-10 py-5 rounded-xl shadow-xl hover:bg-primary-dark hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Bookings
          </h2>
          <p className="text-xl text-gray-600">
            Total Bookings: <span className="font-bold text-primary">{bookings.length}</span>
          </p>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto shadow-2xl rounded-2xl">
          <table className="min-w-full bg-white">
            <thead className="bg-primary/10">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-primary/5 transition duration-300">
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={booking.serviceImage || 'https://via.placeholder.com/80?text=No+Image'}
                        alt={booking.serviceName || 'Service'}
                        className="w-16 h-16 object-cover rounded-xl shadow-md"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {booking.serviceName || 'Service Name Not Available'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.unit ? `per ${booking.unit.replace(/-/g, ' ')}` : ''}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className="inline-flex items-center gap-2">
                      <span className={booking.serviceMode === 'on-site' ? 'text-orange-600' : 'text-blue-600'}>
                        {booking.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ In-studio'}
                      </span>
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        ৳{booking.originalPriceBDT?.toLocaleString() || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid: ${(booking.paidAmountUSD || 0).toFixed(2)} USD
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <p className="text-gray-900 font-medium">
                      {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : 'Not set'}
                    </p>
                  </td>

                  <td className="px-6 py-6">
                    <p className="text-gray-900 max-w-xs truncate" title={booking.location}>
                      {booking.location || 'Not provided'}
                    </p>
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-2 inline-flex text-sm font-bold rounded-full ${
                        booking.status === 'paid' || booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Pending'}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-2 inline-flex text-sm font-bold rounded-full ${
                        booking.stripeSessionId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.stripeSessionId ? 'Paid ✓' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (optional - for small screens) */}
        <div className="mt-12 md:hidden space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex gap-4 mb-4">
                <img
                  src={booking.serviceImage || 'https://via.placeholder.com/100'}
                  alt={booking.serviceName || 'Service'}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {booking.serviceName || 'Service Name'}
                  </h4>
                  <p className="text-gray-600">
                    {booking.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ In-studio'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-bold text-lg">
                    ৳{booking.originalPriceBDT?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">
                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('en-GB') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status || 'Pending'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500">Payment</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.stripeSessionId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.stripeSessionId ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;