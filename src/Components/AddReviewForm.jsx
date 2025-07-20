import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import { MainContext } from "../Context/MainContext.jsx";
import { supabase } from "../database/supabase.js";

function AddReviewForm() {
  const curentUserEmail = localStorage.getItem("user_email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialLink: "",
    paymentType: "",
    phoneNumber: "",
    reviewDetail: "",
    images: [],
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setToggle } = useContext(MainContext);

  const validateForm = () => {
    const { name, email, reviewDetail, images } = formData;
    if (!name || !email || !reviewDetail) {
      toast.error("Name, Email, and Review Detail are required.");
      return false;
    }
    if (!images || images.length === 0) {
      toast.error("Please upload at least one image.");
      return false;
    }
    return true;
  };

  const uploadImagesToSupabase = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("review-images")
        .upload(fileName, file);

      if (error) {
        console.error("Image upload error:", error.message);
        toast.error("Failed to upload one or more images.");
      } else {
        const { data } = supabase.storage
          .from("review-images")
          .getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { name, email, socialLink, paymentType, phoneNumber, reviewDetail } =
      formData;
    setLoading(true);
    try {
      const uploadedUrls = await uploadImagesToSupabase(formData.images);
      const { error } = await supabase.from("review").insert([
        {
          name,
          email,
          socialLink,
          paymentType,
          phoneNumber,
          reviewDetail,
          imageUrls: uploadedUrls,
          userEmail: curentUserEmail,
        },
      ]);

      if (error) {
        console.error("DB insert error:", error);
        toast.error("Failed to submit the review.");
      } else {
        toast.success("Review submitted successfully!");
        setFormData({
          name: "",
          email: "",
          socialLink: "",
          paymentType: "",
          phoneNumber: "",
          reviewDetail: "",
          images: [],
        });
        setImages([]);
        setToggle("recent");
      }
    } catch (err) {
      console.log("Submit Error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Check total limit
    if (images.length + selectedFiles.length > 5) {
      toast.error("You can only upload a maximum of 5 images.");
      return;
    }

    const updatedImages = [...images, ...selectedFiles];
    setImages(updatedImages);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
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
      <p>Please add the details of the business you want to report.</p>

      {[
        { type: "text", name: "name", placeholder: "Name" },
        { type: "email", name: "email", placeholder: "Email" },
        {
          type: "text",
          name: "socialLink",
          placeholder: "Social Link (Instagram, Facebook, etc.)",
        },
        { type: "text", name: "paymentType", placeholder: "Payment Type" },
        { type: "tel", name: "phoneNumber", placeholder: "Phone Number" },
      ].map(({ type, name, placeholder }) => (
        <motion.input
          key={name}
          type={type}
          name={name}
          value={formData[name]}
          placeholder={placeholder}
          className="p-3 rounded-xl w-full max-w-2xl focus:outline-none leading-6 bg-background"
          onChange={handleChange}
        />
      ))}

      <motion.textarea
        name="reviewDetail"
        value={formData.reviewDetail}
        placeholder="Please write your review here"
        className="p-3 rounded-xl w-full max-w-2xl focus:outline-none leading-6 bg-background min-h-[100px]"
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

        <p className="text-sm text-gray-600">
          {5 - images.length} image{5 - images.length !== 1 ? "s" : ""}{" "}
          remaining
        </p>
        <span className="w-50vw text-center text-sm text-gray-600 underline">
          Notice - Please first choose image containing brand logo.
        </span>

        {images.length > 0 && (
          <div className="flex justify-center items-center relative h-10 w-full">
            {images.map((img, index) => {
              const totalWidth = images.length * 20;
              const centerOffset = totalWidth / 2;
              const imgUrl = URL.createObjectURL(img);
              return (
                <motion.img
                  key={index}
                  src={imgUrl}
                  alt="preview"
                  className="w-10 h-10 object-cover rounded-lg shadow-lg"
                  style={{
                    position: "absolute",
                    left: `calc(50% - ${centerOffset}px + ${index * 20}px)`,
                    zIndex: images.length - index,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onLoad={() => URL.revokeObjectURL(imgUrl)} // Clean up
                />
              );
            })}
          </div>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        className={`text-white p-3 rounded-4xl w-[80vw] sm:w-[45vw] lg:w-[35vw] font-semibold ${
          loading ? "bg-gray-400" : "bg-heading"
        }`}
        onClick={handleFormData}
      >
        {loading ? "Submitting..." : "Submit"}
      </motion.button>
    </motion.div>
  );
}

export default AddReviewForm;
