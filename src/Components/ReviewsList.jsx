/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../database/supabase.js";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  const length = review?.imageUrls.length;
  return (
    <div className="w-[85vw] sm:w-[70vw] xl:w-[60vw] mb-8 lg:flex gap-6 rounded-2xl shadow-2xl overflow-hidden bg-white">
      <img
        src={review?.imageUrls?.[length - 1]}
        alt={review?.name || "Review Image"}
        className=" w-full lg:w-[30vw] xl:w-[25vw] h-[30vh] sm:h-[35vh] lg:h-[51vh] xl:h-[40vh]"
      />
      <div className=" p-6 flex flex-col justify-between text-center lg:w-[40vw] xl:w-[35vw]">
        <div>
          <p className="text-xl font-bold text-heading">{review?.name}</p>
          <p className="text-xs pt-1 text-gray-500">{review?.email}</p>
        </div>

        <p className="text-sm sm:text-base pt-4 pb-6">
          {review?.reviewDetail || "No review details provided."}
        </p>

        <button
          className="w-full p-3 border rounded-3xl border-heading text-heading hover:bg-heading hover:text-white transition"
          onClick={() => navigate(`/reviewDetails/${review?.id}`)}
        >
          Read Me..
        </button>
      </div>
    </div>
  );
};

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("review")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95vw] lg:w-[60vw] mx-auto my-8 flex flex-col items-center gap-6"
    >
      <h2 className="text-2xl font-bold text-heading py-4 text-center">
        RECENT REVIEWS
      </h2>

      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p className="text-center text-gray-500">No reviews available</p>
      )}
    </motion.div>
  );
};

export default ReviewsList;
