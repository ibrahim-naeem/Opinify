import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  // const length = review?.imageUrls.length;

  return (
    <div className="w-[85vw] sm:w-[70vw] xl:w-[60vw] mb-8 lg:flex gap-6 rounded-2xl shadow-2xl overflow-hidden bg-white">
      <img
        src={review?.imageUrls?.[0]}
        alt={review?.name || "Review Image"}
        className="object-contain w-full lg:w-[30vw] xl:w-[25vw] h-[30vh] sm:h-[35vh] lg:h-[51vh] xl:h-[40vh] "
      />
      <div className="relative p-6 flex flex-col justify-between text-center lg:w-[40vw] xl:w-[35vw]">
        <h1 className="w-[70px] lg:w-[100px] absolute right-2 md:right-5 lg:right-2.5 top-0 text-xs text-heading p-2 hover:text-sm transition-all">
          {!review?.isApproved && "Approval pending "}
        </h1>
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

export default ReviewCard;
