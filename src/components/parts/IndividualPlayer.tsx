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

import { Check } from "lucide-react";

type IndividualPlayerProps = {
  player: PlayerWithRole;
  onReveal?: (playerId: number) => void;
  disabled?: boolean;
};

export function IndividualPlayer({
  player,
  onReveal,
  disabled = false,
}: IndividualPlayerProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onReveal?.(player.id)}
      disabled={disabled}
      className={`w-full text-left transition duration-200 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:scale-105 active:scale-95"
      }`}
    >
      <Item
        variant="outline"
        className={`w-full h-full ${
          disabled ? "bg-muted/50" : "bg-card hover:bg-accent"
        }`}
      >
        <ItemHeader>
          <div className="flex items-center justify-between w-full">
            <ItemTitle
              className={`text-xl ${disabled ? "text-muted-foreground" : ""}`}
            >
              {player.name}
            </ItemTitle>
            {disabled && <Check className="w-5 h-5 text-green-500" />}
          </div>
          <ItemDescription className="text-muted-foreground pr-5">
            {disabled ? "Seen" : ""}
          </ItemDescription>
        </ItemHeader>
      </Item>
    </button>
  );
}

export default IndividualPlayer;
