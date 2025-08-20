import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { supabase } from "../database/supabase";
import Animation from "../assets/Business Idea Animation.json";
import ImageCarousel from "./ImageCarousel";

function ReviewDetailView() {
  const { id } = useParams();
  const [review, setReview] = useState({});
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
    gap-4 rounded-2xl"
    >
      <div className="flex justify-between border-2 rounded-full bg-heading text-white w-[70vw] p-6 sm:px-20 lg:px-30 text-sm sm:text-xl font-bold">
        {/* <div>{review?.id}</div> */}
        <p>{review?.name}</p>
        <div>{formattedDate}</div>
      </div>
      <ImageCarousel images={review?.imageUrls} />

      <div className="overflow-hidden flex justify-center text-heading text-sm sm:text-xl rounded-2xl shadow-2xl w-[70vw] lg:w-[75vw] p-10">
        <div className="text-center lg:flex justify-between w-[300px] md:w-[450px] lg:w-[800px] xl:w-850px]">
          <div className="my-2 py-4 flex flex-col">
            <p className="pb-3"> {review?.email}</p>
            <p className="pb-3">{review?.paymentType}</p>
            <p className="pb-3">{review?.paymentDescription}</p>
            <p className="pb-3">{review?.phoneNumber}</p>
            <p>{review?.socialLink}</p>
          </div>
          <div className="w-[200px] md:w-[300px]  border-b-4 lg:border-2 lg:w-[1px] lg:ml-10 2xl:mr-10 rounded-4xl mx-auto mt-2 mb-6" />
          <div className=" mx-auto w-[300px]  md:w-[450px] xl:w-[500px] 2xl:w-[600px] px-6 leading-relaxed tracking-wide text-justify indent-0">
            <p>{review?.reviewDetail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewDetailView;
