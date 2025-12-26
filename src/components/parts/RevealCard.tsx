import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type ISourceOptions } from "@tsparticles/engine";
import particlesOptions from "./particles.json";

function RevealCard({ word }: { word: string }) {
  const [init, setInit] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className="w-full max-w-sm perspective-1000"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className="relative w-full transition-transform duration-800 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <Card
            className="w-full border-accent relative overflow-hidden p-33"
            style={{ backfaceVisibility: "hidden" }}
          >
            {init && !isFlipped && (
              <Particles
                id="card-particles"
                options={particlesOptions as ISourceOptions}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <CardContent className="relative z-10 flex items-center justify-center"></CardContent>
          </Card>
          <Card
            className="w-full border-accent overflow-hidden p-25 absolute top-0 left-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardContent className="relative z-10 flex items-center justify-center">
              <p className="text-2xl font-bold text-center">{word}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RevealCard;
