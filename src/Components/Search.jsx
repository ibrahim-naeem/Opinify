/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useMainConext } from "../hooks/useMainContext";

function Search() {
  const { setFilter } = useMainConext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center  gap-4 my-6"
    >
      <div>
        <input
          className="w-[20vw] border border-heading rounded-full py-3 px-4 focus:outline-none text-heading"
          type="text"
          placeholder="Search here..."
        />
      </div>
      <div className=" flex  flex-col items-center md:flex-row gap-3">
        <p>Search by filters : </p>
        {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((platform) => (
          <button
            className="border bg-heading text-white hover:text-heading hover:bg-white  px-4 py-2 rounded-full"
            key={platform}
            onClick={() => setFilter(platform)}
          >
            {platform}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default Search;
