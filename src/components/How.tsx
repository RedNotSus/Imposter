import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function How() {
  const steps = [
    {
      step: 1,
      title: "Gather players and materials",
      description:
        'Bring together at least 4 players and prepare slips of paper: one with "Imposter" and the rest with the chosen secret word.',
    },
    {
      step: 2,
      title: "Choose a secret word",
      description:
        "Pick a word from a list, generator, or by suggestion. Example: Pizza.",
    },
    {
      step: 3,
      title: "Deal the papers",
      description:
        "Hand out the slips so that all but the imposter see the secret word.",
    },
    {
      step: 4,
      title: "Decide who goes first",
      description:
        "Choose a starting player (youngest player, roll of dice, or random pick). Play moves clockwise.",
    },
    {
      step: 5,
      title: "Give clues in turn",
      description:
        'Each player gives one word (default rule) to describe the secret word, without saying it directly. Example: If the word is Pizza, clues might be "Cheesy" or "Slices." Continue around the circle.',
    },
    {
      step: 6,
      title: "Continue taking turns",
      description:
        "Go around for several rounds of clues. The imposter tries to blend in by guessing what the word might be based on others' clues.",
    },
    {
      step: 7,
      title: "Discuss and vote",
      description:
        "After a set number of rounds (usually 2-3), everyone discusses and votes on who they think the imposter is. The person with the most votes is revealed.",
    },
    {
      step: 8,
      title: "Reveal and recap",
      description:
        "Reveal the secret word and the imposter. Recap funny or odd clues - often the best part is laughing about why someone described a word in such a weird way.",
    },
    {
      step: 9,
      title: "Play the next round",
      description:
        "Start a new round with a fresh word and slips of paper. Ideally, play enough rounds so that everyone has a chance to be the imposter.",
    },
  ];

  const variations = [
    {
      name: "Phrases Allowed",
      description:
        "Instead of just one word, let players give short descriptive phrases.",
    },
    {
      name: "Multiple Imposters",
      description: "For larger groups, include two imposters.",
    },
    {
      name: "Categories Mode",
      description:
        "Pick a category (e.g., food, animals, movies) before selecting the word.",
    },
    {
      name: "No Final Guess",
      description: "The imposter loses immediately if discovered.",
    },
    {
      name: "Kids' Mode",
      description: 'Use simple words like "Dog," "School," or "Ice Cream."',
    },
  ];

  return (
    <div className="p-[5vw] max-w-5xl mx-auto space-y-6">
      <Button
        variant="outline"
        className="hover:scale-105 active:scale-95 transition duration-200 fixed top-4 left-4"
      >
        <a href="/">← Back</a>
      </Button>
      <Card className="w-full border-accent text-primary overflow-hidden">
        <div className="from-primary/10 via-accent/10 to-primary/10 p-8 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-4">
            How to Play
          </h1>
          <p className="text-xl leading-7 max-w-3xl mx-auto text-muted-foreground">
            The{" "}
            <span className="font-bold text-primary">Imposter Word Game</span>{" "}
            is a fun family and party game of hidden roles, quick thinking, and
            deduction. One player secretly doesn't know the secret word - but
            has to blend in while others try to spot the imposter.
          </p>
          <p className="text-lg mt-2 font-medium text-primary/80">
            It's silly, clever, and always full of laughs!
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-accent/50 hover:border-accent transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Objective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>
                <span className="font-semibold text-primary">Players:</span>{" "}
                Figure out who the imposter is
              </li>
              <li>
                <span className="font-semibold text-primary">Imposter:</span>{" "}
                Blend in & guess the secret word
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-accent/50 hover:border-accent transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Age Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-2xl text-primary">10+</span>
              <br />
              Younger kids with easier words, teens & adults enjoy the strategy
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/50 hover:border-accent transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Game Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-2xl text-primary">10-20 min</span>
              <br />
              per round, depending on group size
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/50 hover:border-accent transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-2xl text-primary">4-10</span>
              <br />
              At least 4 players, best with 6-10
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Why We Like It for Kids and Families
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold">Hidden Roles</p>
                <p className="text-sm text-muted-foreground">
                  Makes it exciting for everyone
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold">Encourages Creativity</p>
                <p className="text-sm text-muted-foreground">
                  Players describe the word in unique ways
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold">Boosts Social Skills</p>
                <p className="text-sm text-muted-foreground">
                  Observation, deception, and teamwork
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold">Highly Replayable</p>
                <p className="text-sm text-muted-foreground">
                  Endless new words and categories
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-sm italic text-muted-foreground">
              <span className="font-semibold not-italic">Personal note:</span> I
              love the sneaky excitement of being the imposter. In those early
              rounds - especially if you're the first to give a clue and don't
              know the word at all - it's hilarious trying to bluff blindly. The
              whole group usually cracks up when someone manages to survive that
              first round, only to get caught later by an odd clue or a nervous
              hesitation.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-accent/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              Skills Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Deductive reasoning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Social awareness and reading people
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Creative wordplay
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Confidence in speaking
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-accent/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              What You Need
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-lg"></span>
                At least 4 players (best with 6-10)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg"></span>
                Slips of paper and a pencil (or cards/phones)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg"></span>A way to secretly assign the
                "Imposter" slip
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            How to Play in 9 Steps
          </CardTitle>
          <CardDescription>
            Follow these steps to get your game started!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-sm italic text-muted-foreground">
              <span className="font-semibold not-italic">Personal note:</span>{" "}
              Some of the funniest moments come when you think you know the word
              after a couple rounds... only to realize you guessed wrong when
              someone drops a clue that doesn't fit your assumption at all.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                If the imposter is caught:
              </h4>
              <p className="text-sm text-muted-foreground">
                The group scores <span className="font-bold">1 point</span>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                If the imposter survives:
              </h4>
              <p className="text-sm text-muted-foreground">
                Imposter scores <span className="font-bold">1 point</span> +
                bonus point if they guess the word correctly
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Rules Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="text-muted-foreground">
              One secret word is chosen.
            </li>
            <li className="text-muted-foreground">
              Everyone sees the word except the imposter.
            </li>
            <li className="text-muted-foreground">
              Each player gives one-word clues (phrases optional as a
              variation).
            </li>
            <li className="text-muted-foreground">
              After 2-3 rounds, the group votes on the imposter.
            </li>
            <li className="text-muted-foreground">
              If caught, the group wins. If not, the imposter scores by guessing
              the word.
            </li>
            <li className="text-muted-foreground">
              Use points for ongoing rounds to keep score.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Variations
          </CardTitle>
          <CardDescription>
            Try these twists to keep the game fresh!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {variations.map((variation) => (
              <div
                key={variation.name}
                className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-semibold text-primary">{variation.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {variation.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                As a Non-Imposter
              </h4>
              <p className="text-sm text-muted-foreground">
                Give clear but not too obvious clues to help your team but not
                the imposter.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                As the Imposter
              </h4>
              <p className="text-sm text-muted-foreground">
                Listen closely to others' clues and mimic their style without
                slipping up.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted/30">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              General Tip
            </h4>
            <p className="text-sm text-muted-foreground">
              Pay attention to hesitation, vague answers, or odd clues that
              don't match.
            </p>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-sm italic text-muted-foreground">
              <span className="font-semibold not-italic">Personal note:</span>{" "}
              It's especially fun when you're running out of good associations.
              By the third round, everyone is stretching for creative clues, and
              that's usually when the imposter slips up.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default How;
