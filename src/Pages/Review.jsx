import { useContext } from "react";

import Toggle from "../Components/Toggle";
import { MainContext } from "../Context/MainContext";
import AddReviewForm from "../Components/AddReviewForm";
import ReviewsList from "../Components/ReviewsList";

function Review() {
  const { toggle } = useContext(MainContext);

  return (
    <div className="flex flex-col items-center py-10">
      <Toggle />
      {toggle === "add" ? <AddReviewForm /> : <ReviewsList />}
    </div>
  );
}

export default Review;
