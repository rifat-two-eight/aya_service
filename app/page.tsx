import Categories from "@/components/landing/Categories";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      {/* <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer /> */}
    </div>
  );
}