import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ListPlus, Sparkles } from "lucide-react";
import { useState } from "react";
import type { CustomCategory } from "@/hooks/useCustomCategories";
import { CustomCategoryEditor } from "./CustomCategoryEditor";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";

type CustomCategoryManagerProps = {
  categories: CustomCategory[];
  onAdd: (data: { name: string; words: string[]; icon?: string }) => void;
  onUpdate: (
    id: string,
    data: { name: string; words: string[]; icon?: string }
  ) => void;
  onDelete: (id: string) => void;
};

export function CustomCategoryManager({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: CustomCategoryManagerProps) {
  const [open, setOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(
    null
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingCategory(null);
    setEditorOpen(true);
  };

  const handleEdit = (category: CustomCategory) => {
    setEditingCategory(category);
    setEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirmId(null);
  };

  const handleSave = (data: { name: string; words: string[]; icon?: string }) => {
    if (editingCategory) {
      onUpdate(editingCategory.id, data);
    } else {
      onAdd(data);
    }
    setEditorOpen(false);
    setEditingCategory(null);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Sparkles className="h-4 w-4" />;
    const IconComponent = (
      Icons as unknown as Record<string, ComponentType<{ className?: string }>>
    )[iconName];
    if (!IconComponent) return <Sparkles className="h-4 w-4" />;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="gap-2">
            <ListPlus className="h-4 w-4" />
            Manage
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-accent bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListPlus className="h-5 w-5 text-primary" />
              Custom Word Lists
            </DialogTitle>
            <DialogDescription>
              Create and manage your own word lists
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-80 overflow-y-auto py-2">
            {categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-dashed border-accent rounded-lg">
                <ListPlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No custom lists yet</p>
                <p className="text-xs mt-1">
                  Create your first custom word list
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-accent bg-accent/5 hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                      {renderIcon(category.icon)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.words.length} words
                      </p>
                    </div>
                  </div>

                  {deleteConfirmId === category.id ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
                        className="h-8 px-3"
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteConfirmId(null)}
                        className="h-8 px-3"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteConfirmId(category.id)}
                        className="h-8 w-8 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <Button
            onClick={handleAddNew}
            className="w-full gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Plus className="h-4 w-4" />
            Add New List
          </Button>
        </DialogContent>
      </Dialog>

      <CustomCategoryEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </>
  );
}

export default CustomCategoryManager;
