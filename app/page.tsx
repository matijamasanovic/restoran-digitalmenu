import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { OurStory } from "@/components/our-story";
import { MenuOfTheDay } from "@/components/menu-of-the-day";
import { FeaturedDishes } from "@/components/featured-dishes";
import { Testimonials } from "@/components/testimonials";
import { ChefSection } from "@/components/chef-section";
import { ReservationForm } from "@/components/reservation-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurStory />
      <MenuOfTheDay />
      <FeaturedDishes />
      <Testimonials />
      <ChefSection />
      <ReservationForm />
      <Footer />
    </main>
  );
}
