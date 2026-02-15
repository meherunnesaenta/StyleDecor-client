import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import Heading from '../../components/Shared/Heading';


const Trackproduct = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: trackings = [], isLoading, error } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    enabled: !!trackingId, // trackingId না থাকলে query চলবে না
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <Heading title="Error" subtitle="Failed to load tracking information" />
        <p className="text-red-600 mt-4">{error?.message || 'Something went wrong'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 btn btn-error"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Heading
          title={`Track Your Order: ${trackingId}`}
          subtitle="Real-time updates on your booking status"
          center={true}
        />

        <div className="mt-10">
          <p className="text-center text-lg mb-6">
            Total Logs: <span className="font-bold">{trackings.length}</span>
          </p>

          {trackings.length === 0 ? (
            <div className="alert alert-info shadow-lg max-w-xl mx-auto">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>No tracking updates yet. Please check back later.</span>
              </div>
            </div>
          ) : (
            <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon max-md:timeline-compact">
              {trackings.map((log, index) => (
                <li key={log._id}>
                  {index !== trackings.length - 1 && <hr className="bg-primary" />}

                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-5 w-5 ${log.status.includes('Completed') ? 'text-success' : log.status.includes('Rejected') ? 'text-error' : 'text-primary'}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className={`timeline-end mb-10 ${index % 2 === 0 ? 'md:timeline-start' : ''}`}>
                    <div className="card bg-base-100 shadow-xl border border-base-300">
                      <div className="card-body p-6">
                        <time className="font-mono italic text-sm opacity-70">
                          {new Date(log.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                        <div className="text-lg font-semibold mt-2">
                          {log.details || log.status}
                        </div>
                        {log.extraInfo && (
                          <div className="text-sm opacity-70 mt-1">
                            {JSON.stringify(log.extraInfo)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {index !== trackings.length - 1 && <hr className="bg-primary" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trackproduct;