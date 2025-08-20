/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useMainConext } from "../hooks/useMainContext";

function Search() {
  const { setFilter, setSearchQuery } = useMainConext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center  gap-4 my-6"
    >
      <div>
        <input
          className="w-[70vw] md:w-[40vw] lg:w-[35vw] xl:w-[32vw] border border-heading rounded-full py-3 px-4 focus:outline-none text-heading"
          type="text"
          placeholder="Search here..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className=" flex flex-col items-center md:flex-row gap-3">
        <p>Search by filters : </p>
        {["Instagram", "Facebook", "Tiktok", "Whatsapp"].map((platform) => (
          <button
            className="border bg-heading text-white hover:text-heading hover:bg-white  px-4 py-2 rounded-full"
            key={platform}
            onClick={() => {
              setFilter(platform);
            }}
          >
            {platform}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default Search;
