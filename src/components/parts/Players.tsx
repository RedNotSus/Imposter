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

export function Players() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-accent bg-card">
          <DialogHeader>
            <DialogTitle>Edit Players</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Player 1</Label>
              <Input id="name-1" name="name" defaultValue="Player 1" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-2">Player 2</Label>
              <Input id="name-2" name="name" defaultValue="Player 2" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-3">Player 3</Label>
              <Input id="name-3" name="name" defaultValue="Player 3" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-4">Player 4</Label>
              <Input id="name-4" name="name" defaultValue="Player 4" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default Players;
