import { useState, useEffect, useContext } from "react";
import { COLORS } from "../assets/Colors";
import EmailVectorImage from "../assets/email-vector.jpg";
import { useNavigate } from "react-router";
import Animation from "../assets/Animation - 1740910205152.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { MainContext } from "../Context/MainContext";

// eslint-disable-next-line react/prop-types
function EmailSection() {
  const navigate = useNavigate();

  const { emailLottie, setEmailLottie } = useContext(MainContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailLottie(true);
    localStorage.setItem("user-email", email);
    setTimeout(() => {
      setEmailLottie(false);
      navigate("/review");
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      emailLottie && setEmailLottie(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [emailLottie]);

  if (emailLottie) {
    return (
      <Player
        autoplay
        loop
        src={Animation}
        style={{ height: "100vh", width: "100vw" }}
      />
    );
  }

  return (
    <div className="flex justify-between pl-[85px]">
      <div className="w-[40vw] flex flex-col justify-center items-center">
        <div className="w-[500px] overflow-hidden my-3">
          <h1
            style={{ color: COLORS.text }}
            className="text-3xl font-extrabold my-3"
          >
            Title Here ...
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            non labore tenetur earum quisquam obcaecati.
          </p>
        </div>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="border rounded-xl border-gray-700 w-[500px] p-4"
            type="emai"
            name="email"
            placeholder="Enter you email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            style={{ backgroundColor: COLORS.text, color: "white" }}
            className="w-[500px] border rounded-4xl my-3 p-3"
          >
            Submit Your Email
          </button>
        </form>
      </div>
      <div className="w-[60vw]">
        <img src={EmailVectorImage} alt="hero email vector image" />
      </div>
    </div>
  );
}

export default EmailSection;
