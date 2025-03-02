import { useState } from "react";
import { COLORS } from "../assets/Colors";
import EmailVectorImage from "../assets/email-vector.jpg";
import { useNavigate } from "react-router";
// eslint-disable-next-line react/prop-types
const EmailForm = ({ setEmailLottie }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailLottie(true);
    localStorage.setItem("user-email", email);
    setTimeout(() => {
      navigate("/review");
    }, 2000);
  };
  return (
    <>
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
    </>
  );
};

// eslint-disable-next-line react/prop-types
function EmailSection({ setEmailLottie }) {
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
        <EmailForm setEmailLottie={setEmailLottie} />
      </div>
      <div className="w-[60vw]">
        <img src={EmailVectorImage} alt="hero email vector image" />
      </div>
    </div>
  );
}

export default EmailSection;
