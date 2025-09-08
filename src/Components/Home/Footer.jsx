import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-[100vw] overflow-hidden bg-heading text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Logo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className=" flex flex-col text-center " //items-center sm:items-start
        >
          <h1 className="text-xl font-bold mb-4">Scamsnoop</h1>
          <p className=" text-white  ">
            Our platform is based on community submissions, every report will be
            carefully verified by our team before being published. We encourage
            users to upload only authentic reviews, provide genuine evidence,
            and fully cooperate so that together we can build a reliable and
            trustworthy database.
          </p>
        </motion.div>

        {/* Nav Links 1 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center "
        >
          <h2 className="text-xl font-semibold mb-4">Join the Fight</h2>
          The battle against scammers cannot be won alone. It requires all of
          us.<span className="font-bold "> Search our database </span>
          before you send money or share details.
          <span className="font-bold "> Report a scammer </span>
          to protect your community.
          <span className="font-bold "> Share your knowledge </span> and help
          others stay safe.
          <p>
            Together, we can drag these criminals into the light and take away
            their power.
          </p>
          <p className=" font-extrabold py-5">" The scamsnoop Team "</p>
        </motion.div>

        {/* Subscribe */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center  "
        >
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-sm text-white mb-3">
            Get the latest news and special offers straight to your inbox.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md w-full text-black bg-white"
            />
            <button className="bg-white text-heading border px-4 py-2 rounded-r-md transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
