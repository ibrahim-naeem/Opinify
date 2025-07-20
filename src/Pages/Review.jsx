import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import Toggle from "../Components/Toggle";
import { MainContext } from "../Context/MainContext";
import AddReviewForm from "../Components/AddReviewForm";
import ReviewsList from "../Components/ReviewsList";

function Review() {
  const navigate = useNavigate();
  const { toggle } = useContext(MainContext);

  const currentUser = localStorage.getItem("user_id");
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex flex-col items-center py-10">
      <Toggle />
      {toggle === "add" ? <AddReviewForm /> : <ReviewsList />}
    </div>
  );
}

export default Review;
