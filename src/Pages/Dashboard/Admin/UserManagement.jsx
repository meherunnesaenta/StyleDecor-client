import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

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

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Make Admin?',
      text: `Are you sure you want to make ${user.displayName || user.name || user.email} an Admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.displayName || user.name || 'User'} is now Admin!`,
              showConfirmButton: false,
              timer: 1800,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: 'Remove Admin?',
      text: `Are you sure you want to remove admin role from ${user.displayName || user.name || user.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Remove',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.displayName || user.name || 'User'} is no longer Admin`,
              showConfirmButton: false,
              timer: 1800,
            });
          }
        });
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Manage Users
          </h2>
          <p className="text-lg opacity-70 mt-1">
            Total users: <span className="font-bold">{users.length}</span>
          </p>
        </div>

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

      <div className="overflow-x-auto rounded-xl border border-base-300 shadow-lg">
        <table className="table table-zebra table-lg">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th className="w-12">#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Make/Remove Admin</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-base-content/60">
                  No users found matching "{searchText}"
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <td className="font-medium">{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photoURL || 'https://i.ibb.co/5YqB9fF/user.png'}
                            alt="User avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {user.displayName || user.name || 'Unknown'}
                        </div>
                        <div className="text-sm opacity-60">
                          {user?.location || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-info">{user.email}</td>
                  <td>
                    <div
                      className={`badge badge-lg font-semibold ${
                        user.role === 'admin'
                          ? 'badge-success'
                          : user.role === 'moderator'
                          ? 'badge-info'
                          : 'badge-neutral'
                      }`}
                    >
                      {user.role ? user.role.toUpperCase() : 'USER'}
                    </div>
                  </td>
                  <td className="text-center">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm btn-outline btn-error tooltip tooltip-bottom"
                        data-tip="Remove Admin"
                      >
                        <FiShieldOff className="text-lg" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-outline btn-success tooltip tooltip-bottom"
                        data-tip="Make Admin"
                      >
                        <FaUserShield className="text-lg" />
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-ghost btn-outline tooltip tooltip-bottom" data-tip="More Actions">
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