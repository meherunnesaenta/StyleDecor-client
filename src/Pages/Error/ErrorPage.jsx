import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const FloatingParticle = ({ delay }) => (
  <motion.div
    className="absolute text-secondary/20 text-4xl"
    initial={{ y: 100, opacity: 0 }}
    animate={{
      y: [0, -100, 0],
      opacity: [0.2, 0.5, 0.2],
      x: [0, 50, -50, 0],
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ✦
  </motion.div>
);

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden px-4">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 pointer-events-none"></div>

      {/* Floating particles animation (10 particles) */}
      {[...Array(10)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 2} />
      ))}

      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 404 Text with gold glow */}
        <motion.h1
          className="text-9xl font-bold text-primary mb-8"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(212, 175, 55, 0.5)",
              "0 0 40px rgba(212, 175, 55, 0.8)",
              "0 0 20px rgba(212, 175, 55, 0.5)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-3xl font-medium text-base-content/80 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Oops! Page Not Found
        </motion.p>

        <motion.p
          className="text-lg text-base-content/60 mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          The page you're looking for seems to have wandered off. Let's get you back to beautiful decorations.
        </motion.p>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Link
            to="/"
            className="btn btn-primary text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Subtle divider */}
        <div className="flex items-center justify-center mt-12">
          <div className="border-t border-primary/20 w-32"></div>
          <span className="mx-4 text-primary/40 text-3xl">✦</span>
          <div className="border-t border-primary/20 w-32"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;