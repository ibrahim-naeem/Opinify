import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from "react-toastify";

import { MainContext } from "../Context/MainContext";
import { supabase } from "../database/supabase";

import { COLORS } from "../assets/Colors";
import EmailVectorImage from "../assets/email-vector.jpg";
import Animation from "../assets/Animation - 1740910205152.json";

// eslint-disable-next-line react/prop-types
function EmailSection() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user_id");

  const { emailLottie, setEmailLottie } = useContext(MainContext);
  const [email, setEmail] = useState("");

  const saveEmailtoDB = async (email) => {
    const { data: existingUser, error: userfetchingError } = await supabase
      .from("users")
      .select("userId")
      .eq("email", email)
      .single();

    if (userfetchingError) return new Error(userfetchingError);
    if (existingUser) {
      toast.success("You are already registered with this email");
      localStorage.setItem("user_id", existingUser.userId);
      return existingUser;
    }

    const { data: newUser, error: emailError } = await supabase
      .from("users")
      .insert({ email })
      .select("userId")
      .single();

    if (emailError) return new Error(emailError);
    toast.success("Email registered successfully");
    setEmail("");
    localStorage.setItem("user_id", newUser.userId);
    return newUser;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailLottie(true);

    if (!email) return new Error("Email is required");
    const res = await saveEmailtoDB(email);

    setTimeout(() => {
      setEmailLottie(false);
      navigate("/review");
    }, 2000);
  };

  useEffect(() => {
    !currentUser ? navigate("/") : navigate("/review");

    const timer = setTimeout(() => {
      emailLottie && setEmailLottie(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [emailLottie, currentUser, navigate, setEmailLottie]);

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
