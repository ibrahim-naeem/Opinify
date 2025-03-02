import { COLORS } from "../assets/Colors";
import { useNavigate } from "react-router";
function Header() {
  const navigate = useNavigate();
  return (
    <div className=" w-100vw flex justify-between px-40 py-10">
      <div>
        <h1
          style={{ color: COLORS.text }}
          className={`text-4xl font-extrabold font-comfortaa px-4`}
          onClick={() => navigate("/")}
        >
          Opinify
        </h1>
      </div>
      <div>
        <ul
          style={{ color: COLORS.text }}
          className="flex w-[30vw] justify-around text-xl font-semibold transition duration-700 ease-in-out"
        >
          <li className="hover:text-2xl duration-300 ease-in-out">About us</li>
          <li className="hover:text-2xl duration-300 ease-in-out">Services</li>
          <li className="hover:text-2xl duration-300 ease-in-out">
            How it works
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
