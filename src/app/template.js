"use client";

import { motion } from "framer-motion";
import { AuthProvider } from "./auth-config/auth-config";
import Navbar from "./components/Navbar";
export default function Template({ children }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ from: 0, duration: 1.5 }}
    >
      <AuthProvider>
        <div className="layout">
          <Navbar />
          {children}
        </div>
      </AuthProvider>
    </motion.div>
  );
}
