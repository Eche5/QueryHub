import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import MainPage from "@/components/Home/MainPage";
import NavBar from "@/components/Home/NavBar";
import Works from "@/components/Home/Works";

export default function Home() {
  return (
    <div>
      <NavBar />
      <MainPage />
      <Features />
      <Works />
      <Footer />
    </div>
  );
}
