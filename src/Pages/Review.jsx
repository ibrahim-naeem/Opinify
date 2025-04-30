import { useContext } from "react";

import Toggle from "../Components/Toggle";
import { MainContext } from "../Context/MainContext";
import AddReviewForm from "../Components/AddReviewForm";

function Review() {
  const { toggle } = useContext(MainContext);

  return (
    <div className="flex flex-col items-center py-10">
      <Toggle />
      {toggle === "add" ? <AddReviewForm /> : <h1>Recent Reviews</h1>}
    </div>
  );
}

export default Review;
