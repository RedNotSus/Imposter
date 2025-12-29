import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { useState, useEffect, type ComponentType } from "react";
import type { CustomCategory } from "@/hooks/useCustomCategories";

type CustomCategoryEditorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CustomCategory | null;
  onSave: (data: { name: string; words: string[]; icon?: string }) => void;
};

const SUGGESTED_ICONS = [
  "Sparkles",
  "Star",
  "Heart",
  "Zap",
  "Flame",
  "Crown",
  "Diamond",
  "Trophy",
  "Target",
  "Gamepad2",
  "Music",
  "Film",
  "Book",
  "Palette",
  "Camera",
];

export function CustomCategoryEditor({
  open,
  onOpenChange,
  category,
  onSave,
}: CustomCategoryEditorProps) {
  const [name, setName] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("Sparkles");
  const [errors, setErrors] = useState<{ name?: string; words?: string }>({});

  useEffect(() => {
    if (open) {
      if (category) {
        setName(category.name);
        setWords([...category.words]);
        setSelectedIcon(category.icon || "Sparkles");
      } else {
        setName("");
        setWords([]);
        setSelectedIcon("Sparkles");
      }
      setNewWord("");
      setErrors({});
    }
  }, [open, category]);

  const handleAddWord = () => {
    const trimmed = newWord.trim();
    if (trimmed && !words.includes(trimmed)) {
      setWords((prev) => [...prev, trimmed]);
      setNewWord("");
      setErrors((prev) => ({ ...prev, words: undefined }));
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    setWords((prev) => prev.filter((w) => w !== wordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWord();
    }
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; words?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (words.length < 3) {
      newErrors.words = "Add at least 3 words";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        name: name.trim(),
        words,
        icon: selectedIcon,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-accent bg-card max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {category ? "Edit Word List" : "Create Word List"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update your custom word list"
              : "Create a new custom word list for the game"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-2 ">
          <div className="space-y-2">
            <Label htmlFor="category-name">List Name</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g., Movie Characters, Video Games..."
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2 overflow-hidden">
            <Label>Icon</Label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_ICONS.map((iconName) => {
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={`p-2 rounded-md border transition-all duration-200 hover:scale-110 ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-accent bg-accent/10 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <IconRenderer name={iconName} className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-word">
              Words{" "}
              <span className="text-muted-foreground">({words.length})</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="new-word"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a word and press Enter..."
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleAddWord}
                disabled={!newWord.trim()}
                className="shrink-0 active:scale-95 transition duration-200 bg-card border-accent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.words && (
              <p className="text-sm text-destructive">{errors.words}</p>
            )}
          </div>

          {words.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 rounded-md border border-accent bg-accent/5">
                {words.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-primary/10 text-primary border border-primary/20 animate-in fade-in-0 zoom-in-95 duration-200"
                  >
                    {word}
                    <button
                      type="button"
                      onClick={() => handleRemoveWord(word)}
                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {words.length === 0 && (
            <div className="text-center py-8 text-muted-foreground border border-dashed border-accent rounded-lg">
              <p className="text-sm">No words added yet</p>
              <p className="text-xs mt-1">Add at least 3 words to save</p>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t border-accent">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="hover:scale-105 active:scale-95 transition duration-200 bg-card border-accent"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={words.length < 3 || !name.trim()}
            className="hover:scale-105 active:scale-95 transition duration-200"
          >
            {category ? "Save Changes" : "Create List"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IconRenderer({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = (
    Icons as unknown as Record<string, ComponentType<{ className?: string }>>
  )[name];
  if (!IconComponent) return <Sparkles className={className} />;
  return <IconComponent className={className} />;
}

export default CustomCategoryEditor;
