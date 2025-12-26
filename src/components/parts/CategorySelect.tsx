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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import * as Icons from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from "react";

type CategoryMeta = {
  name: string;
  icon?: string;
};

type CategorySelectProps = {
  allCategories: CategoryMeta[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};

export function CategorySelect({
  allCategories,
  selected,
  setSelected,
}: CategorySelectProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [open, setOpen] = useState(false);

  const sortedCategories = useMemo(
    () => [...allCategories].sort((a, b) => a.name.localeCompare(b.name)),
    [allCategories]
  );

  useEffect(() => {
    setLocalSelected((prev) => {
      const next = prev.filter((name) =>
        allCategories.some((c) => c.name === name)
      );
      return next.length ? next : selected;
    });
  }, [allCategories, selected]);

  const handleSelectAll = () =>
    setLocalSelected(allCategories.map((c) => c.name));

  const handleSave = () => {
    const next =
      localSelected.length === 0
        ? allCategories.map((c) => c.name)
        : localSelected;
    setSelected(next);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setLocalSelected(selected);
    setOpen(isOpen);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (
      Icons as Record<string, ComponentType<{ className?: string }>>
    )[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-accent bg-card">
        <DialogHeader>
          <DialogTitle>Select Categories</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {localSelected.length === allCategories.length
              ? "All categories selected"
              : `${localSelected.length} of ${allCategories.length} selected`}
          </p>
          <Button size="sm" variant="ghost" onClick={handleSelectAll}>
            Select all
          </Button>
        </div>
        <ToggleGroup
          type="multiple"
          className="flex-wrap justify-start gap-2 border-accent"
          value={localSelected}
          onValueChange={(values) => setLocalSelected(values)}
        >
          {sortedCategories.map(({ name, icon }) => (
            <ToggleGroupItem
              key={name}
              value={name}
              aria-label={`Toggle ${name}`}
              className="data-[state=on]:bg-transparent data-[state=on]:border-primary data-[state=on]:text-primary data-[state=off]:bg-accent/10 data-[state=off]:border-accent data-[state=off]:text-muted-foreground hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2 border px-3 py-1 rounded-md text-sm"
            >
              {renderIcon(icon)}
              <span>{name}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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

export default CategorySelect;
