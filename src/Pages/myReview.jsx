/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { fetchReviewsByUser } from "../api/reviews.js";
import ReviewCard from "../Components/ReviewCard.jsx";
import Animation from "../assets/Business Idea Animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useMainConext } from "../hooks/useMainContext.js";

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const { session } = useMainConext();
  const currentUser = session?.user?.email;

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchReviewsByUser(currentUser);
      setReviews(data);
    };

    fetchReviews();
  }, [currentUser]);

  if (!reviews.length) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95vw] lg:w-[60vw] mx-auto my-8 flex flex-col items-center gap-6"
    >
      <h2 className="text-2xl font-bold text-heading py-4 text-center">
        MY REVIEWS
      </h2>

      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p className="text-center text-gray-500">No reviews available</p>
      )}
    </motion.div>
  );
};

export default MyReview;
