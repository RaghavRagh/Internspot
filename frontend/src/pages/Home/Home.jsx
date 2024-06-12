import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Internships from "../../components/Internships/Internships";
import Navbar from "../../components/Navbar/Navbar";
import Subscription from "../Subscription/Subscription";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Internships />
      <Subscription />
      <Footer />
    </div>
  );
};

export default Home;
