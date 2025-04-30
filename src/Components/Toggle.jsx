import { useContext } from "react";
import { COLORS } from "../assets/Colors";

import { motion } from "framer-motion";
import { MainContext } from "../Context/MainContext";

function Toggle() {
  const { toggle, setToggle } = useContext(MainContext);
  return (
    <button
      type="button"
      style={{ backgroundColor: COLORS.text }}
      className="rounded-4xl w-[24vw] relative py-4"
    >
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: toggle === "recent" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-4xl"
      />
      <span
        onClick={() => setToggle("recent")}
        className={`relative z-10 w-1/2 text-center inline-block ${
          toggle === "recent" ? "text-slate-800" : "text-slate-100"
        }`}
      >
        Recent reviews
      </span>
      <span
        onClick={() => setToggle("add")}
        className={`relative z-10 w-1/2 text-center inline-block ${
          toggle === "add" ? "text-slate-800" : "text-slate-100"
        }`}
      >
        Add review
      </span>
    </button>
  );
}

export default Toggle;
