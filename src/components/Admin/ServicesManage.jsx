import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Heading from '../Shared/Heading';
import Loading from '../Loading/Loading';

const ServicesManage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState(null);

  // Fetch all services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services-admin'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/service');
      return data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/service/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['services-admin']);
      Swal.fire('Deleted!', 'Service has been deleted.', 'success');
    },
    onError: (err) => {
      Swal.fire('Error!', err?.response?.data?.message || 'Failed to delete service', 'error');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      await axiosSecure.patch(`/service/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['services-admin']);
      setEditingService(null);
      Swal.fire('Updated!', 'Service has been updated.', 'success');
    },
    onError: (err) => {
      Swal.fire('Error!', err?.response?.data?.message || 'Failed to update service', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      service_name: form.service_name.value,
      cost: Number(form.cost.value),
      serviceMode: form.serviceMode.value,
      description: form.description.value,
      
    };
    updateMutation.mutate({ id: editingService._id, updatedData });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <Heading
        title="Manage Services"
        subtitle="Update or Delete existing decoration services"
        center={true}
      />

      {/* Edit Form Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Service</h2>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Name</label>
                  <input
                    type="text"
                    name="service_name"
                    defaultValue={editingService.service_name}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cost (BDT)</label>
                  <input
                    type="number"
                    name="cost"
                    defaultValue={editingService.cost}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Mode</label>
                  <select
                    name="serviceMode"
                    defaultValue={editingService.serviceMode || 'indoor'}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingService.description}
                    className="w-full px-4 py-2 border rounded-lg h-32"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Table */}
      <div className="overflow-x-auto bg-base rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-base">
          <thead className="bg-base">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-base uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base uppercase tracking-wider">Cost (BDT)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base uppercase tracking-wider">Mode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-base divide-y divide-base">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-base">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-base">{service.service_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-base">৳{service.cost}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    service.serviceMode === 'indoor' ? 'bg-green-100 text-green-800' :
                    service.serviceMode === 'outdoor' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {service.serviceMode || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FaEdit className="inline" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="inline" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && !isLoading && (
        <div className="text-center py-12 text-base">
          No services found. Add some services first.
        </div>
      )}
    </div>
  );
};

export default ServicesManage;