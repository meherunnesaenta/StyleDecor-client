import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Heading from '../../../components/Shared/Heading';

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
    if (booking.paidAmountUSD === booking.servicePriceUSD) {
      return (booking.paidAmountUSD * 0.9).toFixed(2);

    } else {
      return (booking.paidAmountUSD * 0.8).toFixed(2);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-base min-h-screen">

            <Heading
        title={`Completed Projects: (${bookings.length})`}
        subtitle="Here is the project that is Completed"
        center={true}
      />

      <div className="bg-base rounded-2xl shadow-lg border border-base-200 p-2">
        <div className="overflow-hidden md:overflow-x-auto">
          <table className="table table-zebra table-auto w-full md:table-fixed">
            {/* head */}
            <thead className="hidden md:table-header-group bg-gradient-to-r from-primary to-secondary text-white">
              <tr>
                <th className="text-base">#</th>
                <th className="text-base">Service</th>
                <th className="text-base">Customer</th>
                <th className="text-base">Completed Date</th>
                <th className="text-base">Location</th>
                <th className="text-base">Amount</th>
                <th className="text-base">Payout</th>
                <th className="text-base">Action</th>
              </tr>
            </thead>

            <tbody className="text-base-content md:table-row-group flex flex-col gap-4 md:gap-0">
              {bookings.length === 0 ? (
                <tr className="md:table-row flex flex-col md:flex-row">
                  <td colSpan={8} className="text-center py-10 text-lg">
                    No completed projects yet
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-base transition-colors border md:border-none rounded-xl md:rounded-none flex flex-col md:table-row p-4 md:p-0"
                  >
                    <td className="font-medium md:table-cell" data-label="#">
                      {index + 1}
                    </td>
                    <td className="font-medium md:table-cell" data-label="Service">
                      {booking.serviceName}
                    </td>
                    <td className="md:table-cell" data-label="Customer">
                      <div className="flex flex-col">
                        <span className="font-semibold">{booking.customerName || 'Guest'}</span>
                        <span className="text-sm text-base">{booking.customerEmail}</span>
                      </div>
                    </td>
                    <td className="md:table-cell" data-label="Completed Date">
                      {booking.paidAt
                        ? new Date(booking.paidAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                        : 'N/A'}
                    </td>
                    <td className="md:table-cell" data-label="Location">
                      {booking.location || 'N/A'}
                    </td>
                    <td className="font-bold text-green-700 md:table-cell" data-label="Amount">
                      ${Number(booking.paidAmountUSD || 0).toFixed(2)}
                    </td>
                    <td className="font-medium text-info md:table-cell" data-label="Payout">
                      ${calculatePayout(booking)}
                    </td>
                    <td className="md:table-cell" data-label="Action">
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
    </div>
  );
};

export default CompletedProjects;