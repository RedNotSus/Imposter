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

function Play() {
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
                  4
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Players />
              </ItemActions>
            </Item>
            <Item variant="outline" className="-mt-4">
              <ItemMedia variant="icon" className="border-accent">
                <UserRoundSearch />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Imposters</ItemTitle>
                <ItemDescription className="text-left -mt-1.5">
                  1
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline" className="-mt-4">
              <ItemContent>
                <ItemTitle>Categories</ItemTitle>
                <ItemDescription className="text-left -mt-1.5">
                  All
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </ItemActions>
            </Item>
            <Button
              variant="default"
              className="w-full p-6 mb-3 hover:scale-105 active:scale-95 transition duration-200 mx-auto "
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
