import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Users, UserRoundSearch } from "lucide-react";

import { Players } from "./parts/Players";
import { ImposterSelect } from "./parts/ImposterSelect";
import { useEffect, useMemo, useState } from "react";
import wordsData from "@/assets/words.json";

import { CategorySelect } from "./parts/CategorySelect";
import PlayerScreen from "./parts/PlayerScreen";
import { useCustomCategories } from "@/hooks/useCustomCategories";

type WordsData = {
  categories: { name: string; icon?: string; words: string[] }[];
};

const typedWords = wordsData as WordsData;

type Player = {
  id: number;
  name: string;
};

type RoundPlayer = Player & {
  isImposter: boolean;
  word: string;
  category: string;
};

const STORAGE_KEYS = {
  players: "imposter-players",
  imposters: "imposter-imposters",
  categories: "imposter-categories",
};

function Play() {
  const builtInCategories = useMemo(
    () => typedWords.categories.map(({ name, icon }) => ({ name, icon })),
    []
  );

  const {
    categories: customCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCustomCategories();

  // Combine built-in and custom categories
  const allCategories = useMemo(
    () => [
      ...builtInCategories,
      ...customCategories.map((c) => ({ name: c.name, icon: c.icon, isCustom: true })),
    ],
    [builtInCategories, customCategories]
  );

  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.players);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          { id: 1, name: "Player 1" },
          { id: 2, name: "Player 2" },
          { id: 3, name: "Player 3" },
          { id: 4, name: "Player 4" },
        ];
      }
    }
    return [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
      { id: 3, name: "Player 3" },
      { id: 4, name: "Player 4" },
    ];
  });

  const [imposters, setImposters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.imposters);
    if (saved) {
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? 1 : parsed;
    }
    return 1;
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.categories);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return []; // Will be populated by useEffect below
      }
    }
    return []; // Will be populated by useEffect below
  });

  const [roundPlayers, setRoundPlayers] = useState<RoundPlayer[] | null>(null);

  // Sync selected categories when allCategories changes
  // Default to ALL categories if none are selected or saved selections are invalid
  useEffect(() => {
    setSelectedCategories((prev) => {
      // Filter to only valid category names
      const validSelected = prev.filter((name) =>
        allCategories.some((c) => c.name === name)
      );
      // If no valid selections, default to ALL categories
      if (validSelected.length === 0) {
        return allCategories.map((c) => c.name);
      }
      return validSelected;
    });
  }, [allCategories]);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.imposters, imposters.toString());
  }, [imposters]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.categories,
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  function StartGame() {
    // Get all available word sources (built-in + custom)
    const builtInFiltered = typedWords.categories.filter((category) =>
      selectedCategories.includes(category.name)
    );
    const customFiltered = customCategories.filter((category) =>
      selectedCategories.includes(category.name)
    );

    const allFiltered = [
      ...builtInFiltered.map((c) => ({ name: c.name, words: c.words })),
      ...customFiltered.map((c) => ({ name: c.name, words: c.words })),
    ];

    if (!allFiltered.length) return;

    const category = allFiltered[Math.floor(Math.random() * allFiltered.length)];
    const secretWord =
      category.words[Math.floor(Math.random() * category.words.length)];

    const shuffledIds = players
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    const imposterIds = new Set(shuffledIds.slice(0, imposters));

    const assignments: RoundPlayer[] = players.map((player) => ({
      ...player,
      isImposter: imposterIds.has(player.id),
      word: secretWord,
      category: category.name,
    }));

    setRoundPlayers(assignments);
    setImposters((prev) => Math.min(prev, players.length - 1));
  }

  const categoriesLabel =
    selectedCategories.length === allCategories.length
      ? "All"
      : selectedCategories.slice(0, 3).join(", ") +
        (selectedCategories.length > 3
          ? ` +${selectedCategories.length - 3}`
          : "");

  useEffect(() => {
    const maxImposters = Math.max(1, players.length - 1);
    setImposters((prev) => Math.min(Math.max(1, prev), maxImposters));
  }, [players.length]);

  // Handlers for custom categories
  const handleAddCustom = (data: { name: string; words: string[]; icon?: string }) => {
    addCategory(data);
  };

  const handleUpdateCustom = (id: string, data: { name: string; words: string[]; icon?: string }) => {
    updateCategory(id, data);
  };

  const handleDeleteCustom = (id: string) => {
    deleteCategory(id);
  };

  if (roundPlayers) {
    return (
      <PlayerScreen
        players={roundPlayers}
        onRestart={() => setRoundPlayers(null)}
      />
    );
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button
        variant="outline"
        className="hover:scale-105 active:scale-95 transition duration-200 fixed top-4 left-4"
      >
        <a href="/">← Back</a>
      </Button>
      <Card className="w-full max-w-sm border-accent">
        <CardContent>
          <p className="text-2xl font-semibold mb-4 -mt-2 text-center">
            Game Settings
          </p>
          <div className="flex w-full max-w-lg flex-col gap-6">
            <Item variant="outline">
              <ItemMedia variant="icon" className="border-accent">
                <Users />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Players</ItemTitle>

                <ItemDescription className="text-left -mt-1.5">
                  {players.length}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Players players={players} setPlayers={setPlayers} />
              </ItemActions>
            </Item>
            <Item variant="outline" className="-mt-4">
              <ItemMedia variant="icon" className="border-accent">
                <UserRoundSearch />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Imposters</ItemTitle>
                <ItemDescription className="text-left -mt-1.5">
                  {imposters}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ImposterSelect
                  count={imposters}
                  setCount={setImposters}
                  playerCount={players.length}
                />
              </ItemActions>
            </Item>
            <Item variant="outline" className="-mt-4">
              <ItemContent>
                <ItemTitle>Categories</ItemTitle>
                <ItemDescription className="text-left -mt-1.5">
                  {categoriesLabel}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <CategorySelect
                  allCategories={allCategories}
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                  customCategories={customCategories}
                  onAddCustom={handleAddCustom}
                  onUpdateCustom={handleUpdateCustom}
                  onDeleteCustom={handleDeleteCustom}
                />
              </ItemActions>
            </Item>
            <Button
              variant="default"
              className="w-full p-6 mb-3 hover:scale-105 active:scale-95 transition duration-200 mx-auto "
              onClick={StartGame}
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Play;