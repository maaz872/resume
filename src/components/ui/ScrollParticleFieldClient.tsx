"use client";

import dynamic from "next/dynamic";

const ScrollParticleField = dynamic(
  () => import("@/components/ui/ScrollParticleField"),
  { ssr: false }
);

export function ScrollParticleFieldClient() {
  return <ScrollParticleField />;
}
