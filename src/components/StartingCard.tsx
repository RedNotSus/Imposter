import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RevealCard from "./parts/RevealCard";

import logo from "/src/assets/logo.png";
import { Link } from "react-router-dom";

function StartingCard() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
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
          <Link to="/play">
            <Button
              variant="default"
              className="w-full p-6 mb-3 hover:scale-105 active:scale-95 transition duration-200"
            >
              Get Started
            </Button>
          </Link>
          <Link to="/how">
            <Button
              variant="outline"
              className="w-full p-6 hover:scale-105 active:scale-95 transition duration-200"
            >
              How to Play
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartingCard;
