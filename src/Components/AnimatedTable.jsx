import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { approveReview, fetchUnApprovedReviews } from "../api/reviews";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../assets/Business Idea Animation.json";
import { useNavigate } from "react-router";
import { useMainConext } from "../hooks/useMainContext";

export const AnimatedTable = () => {
  const navigate = useNavigate();
  const { admin } = useMainConext();
  const [reviews, setReviews] = useState([]);
  const [loading, setloading] = useState(false);
  const [approving, setApproving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const currentData = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleApproval = async (e, id) => {
    e.stopPropagation();
    setApproving(true);
    await approveReview(id);
    setApproving(false);
    getReviews();
  };

  const getReviews = async () => {
    setloading(true);

    const allReviews = await fetchUnApprovedReviews();
    setReviews(allReviews);
    setloading(false);
  };

  useEffect(() => {
    !admin && navigate("/reviews");
  }, [admin, navigate]);

  useEffect(() => {
    getReviews();
  }, []);

  if (loading) {
    return (
      <Player
        autoplay
        loop
        src={Animation}
        style={{ height: "80vh", width: "80vw" }}
      />
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[95vw] lg:w-[60vw] mx-auto my-8 flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold text-heading py-4 text-center">
          REVIEWS WAITING FOR APPROVAL
        </h2>
      </motion.div>

      <div className=" p-4 flex flex-col items-center ">
        <div className="rounded-lg shadow-lg w-[80vw] max-w-full">
          <motion.table
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05 }}
            className="min-w-full bg-white border border-gray-200 overflow-x-scroll"
          >
            <thead style={{ backgroundColor: "#3e36c7" }}>
              <tr>
                {[
                  "Name",

                  "Payment Type",
                  "Phone Number",
                  "Review Detail",
                  "Images",

                  "Approved",
                  "Approve",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-sm font-semibold text-white border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <motion.tr
                  key={row.id}
                  variants={tableVariants}
                  className=" hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => navigate(`/reviewDetails/${row?.id}`)}
                >
                  <td className="px-4 py-2 border-b truncate max-w-[150px]">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 border-b truncate max-w-[150px]">
                    {row.paymentType}
                  </td>
                  <td className="px-4 py-2 border-b truncate max-w-[150px]">
                    {row.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border-b truncate max-w-[200px]">
                    {row.reviewDetail}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      {row.imageUrls.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {row.isApproved ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="border-b">
                    <button
                      className=" bg-heading text-white hover:text-heading hover:border hover:bg-white hover: border-heading px-4 py-2 rounded-full max-w-[200px]"
                      onClick={(e) => handleApproval(e, row?.id)}
                    >
                      {approving ? "Approving..." : "Approve"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded disabled:opacity-50 text-white"
            style={{ backgroundColor: "#3e36c7" }}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded disabled:opacity-50 text-white"
            style={{ backgroundColor: "#3e36c7" }}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
