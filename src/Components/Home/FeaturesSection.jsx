import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useMainConext } from "../../hooks/useMainContext";
import InstaCard from "../../assets/insta-card1.png";
import Tiktok from "../../assets/tiktok-card.png";
import Facebook from "../../assets/facebook-card.png";

const data = [
  {
    id: 1,
    title: "Instagram Scams",
    description:
      "Here you can see common Instagram scams. Stay alert before clicking any link.",
    image: InstaCard,
    filter: "Instagram",
  },
  {
    id: 2,
    title: "Facebook Scams",
    description:
      "Here you can spot Facebook scam patterns. Think twice before you share or pay. ",
    image: Facebook,
    filter: "Facebook",
  },
  {
    id: 3,
    title: "Tiktok Scams",
    description:
      "Here are TikTok scam tricks to watch out for. Don’t trust every viral offer.",
    image: Tiktok,
    filter: "Tiktok",
  },
];

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { setFilter } = useMainConext();
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-[100vw] overflow-hidden  bg-white py-16">
      <div className="max-w-7xl  mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-heading "
        >
          Latest Scams
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-heading  mb-12"
        >
          Discover our handpicked selection of products that combine style,
          quality, and functionality. Each piece is designed to bring value to
          your everyday life with premium materials and thoughtful details.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {data.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: item * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item}`}
                  className="w-full h-64 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-semibold mb-3 text-heading ">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow text-heading ">
                  {item.description}
                </p>
                <button
                  onClick={() => {
                    navigate("/review");
                    setFilter(item.filter);
                  }}
                  className="mt-auto bg-heading  hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
