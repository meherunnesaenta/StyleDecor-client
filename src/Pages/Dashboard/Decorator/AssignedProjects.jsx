import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Heading from '../../../components/Shared/Heading';

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
    <div className="p-6 md:p-10 bg-base min-h-screen">
      <Heading
        title="Assigned Projects"
        subtitle="Here is the project that is provided specially for you"
        center={true}
      />
              <h4 className='text-base text-xl flex justify-center items-center'> Total project {bookings.length}</h4>
      <div className="bg-base rounded-2xl shadow-lg border border-base-200 p-2">
        <div className="overflow-hidden md:overflow-x-auto">
          <table className="table table-zebra table-auto w-full md:table-fixed">
            {/* head */}
            <thead className="hidden md:table-header-group bg-primary text-white">
              <tr>
                <th className="text-base">Service</th>
                <th className="text-base">Customer</th>
                <th className="text-base">Date</th>
                <th className="text-base">Location</th>
                <th className="text-base">Amount</th>
                <th className="text-base">Confirm</th>
                <th className="text-base">Other Actions</th>
              </tr>
            </thead>

            <tbody className="text-base-content md:table-row-group flex flex-col gap-4 md:gap-0">
              {bookings.length === 0 ? (
                <tr className="md:table-row flex flex-col md:flex-row">
                  <td colSpan={8} className="text-center py-10 text-lg md:py-4">
                    No projects assigned yet
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-base transition-colors border md:border-none rounded-xl md:rounded-none flex flex-col md:table-row p-4 md:p-0"
                  >
                    <td className="font-medium md:table-cell" data-label="Service">
                      {booking.serviceName}
                    </td>
                    <td className="md:table-cell" data-label="Customer">
                      <div className="flex flex-col">
                        <span className="font-semibold">{booking.customerName || 'Guest'}</span>
                        <span className="text-sm text-base">{booking.customerEmail}</span>
                      </div>
                    </td>
                    <td className="md:table-cell" data-label="Date">
                      {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="md:table-cell" data-label="Location">
                      {booking.location || 'N/A'}
                    </td>
                    <td className="font-bold text-green-700 md:table-cell" data-label="Amount">
                      ${Number(booking.paidAmountUSD || 0).toFixed(2)}
                    </td>
                    <td className="md:table-cell" data-label="Confirm">
                      {booking.workStatus === 'assigned' ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleWorkStatusUpdate(booking, 'in-progress')}
                            className="btn btn-primary btn-sm text-base"
                          >
                            Start Project
                          </button>
                          <button
                            onClick={() => handleWorkStatusUpdate(booking, 'rejected')}
                            className="btn btn-warning btn-sm text-base"
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
                    <td className="md:table-cell" data-label="Other Actions">
                      {booking.workStatus !== 'completed' && booking.workStatus !== 'rejected' ? (
                        <div className="flex flex-col md:flex-row gap-2">
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
                        </div>
                      ) : (
                        <span
                          className={`badge badge-lg px-4 py-3 ${booking.workStatus === 'completed' ? 'badge-success' : 'badge-error'}`}
                        >
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
    </div>
  );
};

export default AssignedProjects;