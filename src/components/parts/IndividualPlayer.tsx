import {
  Item,
  ItemHeader,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

type PlayerWithRole = {
  id: number;
  name: string;
  isImposter: boolean;
  category: string;
  word: string;
};

type IndividualPlayerProps = {
  player: PlayerWithRole;
  onReveal?: (playerId: number) => void;
};

export function IndividualPlayer({ player, onReveal }: IndividualPlayerProps) {
  return (
    <button
      type="button"
      onClick={() => onReveal?.(player.id)}
      className="w-full text-left transition duration-200 hover:scale-105 active:scale-95"
    >
      <Item variant="outline" className="w-full h-full bg-card hover:bg-accent">
        <ItemHeader>
          <ItemTitle className="text-xl">{player.name}</ItemTitle>
          <ItemDescription className="text-left text-muted-foreground">
            Tap to reveal
          </ItemDescription>
        </ItemHeader>
      </Item>
    </button>
  );
}

export default IndividualPlayer;
