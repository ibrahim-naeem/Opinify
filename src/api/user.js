import { supabase } from "../database/supabase.js";

export const getUser = async (id) => {
  let { data: user, error } = await supabase
    .from("users")
    .select("")
    .eq("userId", id);

  if (error) {
    console.error("get user by id error:", error);
    return [];
  }
  return user;
};
