import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <span className="text-6xl text-secondary">✦</span>
        </motion.div>

        <motion.p
          className="text-2xl font-medium text-primary mb-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading StyleDecor
        </motion.p>

        <p className="text-base-content/70">Crafting elegant moments for you...</p>
      </motion.div>
    </div>
  );
};

export default Loading;