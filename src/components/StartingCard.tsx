import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import logo from "/src/assets/logo.png";

function StartingCard() {
  return (
    <Card className="w-full max-w-sm border-accent">
      <CardHeader>
        <img src={logo} className="-mt-10 -mb-10"></img>
        <CardTitle className="text-center text-4xl font-extrabold ">
          Imposter
        </CardTitle>
        <CardDescription className="text-center text-lg text-chart-4">
          Word Game
        </CardDescription>
        <CardDescription className="">
          A party game of hidden ideas and cunning clues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="default"
          className="w-full p-6 mb-3 hover:scale-105 active:scale-95 transition duration-200"
        >
          Get Started
        </Button>
        <Button
          variant="outline"
          className="w-full p-6 hover:scale-105 active:scale-95 transition duration-200"
        >
          How to Play
        </Button>
      </CardContent>
    </Card>
  );
}

export default StartingCard;
