import { supabase } from "../database/supabase";

const fetchFromReview = async (filters = {}, ascending = false) => {
  const query = supabase
    .from("review")
    .select("*")
    .order("created_at", { ascending });

  Object.entries(filters).forEach(([key, value]) => {
    query.eq(key, value);
  });

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching reviews:", error.message);
    return [];
  }
  return data || [];
};

// Public functions
export const fetchReviews = () => fetchFromReview({ isApproved: true });
export const fetchUnApprovedReviews = () =>
  fetchFromReview({ isApproved: false });
export const fetchReviewsByUser = (userEmail) => fetchFromReview({ userEmail });
export const fetchReviewsByFilter = (filter) =>
  fetchFromReview({ socialLink: filter, isApproved: true });

export const approveReview = async (id) => {
  const { data, error } = await supabase
    .from("review")
    .update({ isApproved: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Review approval error:", error.message);
    return [];
  }
  return data;
};

// import { supabase } from "../database/supabase";

// export const fetchReviews = async () => {
//   const { data, error } = await supabase
//     .from("review")
//     .select("*")
//     .eq("isApproved", "TRUE")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching reviews:", error.message);
//   } else {
//     return data || [];
//   }
// };

// export const fetchUnApprovedReviews = async () => {
//   const { data, error } = await supabase
//     .from("review")
//     .select("*")
//     .eq("isApproved", "FALSE")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching reviews:", error.message);
//   } else {
//     return data || [];
//   }
// };

// export const fetchReviewsByUser = async (currentUser) => {
//   const { data, error } = await supabase
//     .from("review")
//     .select("*")
//     .eq("userEmail", currentUser)
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching reviews:", error.message);
//   } else {
//     return data || [];
//   }
// };

// export const fetchReviewsByFilter = async (filter) => {
//   const { data, error } = await supabase
//     .from("review")
//     .select("*")
//     .eq("socialLink", filter)
//     .eq("isApproved", "TRUE")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching reviews:", error.message);
//   } else {
//     return data || [];
//   }
// };

// export const approveReview = async (id) => {
//   const { error, data } = await supabase
//     .from("review")
//     .update({ isApproved: "TRUE" })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Review approval error:", error.message);
//   } else {
//     return data;
//   }
// };
