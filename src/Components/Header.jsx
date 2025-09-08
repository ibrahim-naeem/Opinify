import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { LuMenu, LuX } from "react-icons/lu";
import { supabase } from "../database/supabase";
import { useMainConext } from "../hooks/useMainContext";

import { Player } from "@lottiefiles/react-lottie-player";
import Divider from "../assets/divider.json";
import WhiteDivider from "../assets/whiteDivider.json";
import blueDivider from "../assets/divider.json";

function Header() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const { setFilter, session, admin } = useMainConext();
  const [loading, setLoading] = useState(false);

  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "authenticated";

  const signOut = async () => {
    localStorage.removeItem("isAuthenticated");
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
    navigate("/");
    setLoading(false);
  };

  const handleClick = (link) => {
    navigate(link);
    setShowNav(false);
  };

  useEffect(() => {
    setTimeout(() => {
      !isAuthenticated && navigate("/");
    }, 1100);
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="h-20 flex justify-around items-center fixed top-0 left-0 w-[100vw] bg-white z-50 shadow-md">
        <h1
          className={`text-4xl font-extrabold font-comfortaa text-heading`}
          onClick={() => {
            setFilter("");
            navigate("/home");
            setShowNav(false);
          }}
        >
          Scamsnoop
        </h1>

        {showNav ? (
          <LuX
            className="sm:hidden w-7 h-7 text-heading"
            onClick={() => setShowNav(!showNav)}
          />
        ) : (
          <LuMenu
            className="sm:hidden w-7 h-7 text-heading"
            onClick={() => setShowNav(!showNav)}
          />
        )}

        <ul className="hidden sm:flex w-[45vw] xl:w-[35vw] justify-around items-center text-base md:text-lg xl:text-xl text-heading font-semibold transition duration-700 ease-in-out">
          {isAuthenticated && (
            <>
              <li className="relative text-sm hover:text-xl duration-300 ease-in-out not-last:">
                <Link to="/reviews">Add Review</Link>
                <Player
                  autoplay
                  loop
                  src={Divider}
                  className="absolute w-[80px] h-5 "
                />
              </li>
              {admin && (
                <li className="text-sm hover:text-xl duration-300 ease-in-out">
                  <Link to="/recentReviews">Recent reviews</Link>
                </li>
              )}
              <li className="text-sm hover:text-xl duration-300 ease-in-out">
                <Link to="/myReviews">My reviews</Link>
              </li>
              <li className="text-sm hover:text-xl duration-300 ease-in-out">
                Services
              </li>
              <li
                onClick={() => navigate("/about")}
                className="text-sm hover:text-xl duration-300 ease-in-out"
              >
                About us
              </li>
              {session && (
                <button
                  onClick={signOut}
                  className="text-sm transition duration-500 ease-in-out hover:bg-white hover:text-heading hover:border-2 rounded-full  px-4 py-2 bg-heading text-white"
                >
                  {loading ? "Signing out..." : "Sign out"}
                </button>
              )}
            </>
          )}
        </ul>
      </div>
      {/* Dropdown menu */}

      <AnimatePresence initial={false}>
        {showNav && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={` bg-white w-[85vw] h-[100vh] fixed flex flex-col right-0 top-15 z-40 shadow-2xl text-gray-500`}
          >
            <ul className="p-5 my-2">
              <li
                className="my-5 relative p-4 shadow-lg rounded-full bg-heading text-white text-center"
                onClick={() => handleClick("/reviews")}
              >
                ADD REVIEW
                <Player
                  autoplay
                  loop
                  src={WhiteDivider}
                  className="w-26 h-5 absolute left-22 pb-2"
                />
              </li>

              {admin && (
                <li
                  className="my-5 p-4 shadow-lg rounded-full text-center"
                  onClick={() => handleClick("/recentReviews")}
                >
                  RECENT REVIEWS
                </li>
              )}

              <li
                className="my-5 p-4 shadow-lg rounded-full text-center"
                onClick={() => handleClick("/myReviews")}
              >
                MY REVIEWS
              </li>

              <li
                className="my-5 p-4 shadow-lg rounded-full text-center "
                onClick={() => handleClick("/about")}
              >
                ABOUT US
              </li>

              {session && (
                <li
                  onClick={signOut}
                  className="my-5 p-4 shadow-lg rounded-full text-center text-heading font-bold"
                >
                  {loading ? "SIGNING OUT..." : " SIGN OUT"}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
