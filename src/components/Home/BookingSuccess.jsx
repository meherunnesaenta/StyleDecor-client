import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline, IoAlertCircleOutline } from 'react-icons/io5';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('No payment session found.');
      return;
    }

    setStatus('verifying');

    axios.post(
      `${import.meta.env.VITE_API_URL}/payment-success`,
      { sessionId },
      { withCredentials: true } 
    ).then((response) => {
        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message || 'Your booking is confirmed!');
        }
      })
      .catch((error) => {
        console.error('Booking confirmation failed:', error);
        setStatus('error');
        setMessage(
          error.response?.data?.message || 'Failed to confirm booking. Please contact support.'
        );
      });
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-primary mx-auto mb-8"></div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Verifying Your Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your booking.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <IoBagCheckOutline className="w-24 h-24 text-green-500 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              {message}
            </p>
            <div className="space-y-4">
              <Link
                to="/dashboard/my-bookings"
                className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition text-lg"
              >
                View My Bookings
              </Link>
              <Link
                to="/services"
                className="block w-full border-2 border-primary text-primary font-bold py-4 rounded-xl hover:bg-primary/10 transition text-lg"
              >
                Browse More Services
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <IoAlertCircleOutline className="w-24 h-24 text-red-500 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Something Went Wrong</h1>
            <p className="text-xl text-gray-600 mb-8">
              {message}
            </p>
            <Link
              to="/services"
              className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition text-lg"
            >
              Back to Services
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;