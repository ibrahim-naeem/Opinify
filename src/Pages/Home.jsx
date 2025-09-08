import Slider from "../Components/Home/Slider";
import ParallaxGlassSection from "../Components/Home/ParallaxSection";
import FeaturedSection from "../Components/Home/FeaturesSection";
import Footer from "../Components/Home/Footer";

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Slider />
      <ParallaxGlassSection />
      <FeaturedSection />
      <Footer />
    </div>
  );
}

export default Home;
