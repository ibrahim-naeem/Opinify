import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";

function ReviewDetailView() {
  const { id } = useParams();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-[70vw] mx-auto my-10 bg-white flex flex-col items-center
    gap-4 rounded-2xl shadow-2xl"
    >
      <h2 className="text-2xl py-6 font-bold text-center text-heading">
        ReviewDetailView : {id}
      </h2>
    </motion.div>
  );
}

export default ReviewDetailView;
