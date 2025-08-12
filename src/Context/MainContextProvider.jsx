import { useState } from "react";
import { MainContext } from "../Context/MainContext";

// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [toggle, setToggle] = useState("recent"); // recent - add

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <MainContext.Provider
      value={{
        session,
        setSession,
        toggle,
        setToggle,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
