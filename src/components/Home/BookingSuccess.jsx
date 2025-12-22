import { useSearchParams, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import Container from '../Shared/Container';
import Heading from '../Shared/Heading';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);

  // Safe way: manually parse query params if hook fails (fallback)
  const sessionId = searchParams.get('session_id') || 
    new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    if (sessionId) {
      console.log('Payment successful! Session ID:', sessionId);
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />}

      <Container>
        <div className="pt-20 pb-32 flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <FaCheckCircle className="text-9xl text-green-500 drop-shadow-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <Heading
              title="Booking & Payment Successful!"
              subtitle="Thank you for your booking. We will contact you soon to confirm the details."
              center
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-green-600 mt-8 font-medium"
          >
            Your service has been booked successfully!
          </motion.p>

          {sessionId && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-sm text-gray-500 mt-6 bg-gray-100 px-4 py-2 rounded-full"
            >
              Session ID: <span className="font-mono">{sessionId}</span>
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10"
          >
            <a
              href="/services"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore More Services
            </a>
          </motion.div>
        </div>
      </Container>
    </>
  );
};

export default BookingSuccess;