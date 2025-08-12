/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchReviews, fetchReviewsByFilter } from "../api/reviews.js";

import ReviewCard from "./ReviewCard.jsx";
import Search from "./Search.jsx";
import { useMainConext } from "../hooks/useMainContext.js";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../assets/Business Idea Animation.json";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setloading] = useState(false);
  const { filter } = useMainConext();

  useEffect(() => {
    const getReviews = async () => {
      setloading(true);
      if (filter) {
        const filteredReviews = await fetchReviewsByFilter(filter);
        setReviews(filteredReviews);
        setloading(false);
      } else {
        const allReviews = await fetchReviews();
        setReviews(allReviews);
        setloading(false);
      }
    };
    getReviews();
  }, [filter]);

  if (loading) {
    return (
      <Player
        autoplay
        loop
        src={Animation}
        style={{ height: "80vh", width: "80vw" }}
      />
    );
  }

  return (
    <>
      <Search />
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
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews available</p>
        )}
      </motion.div>
    </>
  );
};

export default ReviewsList;
