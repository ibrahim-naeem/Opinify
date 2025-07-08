/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../database/supabase.js";
const Data = ({ data, navigate }) => {
  return (
    <div
      // key={data?.id}
      className="w-[85vw] sm:w-[70vw] xl:w-[60vw] mb-8 lg:flex gap-10 md:gap-3 rounded-2xl shadow-2xl overflow-hidden"
    >
      <img
        src={data?.imageUrls[0]}
        alt="image"
        className="w-[85vw] sm:w-[70vw] md:w-[30vw] xl:w-[25vw] h-[30vh] sm:h-[35vh] lg:h-[51vh] xl:h-[40vh]"
      />
      <div className=" w-[80vw] sm:w-[60vw] md:w-[35vw] xl:w-[30vw] py-6 lg:flex lg:flex-col lg:justify-around text-center mx-auto">
        <div className="gap-7">
          <p className=" text-xl text-heading font-bold">{data?.name}</p>
          <p className="text-xs pt-2">{data?.email}</p>
        </div>
        <p className="text-sm sm:text-base pt-2 pb-4">
          {data?.reviewDetail || "No review details provided."}
        </p>
        <button
          className="mx-auto w-[70vw] sm:w-[60vw] md:w-[35vw] xl:w-[30vw] p-4 border rounded-4xl border-heading text-heading"
          // onClick={() => navigate(`/reviewDetails/${1234}`)}
        >
          Read Me..
        </button>
      </div>
    </div>
  );
};

function ReviewsList() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("review")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching reviews:", error.message);
      setReviews(data);

      console.log("Fetched reviews:", data);
    };

    fetchReviews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95vw] lg:w-[60vw] mx-auto my-8 bg-white flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl py-4 font-bold text-center text-heading">
        RECENT REVIEWS
      </h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Data key={review?.id} data={review} navigate={navigate} />
        ))
      ) : (
        <p className="text-center text-gray-500">No reviews available</p>
      )}
    </motion.div>
  );
}

export default ReviewsList;
