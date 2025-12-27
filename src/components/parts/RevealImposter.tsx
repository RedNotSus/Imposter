import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { UserX } from "lucide-react";

type PlayerWithRole = {
  id: number;
  name: string;
  isImposter: boolean;
  word: string;
  category: string;
};

type RevealImposterProps = {
  players: PlayerWithRole[];
  onBack: () => void;
};

export function RevealImposter({ players, onBack }: RevealImposterProps) {
  const [showContent, setShowContent] = useState(false);

  const imposters = useMemo(
    () => players.filter((p) => p.isImposter),
    [players]
  );

  const secretWord = useMemo(() => players[0]?.word ?? "", [players]);
  const category = useMemo(() => players[0]?.category ?? "", [players]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 relative overflow-hidden">
      <Button
        variant="outline"
        className="absolute left-4 top-4 z-20 hover:scale-105 active:scale-95 transition duration-200"
        onClick={onBack}
      >
        ← Back to players
      </Button>

      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full border-accent overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center py-10 gap-8">
            <div
              className={`text-center space-y-1 transform transition-all duration-500 delay-100 ${
                showContent
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                The Imposter{imposters.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              {imposters.map((imposter, index) => (
                <div
                  key={imposter.id}
                  className={`transform transition-all duration-500 ease-out ${
                    showContent
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-6 py-4">
                    <UserX className="w-8 h-8 text-destructive" />
                    <span className="text-2xl font-bold text-destructive">
                      {imposter.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`w-full max-w-xs transform transition-all duration-500 delay-500 ${
                showContent ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            >
              <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
            </div>

            <div
              className={`text-center space-y-3 transform transition-all duration-500 delay-600 ${
                showContent
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                The Secret Word
              </p>
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-8 py-4">
                <p className="text-3xl font-bold text-primary">{secretWord}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Category: {category}
              </p>
            </div>

            <div
              className={`transform transition-all duration-500 delay-700 ${
                showContent
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                variant="outline"
                className="w-auto px-8 p-6 hover:scale-105 active:scale-95 transition duration-200 -mb-10"
                onClick={() => location.reload()}
              >
                Start New Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RevealImposter;
