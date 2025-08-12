import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { LuMenu, LuX } from "react-icons/lu";
import { supabase } from "../database/supabase";
import { useMainConext } from "../hooks/useMainContext";

function Header() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const { session } = useMainConext();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
    navigate("/");
    setLoading(false);
  };

  return (
    <>
      <div className="h-20 flex justify-around items-center">
        <h1
          className={`text-4xl font-extrabold font-comfortaa text-heading`}
          onClick={() => navigate("/review")}
        >
          Opinify
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
          <li className="text-sm hover:text-xl duration-300 ease-in-out">
            How it works
          </li>
          <li className="text-sm hover:text-xl duration-300 ease-in-out">
            <Link to="/myReviews">My reviews</Link>
          </li>
          <li className="text-sm hover:text-xl duration-300 ease-in-out">
            Services
          </li>
          <li className="text-sm hover:text-xl duration-300 ease-in-out">
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
        </ul>
      </div>
      {/* Dropdown menu */}
      <div className="relative flex justify-around">
        {showNav && (
          <ul className="z-100 sm:hidden rounded absolute w-100 py-2 flex-col justify-around text-base text-white font-semibold bg-gradient-to-bl from-white to-heading">
            <li className="text-center border-b py-3">How it works</li>
            <li className="text-center border-b py-3">
              {" "}
              <Link to="/myReviews">My reviews</Link>
            </li>
            <li className="text-center border-b py-3">Services</li>
            <li className="text-center border-b b py-3 ">About us</li>
            {session && <li className="text-center  py-3 ">Sign out</li>}
          </ul>
        )}
      </div>
    </>
  );
}

export default Header;
