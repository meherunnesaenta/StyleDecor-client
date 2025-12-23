import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
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
      <div className="container mx-auto px-4 sm:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Bookings Found</h2>
        <p className="text-gray-600 mb-8">You haven't booked any decoration service yet.</p>
        <a
          href="/services"
          className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-dark transition"
        >
          Explore Services
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <div className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Bookings ({bookings.length})
        </h2>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Image
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Service Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Type
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Price
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Booking Date
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Location
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-5 border-b border-gray-200">
                      <img
                        src={booking.serviceImage || '/placeholder.jpg'}
                        alt={booking.serviceName}
                        className="w-16 h-16 object-cover rounded-lg shadow"
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 font-medium">{booking.serviceName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900">
                        {booking.serviceMode === 'on-site' ? 'On-site' : 'In-studio'}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 font-bold">
                        ৳{booking.originalPriceBDT?.toLocaleString() || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Paid: ${(booking.paidAmountUSD || 0).toFixed(2)} USD
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900">
                        {new Date(booking.bookingDate).toLocaleDateString('en-GB')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 max-w-xs truncate">{booking.location}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.stripeSessionId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.stripeSessionId ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;