import { motion } from "framer-motion";
const Data = () => {
  return (
    <div className=" w-[80%] mb-4 flex gap-10 rounded-2xl shadow-2xl overflow-clip">
      <img
        src={
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
        }
        alt="image"
        width="250"
      />
      <div className=" w-[50%] py-6 flex flex-col justify-around ">
        <div className="gap-7">
          <p className=" text-xl text-heading font-bold">Developer</p>
          <p className="text-xs pl-1">developer@test.com</p>
        </div>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quam at
          veritatis dolorum eum eveniet modi, unde amet suscipit ipsam
          voluptatum aut, corrupti laudantium officia!
        </p>
        <button className="mx-auto w-80 p-4 border rounded-4xl border-heading text-heading">
          Read Me..
        </button>
      </div>
    </div>
  );
};

function ReviewsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-[60vw] mx-auto my-10 bg-white flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl py-6 font-bold text-center text-heading">
        Reviews
      </h2>
      <Data />
      <Data />
      <Data />
      <Data />
    </motion.div>
  );
}

export default ReviewsList;
