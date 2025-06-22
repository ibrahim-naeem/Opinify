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
        style={{ height: "80vh", width: "80vw" }}
      />
    );
  }

  return (
    <div className="lg:flex justify-between items-center overflow-hidden lg:h-[80vh]">
      <div className="lg:w-[50vw] xl:w-[55vw]">
        <img src={EmailVectorImage} alt="hero email vector image" />
      </div>
      <section className="lg:w-[50vw] xl:w-[45vw] lg:flex flex-col justify-center">
        <div className="flex flex-col mx-auto xl:mx-0 text-center w-[350px] md:w-[450px] xl:w-[500px] overflow-hidden my-7">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-extrabold my-3 text-heading">
            Here we Exposed Scammers
          </h1>
          <p className="text-sm md:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            non labore tenetur earum quisquam obcaecati.
          </p>
        </div>
        {/* Email form  */}
        <form
          className="flex flex-col justify-center items-center xl:items-start mx-auto xl:mx-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="border rounded-xl border-gray-700 w-[350px] md:w-[450px] lg:w-[400px] xl:w-[500px] p-4"
            type="emai"
            name="email"
            placeholder="Enter you email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            style={{ backgroundColor: COLORS.text, color: "white" }}
            className="w-[350px] md:w-[450px] lg:w-[400px] xl:w-[500px] border rounded-4xl my-5 p-3"
          >
            Submit Your Email
          </button>
        </form>
      </section>
    </div>
  );
}

export default EmailSection;
