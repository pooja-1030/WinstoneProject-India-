import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Winstone Projects | Redefining Luxury Living in Bangalore",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Founder />
      <Services />
      <ProjectsSection />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
