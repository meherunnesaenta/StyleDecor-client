import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

const DecoratorRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['decorator', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators');
      return res.data;
    },
  });

  const updateDecoratorStatus = async (request, status) => {
    try {
      const updateInfo = { status:status ,email: request.email };

      const res = await axiosSecure.patch(`/decorators/${request._id}`, updateInfo);

      if (res.data?.modifiedCount > 0) {
        await refetch(); 

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: status === 'approved' 
            ? 'Decorator approved successfully!' 
            : 'Decorator rejected successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error('Error updating decorator status:', err);

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update decorator status',
        text: err?.response?.data?.message || 'Something went wrong',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const handleApproval = (request) => {
    updateDecoratorStatus(request, 'approved');
  };

  const handleRejection = (request) => {
    updateDecoratorStatus(request, 'rejected');
  };

  const handleDelete = async (request) => {
    // SweetAlert দিয়ে কনফার্মেশন
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${request.name || request.email}'s decorator application?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/decorators/${request._id}`);

      if (res.data?.success) {
        await refetch();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Deleted successfully!',
          text: 'Decorator request has been removed.',
          showConfirmButton: false,
          timer: 1800
        });
      }
    } catch (err) {
      console.error('Delete error:', err);

      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err?.response?.data?.message || 'Something went wrong',
        timer: 3000
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
<div className="p-6 bg-base-100 rounded-2xl shadow-xl border border-base-200/50">
  <h2 className="flex justify-center text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
    Decorator Requests Pending Approval: {requests.length}
  </h2>

  <div className="overflow-x-auto rounded-xl border border-base-300/40 shadow-lg">
    <table className="table table-lg table-zebra w-full">
      {/* Header */}
      <thead>
        <tr className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-content">
          <th className="text-base">#</th>
          <th className="text-base">Name</th>
          <th className="text-base">Email</th>
          <th className="text-base">Phone</th>
          <th className="text-base">Experience</th>
          <th className="text-base">Status</th>
          <th className="text-base text-center">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-base-300/30">
        {requests.map((request, index) => (
          <tr
            key={request._id}
            className={`
              group transition-all duration-300 ease-out
              hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10
              hover:shadow-lg hover:scale-[1.015] hover:-translate-y-0.5
              ${index % 2 === 0 ? 'bg-base-200/30' : 'bg-base-100'}
            `}
          >
            <th className="text-primary font-semibold">{index + 1}</th>
            <td className="font-medium">{request.name || 'N/A'}</td>
            <td className="text-info">{request.email}</td>
            <td>{request.phone || 'Not provided'}</td>
            <td className="text-neutral">
              {request.experience ? `${request.experience} years` : 'Not specified'}
            </td>
            <td>
              <div
                className={`
                  badge badge-lg font-semibold px-4 py-3
                  ${request.status === 'approved'
                    ? 'badge-success text-success-content animate-pulse'
                    : request.status === 'rejected'
                    ? 'badge-error text-error-content'
                    : 'badge-warning text-warning-content animate-bounce-slow'
                  }
                `}
              >
                {request.status
                  ? request.status.charAt(0).toUpperCase() + request.status.slice(1)
                  : 'Pending'}
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {/* View Details */}
                <button
                  className="btn btn-sm btn-outline btn-info tooltip tooltip-bottom glass"
                  data-tip="View Details"
                >
                  <FaEye className="text-lg transition-transform group-hover:scale-110" />
                </button>

                {/* Approve */}
                <button
                  onClick={() => handleApproval(request)}
                  className={`
                    btn btn-sm btn-outline btn-success tooltip tooltip-bottom glass
                    transition-all duration-300 hover:scale-110 hover:shadow-success/40
                  `}
                  data-tip="Approve"
                  disabled={request.status === 'approved'}
                >
                  <FaUserCheck className="text-lg" />
                </button>

                {/* Reject */}
                <button
                  onClick={() => handleRejection(request)}
                  className={`
                    btn btn-sm btn-outline btn-error tooltip tooltip-bottom glass
                    transition-all duration-300 hover:scale-110 hover:shadow-error/40
                  `}
                  data-tip="Reject"
                  disabled={request.status === 'rejected' || request.status === 'approved'}
                >
                  <IoPersonRemoveSharp className="text-lg" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(request)}
                  className={`
                    btn btn-sm btn-outline btn-error tooltip tooltip-bottom glass
                    transition-all duration-300 hover:scale-110 hover:shadow-error/50
                  `}
                  data-tip="Delete"
                >
                  <FaTrashCan className="text-lg" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default DecoratorRequests;