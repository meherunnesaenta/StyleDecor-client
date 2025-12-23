import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router'; 
import { IoBagCheckOutline } from 'react-icons/io5';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true); 

  useEffect(() => {
    if (sessionId) {
      
      axios
        .post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
        .then((response) => {
          console.log('Booking confirmed:', response.data);
          setIsVerifying(false);
        })
        .catch((error) => {
          console.error('Verification failed:', error);
          setIsVerifying(false);
        });
    } else {
      setIsVerifying(false);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        {isVerifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Verifying Booking...</h1>
            <p className="text-gray-600">Please wait while we confirm your payment.</p>
          </>
        ) : (
          
          <>
            <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your booking. Your service is confirmed and payment processed.
            </p>
            <Link
              to="/dashboard/my-bookings" // তোমার bookings list page
              className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Go to My Bookings
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;



