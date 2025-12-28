import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type ISourceOptions } from "@tsparticles/engine";
import particlesOptions from "./particles.json";
import { useHaptic } from "@/hooks/useHaptic";
import { Fingerprint } from "lucide-react";

type RevealCardProps = {
  word: string;
  subtitle?: string;
};

function RevealCard({ word, subtitle }: RevealCardProps) {
  const [init, setInit] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { trigger: triggerHaptic } = useHaptic();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      triggerHaptic('medium');
    }
  };

  const isImposter = word === "Imposter";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className="w-full max-w-sm perspective-1000 cursor-pointer"
        style={{ perspective: "1000px" }}
        role="button"
        tabIndex={0}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? "Card revealed" : "Reveal card"}
      >
        <div
          className="relative w-full transition-transform duration-650 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card (face down) */}
          <Card
            className="w-full border-accent relative overflow-hidden p-35 hover:scale-105 active:scale-95 transition duration-200"
            style={{ backfaceVisibility: "hidden" }}
          >
            {init && !isFlipped && (
              <Particles
                id="card-particles"
                options={particlesOptions as unknown as ISourceOptions}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <CardContent className="relative z-10 flex flex-col items-center justify-center">
              {/* Tap to reveal instruction */}
              {!isFlipped && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
                  <Fingerprint className="h-8 w-8 text-primary/60" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Tap to reveal
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back of card (revealed) */}
          <Card
            className={`w-full border-accent overflow-hidden p-25 absolute top-0 left-0 ${
              isImposter ? "border-destructive bg-destructive/5" : ""
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardContent className="relative z-10 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className={`text-2xl font-bold ${isImposter ? "text-destructive" : ""}`}>
                  {word}
                </p>
                {subtitle ? (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
                {isImposter && (
                  <p className="text-xs text-destructive/80 mt-4 animate-in fade-in-0 duration-500 delay-300">
                    You are the imposter! Blend in with the others.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RevealCard;
