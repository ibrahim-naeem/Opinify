import { useMemo, useState } from "react";
import { MainContext } from "../Context/MainContext";

// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [toggle, setToggle] = useState("add"); // recent - add

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  // admin
  const [admin, setAdmin] = useState(false);

  const value = useMemo(
    () => ({
      session,
      setSession,
      toggle,
      setToggle,
      filter,
      setFilter,
      searchQuery,
      setSearchQuery,
      admin,
      setAdmin,
    }),
    [session, toggle, searchQuery, filter, admin]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
