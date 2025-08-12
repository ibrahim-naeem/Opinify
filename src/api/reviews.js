import { supabase } from "../database/supabase";

export const fetchReviews = async () => {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
  } else {
    return data || [];
  }
};

export const fetchReviewsByUser = async (currentUser) => {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .eq("userEmail", currentUser)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
  } else {
    return data || [];
  }
};

export const fetchReviewsByFilter = async (filter) => {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .eq("socialLink", filter)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
  } else {
    return data || [];
  }
};
