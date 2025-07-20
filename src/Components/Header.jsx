import { useState } from "react";
import { useNavigate } from "react-router";

import { LuMenu, LuX } from "react-icons/lu";

function Header() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <div className="h-20 flex justify-around items-center">
        <h1
          className={`text-4xl font-extrabold font-comfortaa text-heading`}
          onClick={() => navigate("/")}
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

        <ul className="hidden sm:flex w-[45vw] xl:w-[35vw] justify-around text-base md:text-lg xl:text-xl text-heading font-semibold transition duration-700 ease-in-out">
          <li className="hover:text-2xl duration-300 ease-in-out">About us</li>
          <li className="hover:text-2xl duration-300 ease-in-out">Services</li>
          <li className="hover:text-2xl duration-300 ease-in-out">
            How it works
          </li>
        </ul>
      </div>
      {/* Dropdown menu */}
      {showNav && (
        <ul className="z-100 sm:hidden rounded absolute w-100 py-3 flex-col justify-around text-base text-white font-semibold bg-gradient-to-bl from-white to-heading">
          <li className="text-center border-b py-3 ">About us</li>
          <li className="text-center border-b py-3">Services</li>
          <li className="text-center py-3">How it works</li>
        </ul>
      )}
    </>
  );
}

export default Header;
