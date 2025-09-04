import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { supabase } from "../database/supabase";
import Animation from "../assets/Business Idea Animation.json";
import ImageCarousel from "./ImageCarousel";

import { Mail, Phone, CreditCard, Link, Trash } from "lucide-react";
import { useMainConext } from "../hooks/useMainContext";

function ReviewDetailView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { admin } = useMainConext();
  const [review, setReview] = useState({});
  const isoDate = review?.created_at;
  const dateObj = new Date(isoDate);
  const formattedDate = `${dateObj.getFullYear()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}`;

  const handleDelete = async (reviewId) => {
    const { error } = await supabase.from("review").delete().eq("id", reviewId);

    if (error) {
      console.error("Error deleting review:", error.message);
    } else {
      alert("Review deleted successfully!");
      setReview({});
      navigate("/reviews");
    }
  };

  useEffect(() => {
    const fetchReviewWithID = async (reviewId) => {
      let { data, error } = await supabase
        .from("review")
        .select()
        .eq("id", reviewId);

      data?.length === 0 && navigate("/review");

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

  // eslint-disable-next-line react/prop-types
  const InfoRow = ({ icon: Icon, text, className = "" }) => (
    <div
      className={`flex items-center gap-2  rounded-full bg-white text-heading px-6 py-3 mb-3 ${className}`}
    >
      <Icon className="w-5 h-5 " />
      <p className=" break-all  text-sm w-[170px]">{text}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-[90vw] mx-auto my-10 flex flex-col items-center
    gap-4 rounded-2xl"
    >
      <div className="flex justify-between border-2 rounded-full bg-heading text-white w-[90vw] p-6 sm:px-20 lg:px-30 text-sm sm:text-xl font-bold">
        <p>{review?.name}</p>
        <div>{formattedDate}</div>
      </div>
      <ImageCarousel images={review?.imageUrls} className="w-[80vw]" />

      {/* card one */}
      <div className="sm:flex justify-around w-[80vw] sm:w-[70vw] text-heading sm:p-10  mx-auto  ">
        <div className="border-4 my-2 py-4 flex flex-col bg-heading text-white rounded-2xl p-4 sm:p-12">
          {review?.email && <InfoRow icon={Mail} text={review?.email} />}
          {review?.paymentType && (
            <InfoRow icon={CreditCard} text={review?.paymentType} />
          )}
          {review?.paymentDescription && (
            <InfoRow icon={CreditCard} text={review?.paymentDescription} />
          )}
          {review?.phoneNumber && (
            <InfoRow icon={Phone} text={review?.phoneNumber} />
          )}
          {review?.socialLink && (
            <InfoRow icon={Link} text={review?.socialLink} />
          )}
        </div>

        {/* divider line */}
        <div className="border-4  w-[200px] md:w-[300px] bg-heading border-b-4 lg:border-2 lg:w-[1px] lg:ml-10 2xl:mr-10 rounded-4xl mx-auto mt-6 mb-6" />
        {/* second card */}
        <div className="border shadow-2xl rounded-2xl  w-[80vw] sm:w-[300px]  md:w-[450px] xl:w-[500px] 2xl:w-[600px] p-6 leading-relaxed tracking-wide text-justify indent-0">
          <p>{review?.reviewDetail}</p>
        </div>
      </div>
      {admin && (
        <>
          <button
            onClick={() => handleDelete(review?.id)}
            className="w-[60vw] sm:w-[50vw] border rounded-full flex justify-center align-middle border-heading text-heading px-10 py-3 my-4 hover:bg-heading hover:text-white transition duration-300 ease-in-out"
          >
            <Trash className="inline h-6 mr-2" />
            Delete Review
          </button>
        </>
      )}
    </motion.div>
  );
}

export default ReviewDetailView;
