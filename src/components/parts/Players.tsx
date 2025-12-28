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
import { Plus, Trash2, GripVertical, AlertCircle } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useHaptic } from "@/hooks/useHaptic";

type Player = { id: number; name: string };

type PlayersProps = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
};

type SortablePlayerItemProps = {
  player: Player;
  index: number;
  onNameChange: (id: number, name: string) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  error?: string;
};

function SortablePlayerItem({
  player,
  index,
  onNameChange,
  onRemove,
  canRemove,
  error,
}: SortablePlayerItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex gap-2 items-end ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        className="p-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="grid gap-1 flex-1">
        <Label htmlFor={`name-${player.id}`} className="text-xs">
          Player {index + 1}
        </Label>
        <Input
          id={`name-${player.id}`}
          value={player.name}
          onChange={(e) => onNameChange(player.id, e.target.value)}
          className={error ? "border-destructive" : ""}
          placeholder="Enter player name"
        />
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onRemove(player.id)}
        disabled={!canRemove}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function Players({ players, setPlayers }: PlayersProps) {
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const { trigger: triggerHaptic } = useHaptic();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLocalPlayers(players);
      setErrors({});
    }
    setOpen(isOpen);
  };

  const addPlayer = () => {
    const newId = Math.max(0, ...localPlayers.map((p) => p.id)) + 1;
    setLocalPlayers([...localPlayers, { id: newId, name: `Player ${newId}` }]);
    triggerHaptic('light');
  };

  const removePlayer = (id: number) => {
    if (localPlayers.length > 2) {
      setLocalPlayers(localPlayers.filter((p) => p.id !== id));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
      triggerHaptic('light');
    }
  };

  const updatePlayerName = (id: number, name: string) => {
    setLocalPlayers(
      localPlayers.map((p) => (p.id === id ? { ...p, name } : p))
    );
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validatePlayers = (): boolean => {
    const newErrors: Record<number, string> = {};
    const names = new Map<string, number>();

    localPlayers.forEach((player) => {
      const trimmedName = player.name.trim();
      
      // Check for empty names
      if (!trimmedName) {
        newErrors[player.id] = "Name cannot be empty";
        return;
      }
      
      // Check for duplicate names
      if (names.has(trimmedName.toLowerCase())) {
        newErrors[player.id] = "Duplicate name";
        const existingId = names.get(trimmedName.toLowerCase());
        if (existingId !== undefined) {
          newErrors[existingId] = "Duplicate name";
        }
      } else {
        names.set(trimmedName.toLowerCase(), player.id);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validatePlayers()) {
      // Trim names before saving
      const cleanedPlayers = localPlayers.map((p) => ({
        ...p,
        name: p.name.trim(),
      }));
      setPlayers(cleanedPlayers);
      setOpen(false);
      localStorage.setItem("players", JSON.stringify(cleanedPlayers));
      triggerHaptic('success');
    } else {
      triggerHaptic('error');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalPlayers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      triggerHaptic('selection');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-accent bg-card">
        <DialogHeader>
          <DialogTitle>Edit Players</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Drag to reorder players. Names must be unique.
          </p>
        </DialogHeader>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localPlayers.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-3 max-h-75 overflow-y-auto pr-1">
              {localPlayers.map((player, index) => (
                <SortablePlayerItem
                  key={player.id}
                  player={player}
                  index={index}
                  onNameChange={updatePlayerName}
                  onRemove={removePlayer}
                  canRemove={localPlayers.length > 2}
                  error={errors[player.id]}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button
          type="button"
          variant="outline"
          onClick={addPlayer}
          className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Player
        </Button>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="hover:scale-105 active:scale-95 transition duration-200">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSave}
            className="hover:scale-105 active:scale-95 transition duration-200"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Players;
