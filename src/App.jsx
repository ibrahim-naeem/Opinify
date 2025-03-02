import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import EmailSection from "./Components/EmailSection";

import Animation from "./assets/Animation - 1740910205152.json";

function App() {
  const [emailLottie, setEmailLottie] = useState(false);
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
    <>
      <EmailSection setEmailLottie={setEmailLottie} />
    </>
  );
}

export default App;
