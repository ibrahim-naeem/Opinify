import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

// import { db, storage } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      // const imageURls = [];
      // for (const img of images) {
      //   const imageRef = await ref(
      //     storage,
      //     `reviewImages/${Date.now()}-${img.name}`
      //   );
      //   await uploadBytes(imageRef, img);
      //   const downloadUrl = await getDownloadURL(imageRef);
      //   imageURls.push(downloadUrl);
      // }
      // const dataWithImages = { ...formData, images: imageURls };
      // const docRef = await addDoc(collection(db, "reviews"), dataWithImages);
      // console.log("Document ID:", docRef.id);
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
      className="w-[50vw] mx-auto my-24 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-bold text-center text-heading">
        Add you review
      </h2>
      <motion.input
        type="text"
        name="name"
        placeholder="Name"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.input
        type="email"
        name="email"
        placeholder="Email"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.input
        type="tel"
        name="number"
        placeholder="Phone Number"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
        onChange={handleChange}
      />
      <motion.input
        // whileFocus={{ scale: 1.05 }}
        type="text"
        name="description"
        placeholder="Please write you review here"
        className="p-3 rounded-xl w-2/3 focus:outline-none leading-6 bg-background"
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
        onClick={() => handleFormData()}
      >
        Submit
      </motion.button>
    </motion.div>
  );
}

export default AddReviewForm;
