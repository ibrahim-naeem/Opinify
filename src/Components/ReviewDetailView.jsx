import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";

import { supabase } from "../database/supabase";
import Animation from "../assets/Business Idea Animation.json";
import ImageCarousel from "./ImageCarousel";

function ReviewDetailView() {
  const { id } = useParams();
  const [review, setReview] = useState({});
  // const images = review?.imageUrls.reverse();
  // console.log("__", images);
  const isoDate = review?.created_at;
  const dateObj = new Date(isoDate);
  const formattedDate = `${dateObj.getFullYear()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}`;

  useEffect(() => {
    const fetchReviewWithID = async (reviewId) => {
      let { data, error } = await supabase
        .from("review")
        .select()
        .eq("id", reviewId);

      console.log(data[0]);

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReview(data[0]);
      }
    };
    fetchReviewWithID(id);
  }, [id]);

  if (!review?.id) {
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
      className=" w-[70vw] mx-auto my-10 bg-white flex flex-col items-center
    gap-4 rounded-2xl" //shadow-2xl
    >
      <ImageCarousel images={review?.imageUrls} />
      <div>{formattedDate}</div>
      <div>{review?.email}</div>
      <div>{review?.id}</div>
      <div>{review?.name}</div>
      <div>{review?.paymentType}</div>
      <div>{review?.phoneNumber}</div>
      <div>{review?.reviewDetail}</div>
      <div>{review?.socialLink}</div>
    </motion.div>
  );
}
export default ReviewDetailView;
