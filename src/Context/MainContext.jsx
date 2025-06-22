import { useState, createContext } from "react";

export const MainContext = createContext();

// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  const [emailLottie, setEmailLottie] = useState(false);
  const [toggle, setToggle] = useState("recent"); // recent - add

  return (
    <MainContext.Provider
      value={{ emailLottie, setEmailLottie, toggle, setToggle }}
    >
      {children}
    </MainContext.Provider>
  );
};
