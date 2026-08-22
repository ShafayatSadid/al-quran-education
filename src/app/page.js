import { CoursesSection } from "@/components/sections/CoursesSection";
import { Hero } from "@/components/sections/Hero";
import { WhyUsSection } from "@/components/sections/WhyUsSection";


export default function Home() {
  return (
    <section className="my-20">
      <Hero />

      <section>
        <WhyUsSection />
      </section>

      <section>
        <CoursesSection/>
      </section>
    </section>
  );
}
