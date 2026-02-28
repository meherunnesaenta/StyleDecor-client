import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Heading from '../../../components/Shared/Heading';

export default function UserManagement() {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeDecorator = (user) => {
    Swal.fire({
      title: 'Make decorator?',
      text: `Are you sure you want to make ${user.displayName || user.name || user.email} a decorator?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Decorator',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const roleRes = await axiosSecure.patch(`/users/${user._id}/role`, { role: 'decorator' });

          if (roleRes.data?.modifiedCount > 0) {
            // ২. decorator collection-এ নতুন approved ডকুমেন্ট পোস্ট করো
            const decoratorData = {
              name: user.displayName || user.name || 'Unknown',
              email: user.email,
              phone: user.phone || null,
              experience: 0,
              portfolio: null,
              region: null,
              district: null,
              specialization: null,
              bio: null,
              status: 'approved',
              workStatus: 'available',
              appliedAt: new Date(),
              userId: user.userId || null,
            };

            const createRes = await axiosSecure.post('/decorator/admin-create', decoratorData);
            console.log('Create decorator response:', createRes.data);

            if (createRes.data?.success) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.displayName || user.name || 'User'} is now a decorator!`,
                showConfirmButton: false,
                timer: 1800,
              });
            } else {
              throw new Error('Failed to create decorator entry');
            }
          }
        } catch (err) {
          console.error('Make decorator error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err?.response?.data?.message || err.message || 'Something went wrong',
          });
        }
      }
    });
  };

  const handleRemoveDecorator = (user) => {
    Swal.fire({
      title: 'Remove Decorator?',
      text: `Are you sure you want to remove decorator role from ${user.displayName || user.name || user.email}? This will delete their decorator profile.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Remove & Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ১. users-এ role 'user' করো
          const roleRes = await axiosSecure.patch(`/users/${user._id}/role`, { role: 'user' });

          if (roleRes.data?.modifiedCount > 0) {
            // ২. decorator delete (POST দিয়ে)
            const deleteRes = await axiosSecure.post('/decorators/delete-by-email', {
              email: user.email
            });

            console.log('Delete response:', deleteRes.data);

            if (deleteRes.data?.success || deleteRes.data?.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                text: `${user.displayName || user.name || 'User'} is no longer a decorator. Profile deleted.`,
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              throw new Error('Failed to delete decorator profile');
            }
          }
        } catch (err) {
          console.error('Remove decorator error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err?.response?.data?.message || err.message || 'Something went wrong',
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-base-100 min-h-screen">
              <Heading
          title='Manage User'
          subtitle={`here the showing users(${users.length})`}
          center={true}
        />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">



        {/* Search */}
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs md:max-w-sm shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search by name or email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

<div className="rounded-xl border border-base-300 shadow-lg bg-base-100 overflow-hidden">
  <table className="w-full border-separate md:border-spacing-y-3">
    
    {/* Desktop Header */}
    <thead className="hidden md:table-header-group">
      <tr className="bg-base-200 text-base-content">
        <th className="p-4 w-12">#</th>
        <th className="p-4 text-left">User</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Role</th>
        <th className="p-4 text-center">Make/Remove Decorator</th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>

    <tbody className="flex flex-col gap-4 md:table-row-group md:gap-0 p-4 md:p-0">
      {users.length === 0 ? (
        <tr className="bg-base-200 rounded-xl p-6">
          <td colSpan={6} className="text-center text-base-content/60">
            No users found matching "{searchText}"
          </td>
        </tr>
      ) : (
        users.map((user, index) => (
          <tr
            key={user._id}
            className="
              flex flex-col md:table-row
              bg-base-200 md:bg-base-100
              rounded-xl md:rounded-xl
              shadow md:shadow-md
              hover:shadow-lg transition
              p-4 md:p-0
            "
          >
            
            {/* Index */}
            <td className="md:table-cell p-2 md:p-4 font-medium">
              <span className="md:hidden font-semibold text-primary">#:</span>
              {index + 1}
            </td>

            {/* User */}
            <td className="md:table-cell p-2 md:p-4">
              <span className="md:hidden font-semibold">User:</span>
              <div className="flex items-center gap-3 mt-1 md:mt-0">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img
                      src={user.photoURL || "https://i.ibb.co/5YqB9fF/user.png"}
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    {user.displayName || user.name || "Unknown"}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {user?.location || "N/A"}
                  </div>
                </div>
              </div>
            </td>

            {/* Email */}
            <td className="md:table-cell p-2 md:p-4 text-info break-all">
              <span className="md:hidden font-semibold">Email:</span>
              {user.email}
            </td>

            {/* Role */}
            <td className="md:table-cell p-2 md:p-4">
              <span
                className={`badge badge-lg font-semibold ${
                  user.role === "admin"
                    ? "badge-success"
                    : user.role === "moderator"
                    ? "badge-info"
                    : "badge-neutral"
                }`}
              >
                {user.role ? user.role.toUpperCase() : "USER"}
              </span>
            </td>

            {/* Make / Remove Decorator */}
            <td className="md:table-cell p-2 md:p-4 text-center">
              {user.role === "decorator" ? (
                <button
                  onClick={() => handleRemoveDecorator(user)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FiShieldOff className="text-lg" />
                </button>
              ) : (
                <button
                  onClick={() => handleMakeDecorator(user)}
                  className="btn btn-sm btn-outline btn-success"
                >
                  <FaUserShield className="text-lg" />
                </button>
              )}
            </td>

            {/* Actions */}
            <td className="md:table-cell p-2 md:p-4 text-center">
              <button className="btn btn-sm btn-outline">
                •••
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
}