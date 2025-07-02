import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

function AddReviewForm() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    description: "",
  });

  const handleFormData = async () => {
    try {
      console.log("state-data:", formData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(
      0,
      5 - images.length
    );
    setImages((prev) => [...selectedFiles, ...prev].slice(0, 5));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] mx-auto my-14 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-heading">
        ADD REVIEW
      </h2>
      <motion.input
        type="text" //scammer page name
        name="name"
        placeholder="Name"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.input
        type="email"
        name="email"
        placeholder="Email"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.input
        type="text"
        name="social-link"
        placeholder="Social Link (Instagram, Facebook, etc.)"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />

      <motion.input
        type="text"
        name="payment-type"
        placeholder="Payment Type"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />

      <motion.input
        type="tel"
        name="number"
        placeholder="Phone Number"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.textarea
        // whileFocus={{ scale: 1.05 }}
        type="textarea"
        name="description"
        placeholder="Please write you review here"
        className="p-3 rounded-xl w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] focus:outline-none leading-6 bg-background"
        onChange={handleChange}
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
              // const imgUrl = URL.createObjectURL(img);
              return (
                <motion.img
                  key={index}
                  src={URL.createObjectURL(img)}
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
        className="text-white p-3 rounded-4xl w-[80vw] sm:w-[45vw] lg:w-[35vw] font-semibold bg-heading"
        onClick={() => handleFormData()}
      >
        Submit
      </motion.button>
    </motion.div>
  );
}

export default AddReviewForm;
