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
import RevealCard from "./parts/RevealCard";

type WordsData = {
  categories: { name: string; icon?: string; words: string[] }[];
};

const typedWords = wordsData as WordsData;

function Play() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
  ]);

  const [imposters, setImposters] = useState(1);
  const allCategories = useMemo(
    () => typedWords.categories.map(({ name, icon }) => ({ name, icon })),
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    allCategories.map((category) => category.name)
  );

  function StartGame() {
    const filtered = typedWords.categories.filter((category) =>
      selectedCategories.includes(category.name)
    );
    if (!filtered.length) return () => {};

    const category = filtered[Math.floor(Math.random() * filtered.length)];
    const secretWord =
      category.words[Math.floor(Math.random() * category.words.length)];

    const shuffledIds = players
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    const imposterIds = new Set(shuffledIds.slice(0, imposters));

    return () => {
      alert(
        `Game Started!\nCategory: ${
          category.name
        }\nSecret Word: ${secretWord}\nImposter: ${[...imposterIds].join(", ")}`
      );
    };
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
                />
              </ItemActions>
            </Item>
            <Button
              variant="default"
              className="w-full p-6 mb-3 hover:scale-105 active:scale-95 transition duration-200 mx-auto "
              onClick={StartGame(players, imposters, selectedCategories)}
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
