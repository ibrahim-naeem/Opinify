import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-toastify";

import { supabase } from "../database/supabase";
import EmailVectorImage from "../assets/email-vector.jpg";
import Animation from "../assets/loading-animation.json";
import { useMainConext } from "../hooks/useMainContext";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
function EmailSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState("");
  const { session } = useMainConext();

  const signInWithMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        RedirectTo: "https://opinify.vercel.app", // "http://localhost:5174"
      },
    });
    toast.success("Check your email for the magic link!");
    setLoading(true);
    if (error) {
      setLoading(false);
      console.error("Error sending magic link:", error.message);
      toast.error("Failed to send magic link. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return new Error("Email is required");
    await signInWithMagicLink(email);
  };

  useEffect(() => {
    session && navigate("/home");
  }, [session, navigate, email]);

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
    <div className="mt-[80px] lg:flex justify-between items-center overflow-hidden lg:h-[80vh]">
      <div className="lg:w-[50vw] xl:w-[55vw]">
        <img src={EmailVectorImage} alt="hero email vector image" />
      </div>
      <section className="lg:w-[50vw] xl:w-[45vw] lg:flex flex-col justify-center">
        <div className="flex flex-col mx-auto xl:mx-0 text-center w-[350px] md:w-[450px] xl:w-[500px] overflow-hidden my-7">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-extrabold my-3 text-heading">
            Here we Exposed Scammers
          </h1>
          <p className="text-sm md:text-base text-heading">
            Welcome to SCAMSNOOP , your trusted resource in the fight against
            online fraud. We provide a vital service for individuals and
            businesses to proactively protect themselves from financial scams
          </p>
        </div>
        {/* Email form  */}
        <form
          className="flex flex-col justify-center items-center xl:items-start mx-auto xl:mx-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="border border-heading text-heading rounded-xl w-[350px] md:w-[450px] lg:w-[400px] xl:w-[500px] p-4 outline-none focus:outline-none"
            type="emai"
            name="email"
            placeholder="Enter your email here..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-[350px] md:w-[450px] lg:w-[400px] xl:w-[500px] border rounded-4xl my-5 p-3 bg-heading text-white"
          >
            Submit Your Email
          </button>
        </form>
      </section>
    </div>
  );
}

export default EmailSection;
