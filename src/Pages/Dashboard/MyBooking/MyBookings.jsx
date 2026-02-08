import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This booking will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Booking removed successfully.',
              icon: 'success',
              timer: 1800,
              showConfirmButton: false,
            });
          }
        }).catch(() => {
          Swal.fire('Error', 'Failed to delete booking', 'error');
        });
      }
    });
  };

  const handleView = (serviceId) => {
    if (!serviceId) {
      Swal.fire('Warning', 'No service ID available', 'warning');
      return;
    }
    navigate(`/service/${serviceId}`);
  };

  const handleEdit = (booking) => {
    const bookingId = booking._id.toString(); // নিশ্চিত করো string
    console.log("Navigating with ID:", bookingId);
    navigate(`/bookings/edit/${bookingId}`);
  };

  const handlePay = async (booking) => {
    try {
      const res = await axiosSecure.post('/create-stripe-session', {
        bookingId: booking._id, // ← এটা পাঠাও
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        serviceImage: booking.serviceImage,
        price: booking.originalPriceBDT / 120 || booking.paidAmountUSD || 10,
        customer: { name: user?.displayName || 'Guest' },
        bookingDate: booking.bookingDate,
        location: booking.location,
        unit: booking.unit,
        serviceMode: booking.serviceMode,
        originalPriceBDT: booking.originalPriceBDT,
      });

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire('Error', err?.response?.data?.message || 'Payment failed', 'error');
    }
  };



  if (isLoading) return <Loading />;

  if (bookings.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="container mx-auto px-5 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-9xl mb-6 opacity-30">📅✨</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-5">
              No Bookings Yet
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Looks like your calendar is empty.<br />
              Let's book something beautiful today!
            </p>
            <Link
              to="/services"
              className="inline-flex items-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-focus rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-5 max-w-7xl">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            My Bookings
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            You have <span className="font-bold text-primary">{bookings.length}</span> booking
            {bookings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl border border-gray-200/60 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['Service', 'Type', 'Price', 'Date', 'Location', 'Status', 'Payment', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-indigo-50/30 transition-colors duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={booking.serviceImage || 'https://via.placeholder.com/80?text=Service'}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover shadow-sm ring-1 ring-gray-200"
                      />
                      <div className="max-w-xs">
                        <p className="font-semibold text-gray-900 line-clamp-2" title={booking.serviceName}>
                          {booking.serviceName || 'Unnamed Service'}
                        </p>
                        {booking.unit && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            per {booking.unit.replace(/-/g, ' ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${booking.serviceMode === 'on-site'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                        }`}
                    >
                      {booking.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ Studio'}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-lg font-bold text-gray-900">
                      ৳{(booking.originalPriceBDT || 0).toLocaleString()}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                      : '—'}
                  </td>

                  <td className="px-6 py-5 text-gray-700 max-w-[180px] truncate" title={booking.location}>
                    {booking.location || '—'}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3.5 py-1.5 text-sm font-semibold rounded-full ${booking.status?.toLowerCase() === 'confirmed' || booking.status?.toLowerCase() === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                      {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Pending'}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {booking.stripeSessionId ? (
                      <span className="px-3.5 py-1.5 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        Paid ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePay(booking)}
                        className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-full hover:from-rose-700 hover:to-rose-600 shadow-sm hover:shadow transition-all duration-200"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(booking.serviceId)}
                        className="btn btn-square btn-sm hover:bg-indigo-100 text-indigo-600 tooltip"
                        data-tip="View Details"
                      >
                        <FaMagnifyingGlass />
                      </button>
                      {booking.status !== 'paid' && (
                        <button
                          onClick={() => handleEdit(booking)}  // ← পুরো booking object পাঠাও
                          className="btn btn-sm btn-outline border-gray-300 hover:bg-indigo-50 tooltip"
                          data-tip="Edit"
                        >
                          <FiEdit className="text-base" />
                        </button>
                      )}
                      {booking.status !== 'paid' && (
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="btn btn-square btn-sm hover:bg-red-100 text-red-600 tooltip"
                          data-tip="Delete"
                        >
                          <FaTrashCan />
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-5 mt-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-5 flex gap-4">
                <img
                  src={booking.serviceImage || 'https://via.placeholder.com/96?text='}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight"
                    title={booking.serviceName}
                  >
                    {booking.serviceName || 'Service'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.serviceMode === 'on-site' ? '🏠 On-site' : '🖥️ In-studio'}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                <div>
                  <p className="text-gray-500 text-xs">Price</p>
                  <p className="font-bold text-base text-gray-900">
                    ৳{(booking.originalPriceBDT || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="font-medium text-gray-800">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })
                      : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Status</p>
                  <span
                    className={`inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full ${booking.status?.toLowerCase() === 'confirmed' || booking.status?.toLowerCase() === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                      }`}
                  >
                    {booking.status || 'Pending'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Payment</p>
                  {booking.stripeSessionId ? (
                    <span className="inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePay(booking)}
                      className="mt-1 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-full hover:brightness-110 transition"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 px-5 pb-5 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleView(booking._id)}
                  className="btn btn-sm btn-outline border-gray-300 hover:bg-indigo-50 tooltip"
                  data-tip="View"
                >
                  <FaMagnifyingGlass className="text-base" />
                </button>
                {booking.status !== 'paid' && (
                  <button
                  onClick={() => handleEdit(booking)}
                  className="btn btn-sm btn-outline border-gray-300 hover:bg-indigo-50 tooltip"
                  data-tip="Edit"
                >
                  <FiEdit className="text-base" />
                </button>
                )}
                {booking.status !== 'paid' && (
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="btn btn-sm btn-outline border-red-200 text-red-600 hover:bg-red-50 tooltip"
                  data-tip="Delete"
                >
                  <FaTrashCan className="text-base" />
                </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;