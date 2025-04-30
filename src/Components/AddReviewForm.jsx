import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

function AddReviewForm() {
  const [images, setImages] = useState([]);
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).slice(0, 5 - images.length);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...imageUrls, ...prevImages].slice(0, 5)); // Prepend new images
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[50vw] mx-auto my-24 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-heading">
        Add you review
      </h2>
      <motion.input
        type="text"
        placeholder="Name"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
      />
      <motion.input
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
      />
      <motion.input
        type="tel"
        placeholder="Phone Number"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
      />
      <motion.input
        // whileFocus={{ scale: 1.05 }}
        type="text"
        placeholder="Please write you review here"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
      />
      <div className="flex flex-col items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2 text-white px-4 py-2 rounded-xl text-primaryA bg-secondaryButton">
          <Camera size={20} /> Add Pics (Max 5)
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        {images.length !== 0 ? (
          <div className="flex justify-center items-center relative h-10 w-full">
            {images.map((img, index) => {
              const totalWidth = images.length * 20; // Total width occupied by images
              const centerOffset = totalWidth / 2; // Offset to center them

              return (
                <motion.img
                  key={index}
                  src={img}
                  alt="Uploaded preview"
                  className="w-10 h-10 object-cover rounded-lg shadow-lg"
                  style={{
                    position: "absolute",
                    left: `calc(50% - ${centerOffset}px + ${index * 20}px)`,
                    zIndex: images.length - index,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="text-white p-3 rounded-4xl w-2/3 font-semibold bg-heading"
      >
        Submit
      </motion.button>
    </motion.div>
  );
}

export default AddReviewForm;
