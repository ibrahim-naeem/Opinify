import { supabase } from "../database/supabase";

export const fetchReviews = async () => {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
  } else {
    return data;
  }
};
