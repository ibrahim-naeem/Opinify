import { useMainConext } from "../hooks/useMainContext";
import Toggle from "../Components/Toggle";
import AddReviewForm from "../Components/AddReviewForm";
import ReviewsList from "../Components/ReviewsList";

function Review() {
  const { toggle } = useMainConext();

  return (
    <div className="flex flex-col items-center py-10">
      <Toggle />
      {toggle === "add" ? <AddReviewForm /> : <ReviewsList />}
    </div>
  );
}

export default Review;
