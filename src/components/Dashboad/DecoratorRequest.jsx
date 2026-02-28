import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';
import { Link } from 'react-router';

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
      const updateInfo = { status: status, email: request.email };

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
      <h2 className="flex justify-center text-2xl font-bold mb-8 text-primary tracking-tight">
        Decorator Requests Pending Approval: {requests.length}
      </h2>

      <div className="rounded-xl border border-base-300/40 shadow-lg bg-base-100 overflow-hidden">
        <table className="w-full border-separate md:border-spacing-y-3">

          {/* Desktop Header */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-primary text-primary-content">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-4 md:table-row-group md:gap-0 p-3 md:p-0">
            {requests.map((request, index) => (
              <tr
                key={request._id}
                className="
            flex flex-col md:table-row
            bg-base-200 md:bg-base-100
            rounded-xl md:rounded-xl
            p-4 md:p-0
            shadow md:shadow-md
            transition hover:shadow-lg
          "
              >

                <td className="md:table-cell p-2 md:p-4">
                  <span className="md:hidden font-semibold text-primary">#:</span> {index + 1}
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <span className="md:hidden font-semibold">Name:</span> {request.name || 'N/A'}
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <span className="md:hidden font-semibold">Email:</span> {request.email}
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <span className="md:hidden font-semibold">Phone:</span> {request.phone || 'Not provided'}
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <span className="md:hidden font-semibold">Experience:</span>{' '}
                  {request.experience ? `${request.experience} years` : 'Not specified'}
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <span
                    className={`badge font-semibold
                ${request.status === 'approved'
                        ? 'badge-success'
                        : request.status === 'rejected'
                          ? 'badge-error'
                          : 'badge-warning'
                      }`}
                  >
                    {request.status
                      ? request.status.charAt(0).toUpperCase() + request.status.slice(1)
                      : 'Pending'}
                  </span>
                </td>

                <td className="md:table-cell p-2 md:p-4">
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      to={`/dashboard/view-decorator/${request._id}`}
                      className="btn btn-xs btn-outline btn-info"
                    >
                      <FaEye />
                    </Link>

                    <button
                      onClick={() => handleApproval(request)}
                      className="btn btn-xs btn-outline btn-success"
                      disabled={request.status === 'approved'}
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      onClick={() => handleRejection(request)}
                      className="btn btn-xs btn-outline btn-error"
                      disabled={
                        request.status === 'rejected' ||
                        request.status === 'approved'
                      }
                    >
                      <IoPersonRemoveSharp />
                    </button>

                    <button
                      onClick={() => handleDelete(request)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaTrashCan />
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