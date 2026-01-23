import Hero from "@/components/Hero";
import Header from '@/components/Header/index'
import ProjectGallery from "@/components/ProjectGallery";
import LiveParallaxBackground from "@/components/ImageLive";
import About from "@/components/Sections/About";
import BreathingSpaces from "@/components/Sections/BreathingSpaces";
import Vision from "@/components/Sections/Vision";
import Purpose from "@/components/Sections/Purpose";
// import VideoSection from "@/components/Sections/VideoSection";
import ScrollVideoCanvas from "@/components/UI/ScrollVideoCanvas";
import Footer from "@/components/Footer/Footer";
import Beyond from "@/components/Sections/Beyond";
import Integrity from "@/components/Sections/Integrity";
import OurValues from "@/components/Sections/OurValues";
import OurExpertise from "@/components/Sections/OurExpertise";


export default function Home() {
  return (
    <>
     <Header/>
     <Hero/>
     <About/>
     <LiveParallaxBackground/>
     {/* <BreathingSpaces/> */}
     {/* <VideoSection/> */}
     <ScrollVideoCanvas/>
     <Vision/>
     {/* <Purpose/> */}
     {/* <ProjectGallery/> */}
     <OurExpertise/>
     <OurValues/>
     <Integrity/>
     <Beyond/>
     <Footer/>

    </>
  );
}
