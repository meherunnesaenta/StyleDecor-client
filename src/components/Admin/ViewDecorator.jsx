import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ViewDecorator = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();

  const [decorator, setDecorator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDecorator = async () => {
      try {
        const res = await axiosSecure.get(`/decorators/${id}`);
        setDecorator(res.data);
      } catch (err) {
        console.error('Error fetching decorator:', err);
        setError(err?.response?.data?.message || 'Failed to load decorator details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDecorator();
    }
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-xl text-gray-600">Decorator details loading...</p>
        </div>
      </div>
    );
  }

  if (error || !decorator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || 'Decorator not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    experience,
    portfolio,
    region,
    district,
    area,
    specialization,
    bio,
    status,
    appliedAt,
  } = decorator;

  const statusColor = {
    pending: 'badge-warning text-warning-content',
    approved: 'badge-success text-success-content',
    rejected: 'badge-error text-error-content',
    active: 'badge-info text-info-content',
  }[status?.toLowerCase()] || 'badge-neutral';

  const formattedDate = appliedAt
    ? format(new Date(appliedAt), 'MMMM dd, yyyy')
    : 'N/A';

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Cover */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative px-6 pb-12 md:px-12 md:pb-16 -mt-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="avatar w-40 h-40 md:w-48 md:h-48 rounded-full ring-8 ring-white shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl font-bold text-indigo-600">
                {name?.charAt(0) || '?'}
              </div>

              <div className="text-center md:text-left mt-4 md:mt-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {name || 'Unknown Decorator'}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  <div className={`badge ${statusColor} badge-lg px-6 py-4 font-semibold text-base`}>
                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
                  </div>

                  <div className="badge badge-outline badge-lg px-6 py-4 font-medium">
                    {specialization || 'General'}
                  </div>

                  <div className="badge badge-outline badge-lg px-6 py-4 font-medium">
                    {area}, {region} , {district}
                  </div>
                </div>

                <div className="text-gray-700 text-lg space-y-2 mb-8">
                  <p><strong>Experience:</strong> {experience || 0} years</p>
                  <p><strong>Joined:</strong> {formattedDate}</p>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {phone && (
                    <a href={`tel:${phone}`} className="btn btn-outline btn-primary gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {phone}
                    </a>
                  )}

                  <a href={`mailto:${email}`} className="btn btn-outline btn-secondary gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>

                  {portfolio && (
                    <a
                      href={portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-accent gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {bio && (
              <div className="mt-12 px-4 md:px-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                  {bio}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg gap-2 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Decorators
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewDecorator;