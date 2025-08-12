import { MainContext } from "../Context/MainContext";
import { useContext } from "react";

export const useMainConext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainConext must be used within a MainContextProvider");
  }
  return context;
};
