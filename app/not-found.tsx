"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Floating 404 Text */}
      <motion.h1
        className="absolute text-[25rem] font-extrabold text-gray-700 opacity-10 select-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Animated Card */}
      <motion.div
        className="relative z-10 rounded-3xl bg-white/10 backdrop-blur-md p-10 text-center shadow-lg border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-6xl font-bold text-white drop-shadow-lg">Oops!</h2>
        <p className="mt-4 text-lg text-gray-300">The page you're looking for doesn't exist.</p>

        {/* Return Home Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-xl transition duration-300"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Glow Effect */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"
        initial={{ x: "-50%", y: "-50%", scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}
