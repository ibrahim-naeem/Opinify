import { motion } from "framer-motion";
import { useNavigate } from "react-router";
const Data = ({ navigate }) => {
  return (
    <div className="w-[85vw] sm:w-[70vw] xl:w-[60vw] mb-8 lg:flex gap-10 md:gap-3 rounded-2xl shadow-2xl overflow-hidden">
      <img
        src={
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
        }
        alt="image"
        className="w-[85vw] sm:w-[70vw] md:w-[30vw] xl:w-[25vw] h-[30vh] sm:h-[35vh] lg:h-[51vh] xl:h-[40vh]"
      />
      <div className=" w-[80vw] sm:w-[60vw] md:w-[35vw] xl:w-[30vw] py-6 lg:flex lg:flex-col lg:justify-around text-center mx-auto">
        <div className="gap-7">
          <p className=" text-xl text-heading font-bold">Developer</p>
          <p className="text-xs pt-2">developer@test.com</p>
        </div>
        <p className="text-sm sm:text-base pt-2 pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quam at
          veritatis dolorum eum eveniet modi, unde amet suscipit ipsam
          voluptatum aut, corrupti laudantium officia!
        </p>
        <button
          className="mx-auto w-[70vw] sm:w-[60vw] md:w-[35vw] xl:w-[30vw] p-4 border rounded-4xl border-heading text-heading"
          onClick={() => navigate(`/reviewDetails/${1234}`)}
        >
          Read Me..
        </button>
      </div>
    </div>
  );
};

function ReviewsList() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95vw] lg:w-[60vw] mx-auto my-8 bg-white flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl py-4 font-bold text-center text-heading">
        RECENT REVIEWS
      </h2>
      <Data navigate={navigate} />
      <Data />
      <Data />
      <Data />
    </motion.div>
  );
}

export default ReviewsList;
