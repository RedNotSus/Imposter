import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import IndividualPlayer from "./IndividualPlayer";
import RevealCard from "./RevealCard";
import RevealImposter from "./RevealImposter";

type PlayerWithRole = {
  id: number;
  name: string;
  isImposter: boolean;
  word: string;
  category: string;
};

type PlayerScreenProps = {
  players: PlayerWithRole[];
  onRestart: () => void;
};

export function PlayerScreen({ players, onRestart }: PlayerScreenProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [showRevealImposter, setShowRevealImposter] = useState(false);
  const [revealedPlayerIds, setRevealedPlayerIds] = useState<Set<number>>(
    new Set()
  );

  const category = useMemo(() => players[0]?.category ?? "", [players]);
  const selectedPlayer = useMemo(
    () => players.find((p) => p.id === selectedPlayerId) ?? null,
    [players, selectedPlayerId]
  );

  const handleBackToPlayers = () => {
    if (selectedPlayerId !== null) {
      setRevealedPlayerIds((prev) => new Set(prev).add(selectedPlayerId));
    }
    setSelectedPlayerId(null);
  };

  if (showRevealImposter) {
    return (
      <RevealImposter
        players={players}
        onBack={() => setShowRevealImposter(false)}
      />
    );
  }

  if (selectedPlayer) {
    const word = selectedPlayer.isImposter ? "Imposter" : selectedPlayer.word;

    return (
      <div className="relative min-h-svh flex flex-col items-center justify-center gap-4">
        <Button
          variant="outline"
          className="absolute left-4 top-4"
          onClick={handleBackToPlayers}
        >
          ← Back to players
        </Button>
        <RevealCard word={word} subtitle={`Category: ${category}`} />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center gap-6 p-6">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="text-xl font-semibold">{category}</p>
        </div>
        <Button variant="outline" onClick={onRestart}>
          ← Edit settings
        </Button>
      </div>
      <p className="text-muted-foreground">Tap your name to see your card.</p>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
        {players.map((player) => (
          <IndividualPlayer
            key={player.id}
            player={player}
            onReveal={(id) => setSelectedPlayerId(id)}
            disabled={revealedPlayerIds.has(player.id)}
          />
        ))}
      </div>
      <Button
        variant="outline"
        className="w-auto px-8 p-6 hover:scale-105 active:scale-95 transition duration-200 absolute bottom-5 items-center left-1/2 -translate-x-1/2"
        onClick={() => setShowRevealImposter(true)}
      >
        Reveal Imposter
      </Button>
    </div>
  );
}

export default PlayerScreen;
