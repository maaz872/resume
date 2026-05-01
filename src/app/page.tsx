import { Hero } from "@/components/sections/Hero";
import { ConstellationMetrics } from "@/components/sections/ConstellationMetrics";
import { CareerSpace } from "@/components/sections/CareerSpace";
import { OrbitalSkills } from "@/components/sections/OrbitalSkills";
import { PlainCV } from "@/components/sections/PlainCV";
import { GroundingCTA } from "@/components/sections/GroundingCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <ConstellationMetrics />
      <CareerSpace />
      <OrbitalSkills />
      <PlainCV />
      <GroundingCTA />
      <Footer />
    </main>
  );
}
