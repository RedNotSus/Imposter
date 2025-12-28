import { useState, useEffect, useCallback } from "react";

export type CustomCategory = {
  id: string;
  name: string;
  icon?: string;
  words: string[];
};

const STORAGE_KEY = "imposter-custom-categories";

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function loadFromStorage(): CustomCategory[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    console.error("Failed to load custom categories from localStorage");
  }
  return [];
}

function saveToStorage(categories: CustomCategory[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch {
    console.error("Failed to save custom categories to localStorage");
  }
}

export function useCustomCategories() {
  const [categories, setCategories] = useState<CustomCategory[]>(() =>
    loadFromStorage()
  );

  useEffect(() => {
    saveToStorage(categories);
  }, [categories]);

  const addCategory = useCallback((category: Omit<CustomCategory, "id">) => {
    const newCategory: CustomCategory = {
      ...category,
      id: generateId(),
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(
    (id: string, updates: Partial<Omit<CustomCategory, "id">>) => {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
      );
    },
    []
  );

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }, []);

  const getCategoryById = useCallback(
    (id: string): CustomCategory | undefined => {
      return categories.find((cat) => cat.id === id);
    },
    [categories]
  );

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
}

export default useCustomCategories;
