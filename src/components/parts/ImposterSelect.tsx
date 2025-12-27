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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type ImposterProps = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  playerCount: number;
};

export function ImposterSelect({
  count,
  setCount,
  playerCount,
}: ImposterProps) {
  const [localCount, setLocalCount] = useState<number>(count);
  const [open, setOpen] = useState(false);

  const maxImposters = Math.max(1, playerCount - 1);

  useEffect(() => {
    setLocalCount(Math.min(Math.max(1, count), maxImposters));
  }, [count, maxImposters]);

  const handleSave = () => {
    setCount(Math.min(Math.max(1, localCount), maxImposters));
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setLocalCount(count);
    setOpen(isOpen);
  };

  const handleChange = (value: number[]) => {
    const next = value[0] ?? 1;
    setLocalCount(Math.min(Math.max(1, next), maxImposters));
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
          <DialogTitle>Edit Imposter Count</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="imposter-slider" className="text-sm font-medium">
              Imposters
            </Label>
            <span className="text-sm font-semibold text-primary">
              {localCount}
            </span>
          </div>
          <Slider
            id="imposter-slider"
            min={1}
            max={maxImposters}
            step={1}
            value={[localCount]}
            onValueChange={handleChange}
          />
          <p className="text-sm text-muted-foreground">
            Choose between 1 and {maxImposters} (based on {playerCount} players)
          </p>
        </div>
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

export default ImposterSelect;
