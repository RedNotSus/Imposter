import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

type Player = { id: number; name: string };

type PlayersProps = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
};

export function Players({ players, setPlayers }: PlayersProps) {
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setLocalPlayers(players);
    setOpen(isOpen);
  };

  const addPlayer = () => {
    const newId = Math.max(0, ...localPlayers.map((p) => p.id)) + 1;
    setLocalPlayers([...localPlayers, { id: newId, name: `Player ${newId}` }]);
  };

  const removePlayer = (id: number) => {
    if (localPlayers.length > 2) {
      setLocalPlayers(localPlayers.filter((p) => p.id !== id));
    }
  };

  const updatePlayerName = (id: number, name: string) => {
    setLocalPlayers(
      localPlayers.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const handleSave = () => {
    setPlayers(localPlayers);
    setOpen(false);
    localStorage.setItem("players", JSON.stringify(localPlayers));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 border-accent bg-card">
        <DialogHeader>
          <DialogTitle>Edit Players</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 max-h-75 overflow-y-auto">
          {localPlayers.map((player, index) => (
            <div key={player.id} className="flex gap-2 items-end">
              <div className="grid gap-2 flex-1">
                <Label htmlFor={`name-${player.id}`}>Player {index + 1}</Label>
                <Input
                  id={`name-${player.id}`}
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removePlayer(player.id)}
                disabled={localPlayers.length <= 2}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addPlayer}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Player
        </Button>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Players;
