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
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { CustomCategory } from "@/hooks/useCustomCategories";
import { CustomCategoryEditor } from "./CustomCategoryEditor";

type CategoryMeta = {
  name: string;
  icon?: string;
  isCustom?: boolean;
};

type CategorySelectProps = {
  allCategories: CategoryMeta[];
  customCategories: CustomCategory[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  onAddCustom: (data: { name: string; words: string[]; icon?: string }) => void;
  onUpdateCustom: (
    id: string,
    data: { name: string; words: string[]; icon?: string }
  ) => void;
  onDeleteCustom: (id: string) => void;
};

export function CategorySelect({
  allCategories,
  customCategories,
  selected,
  setSelected,
  onAddCustom,
  onUpdateCustom,
  onDeleteCustom,
}: CategorySelectProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [open, setOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(
    null
  );
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(
    null
  );

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

  const allSelected = localSelected.length === allCategories.length;

  const handleToggleAll = () => {
    if (allSelected) {
      setLocalSelected([]);
    } else {
      setLocalSelected(allCategories.map((c) => c.name));
    }
  };

  const handleSave = () => {
    const next =
      localSelected.length === 0
        ? allCategories.slice(0, 1).map((c) => c.name)
        : localSelected;
    setSelected(next);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLocalSelected(selected);
      setDeleteConfirmName(null);
    }
    setOpen(isOpen);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setEditorOpen(true);
  };

  const handleEditCustom = (categoryName: string) => {
    const cat = customCategories.find((c) => c.name === categoryName);
    if (cat) {
      setEditingCategory(cat);
      setEditorOpen(true);
    }
  };

  const handleDeleteCustom = (categoryName: string) => {
    const cat = customCategories.find((c) => c.name === categoryName);
    if (cat) {
      onDeleteCustom(cat.id);
      setLocalSelected((prev) => prev.filter((n) => n !== categoryName));
      setDeleteConfirmName(null);
    }
  };

  const handleEditorSave = (data: {
    name: string;
    words: string[];
    icon?: string;
  }) => {
    if (editingCategory) {
      onUpdateCustom(editingCategory.id, data);
      // Update local selection if name changed
      if (editingCategory.name !== data.name) {
        setLocalSelected((prev) =>
          prev.map((n) => (n === editingCategory.name ? data.name : n))
        );
      }
    } else {
      onAddCustom(data);
      // Auto-select the new category
      setLocalSelected((prev) => [...prev, data.name]);
    }
    setEditorOpen(false);
    setEditingCategory(null);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (
      Icons as unknown as Record<string, ComponentType<{ className?: string }>>
    )[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 border-accent bg-card max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Categories</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {localSelected.length === allCategories.length
                ? "All categories selected"
                : `${localSelected.length} of ${allCategories.length} selected`}
            </p>
            <Button size="sm" variant="ghost" onClick={handleToggleAll}>
              {allSelected ? "Deselect all" : "Select all"}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-y-hidden">
            <ToggleGroup
              type="multiple"
              className="flex-wrap justify-start gap-2 border-accent"
              value={localSelected}
              onValueChange={(values) => setLocalSelected(values)}
            >
              <button
                type="button"
                onClick={handleAddNew}
                className="flex items-center gap-2 border border-accent bg--card text-foreground hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition duration-200 px-3 py-1 rounded-md text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Custom</span>
              </button>

              {sortedCategories.map(({ name, icon, isCustom }) => (
                <div key={name} className="group">
                  {deleteConfirmName === name ? (
                    <div className="flex items-center gap-1 p-1 rounded-md border border-destructive bg-destructive/10">
                      <span className="text-xs px-2">Delete?</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCustom(name);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs bg-card"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmName(null);
                        }}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <ToggleGroupItem
                        value={name}
                        aria-label={`Toggle ${name}`}
                        className="data-[state=on]:bg-card data-[state=on]:border-accent data-[state=on]:text-primary data-[state=off]:bg-muted/10 data-[state=off]:border-accent data-[state=off]:text-muted-foreground hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2 border px-3 py-1 rounded-md text-sm"
                      >
                        {renderIcon(icon)}
                        <span>{name}</span>
                      </ToggleGroupItem>
                      {isCustom && (
                        <div className="flex items-center gap-0.5 max-w-0 overflow-hidden group-hover:max-w-16 transition-all duration-200">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCustom(name);
                            }}
                            className="p-1 rounded hover:bg-accent/30 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmName(name);
                            }}
                            className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </ToggleGroup>
          </div>

          <DialogFooter className="pt-4 border-t border-accent">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-card border-accent hover:scale-105 active:scale-95 transition duration-200"
              >
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

      <CustomCategoryEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        category={editingCategory}
        onSave={handleEditorSave}
      />
    </>
  );
}

export default CategorySelect;
