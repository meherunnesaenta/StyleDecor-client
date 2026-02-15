import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CompletedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['completed-projects', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?decoratorEmail=${user.email}&workStatus=completed`
      );
      return res.data;
    },
  });




  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

    const calculatePayout = (booking) => {
    if(booking.paidAmountUSD === booking.servicePriceUSD) {
        return (booking.paidAmountUSD * 0.9).toFixed(2); 

    } else {
        return (booking.paidAmountUSD * 0.8).toFixed(2); 
  } };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Completed Projects: {bookings.length}
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-base-200">
        <table className="table table-zebra table-lg w-full">
          {/* head */}
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th className="text-base">#</th>
              <th className="text-base">Service</th>
              <th className="text-base">Customer</th>
              <th className="text-base">Completed Date</th>
              <th className="text-base">Location</th>
              <th className="text-base">Amount</th>
              <th className="text-base">Payout</th>
              {/* <th className="text-base">Payout</th> */} {/* চাইলে যোগ করো */}
              <th className="text-base">Action</th>
            </tr>
          </thead>

          <tbody className="text-base-content">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-500 text-lg">
                  No completed projects yet
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-base-200/50 transition-colors">
                  <th className="font-medium">{index + 1}</th>

                  <td className="font-medium">{booking.serviceName}</td>

                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold">{booking.customerName || 'Guest'}</span>
                      <span className="text-sm text-gray-500">{booking.customerEmail}</span>
                    </div>
                  </td>

                  <td className="text-gray-700">
                    {booking.paidAt
                      ? new Date(booking.paidAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </td>

                  <td className="text-gray-700">{booking.location || 'N/A'}</td>

                  <td className="font-bold text-green-700">
                    ${Number(booking.paidAmountUSD || 0).toFixed(2)}
                  </td>

                  <td className="font-medium text-info">
                    ${calculatePayout(booking)}
                  </td>

                  <td>
                    <button className="btn btn-primary btn-sm text-white">
                      Cash out
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedProjects;