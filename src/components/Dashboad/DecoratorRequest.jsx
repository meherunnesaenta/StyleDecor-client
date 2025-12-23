import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const DecoratorRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['decorator-requests'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/decorator-requests');
      return data;
    },
  });

  const handleApprove = async (email) => {
    try {
      const res = await axiosSecure.patch(`/approve-decorator/${email}`);
      if (res.data.success) {
        toast.success(`Approved ${email} as Decorator!`);
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.delete(`/reject-decorator/${id}`);
      if (res.data.success) {
        toast.success('Application rejected');
        refetch();
      }
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  if (isLoading) return <Loading />;

  if (requests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Decorator Requests</h2>
        <p className="text-gray-600">No pending applications at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Decorator Applications ({requests.length})
      </h2>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Portfolio
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-4 bg-gray-100 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 font-medium">{req.name || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900">{req.email}</p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900">{req.phone || 'Not provided'}</p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900">{req.experience} years</p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    {req.portfolio ? (
                      <a
                        href={req.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Portfolio
                      </a>
                    ) : (
                      <p className="text-gray-500">Not provided</p>
                    )}
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900">
                      {new Date(req.appliedAt).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(req.email)}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DecoratorRequests;