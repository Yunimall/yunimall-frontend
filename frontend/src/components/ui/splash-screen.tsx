// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


// for now, the user type value is password
const SplashScreen = () => {

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-2xl font-bold">Yunimall</h1>
    </motion.div>
  );
};


export default SplashScreen;
