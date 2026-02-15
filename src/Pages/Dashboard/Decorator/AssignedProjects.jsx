import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['bookings', user.email, 'decorator-tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user.email}`);
      return res.data;
    }
  });

  const handleWorkStatusUpdate = (booking, status) => {
    const statusInfo = {
      workStatus: status,
      decoratorId: booking.decoratorId,
      bookingId: booking._id
    };

    let message = `Project status updated to ${status.split('_').join(' ')}`;

    axiosSecure
      .patch(`/bookings/${booking._id}/decorator-status`, statusInfo)
      .then(async (res) => {
        if (res.data.modifiedCount > 0) { 
          if (status === 'completed' || status === 'rejected') {
            try {
              await axiosSecure.patch(`/decorators/${booking.decoratorId}/work-status`, {
                workStatus: 'available'
              });
              console.log('Decorator set back to available');
            } catch (decoratorErr) {
              console.warn('Failed to set decorator available (optional):', decoratorErr);
            }
          }

          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(err => {
        console.error('Status update failed:', err);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err?.response?.data?.message || "Something went wrong"
        });
      });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Assigned Projects: {bookings.length}
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-base-200">
        <table className="table table-zebra table-lg w-full">
          {/* head */}
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th className="text-base">#</th>
              <th className="text-base">Service</th>
              <th className="text-base">Customer</th>
              <th className="text-base">Date</th>
              <th className="text-base">Location</th>
              <th className="text-base">Amount</th>
              <th className="text-base">Confirm</th>
              <th className="text-base">Other Actions</th>
            </tr>
          </thead>

          <tbody className="text-base-content">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-gray-500 text-lg">
                  No projects assigned yet
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
                    {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>

                  <td className="text-gray-700">{booking.location || 'N/A'}</td>

                  <td className="font-bold text-green-700">
                    ${Number(booking.paidAmountUSD || 0).toFixed(2)}
                  </td>

                  <td>
                    {booking.workStatus === 'assigned' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleWorkStatusUpdate(booking, 'in-progress')}
                          className="btn btn-primary btn-sm text-white"
                        >
                          Start Project
                        </button>
                        <button
                          onClick={() => handleWorkStatusUpdate(booking, 'rejected')}
                          className="btn btn-warning btn-sm text-white"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-success badge-lg px-4 py-3">
                        {booking.workStatus?.toUpperCase() || 'In Progress'}
                      </span>
                    )}
                  </td>

                  <td className="space-x-2">
                    {booking.workStatus !== 'completed' && booking.workStatus !== 'rejected' ? (
                      <>
                        <button
                          onClick={() => handleWorkStatusUpdate(booking, 'materials-prepared')}
                          className="btn btn-outline btn-sm btn-info"
                        >
                          Materials Ready
                        </button>
                        <button
                          onClick={() => handleWorkStatusUpdate(booking, 'completed')}
                          className="btn btn-outline btn-sm btn-success"
                        >
                          Mark as Completed
                        </button>
                      </>
                    ) : (
                      <span className={`badge badge-lg px-4 py-3 ${booking.workStatus === 'completed' ? 'badge-success' : 'badge-error'}`}>
                        {booking.workStatus.toUpperCase()}
                      </span>
                    )}
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

export default AssignedProjects;