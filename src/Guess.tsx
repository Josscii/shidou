import { FunctionComponent } from "react";
import { WorkResult } from "./Work";

interface GuessProp {
  answer: string;
  guess: string;
  result?: WorkResult;
  shake: boolean;
}

const Guess: FunctionComponent<GuessProp> = ({
  answer,
  guess,
  result,
  shake,
}) => {
  // ref: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  let gridCols = "grid gap-2 ";
  if (answer.length === 5) {
    gridCols += "grid-cols-5";
  } else if (answer.length === 7) {
    gridCols += "grid-cols-7";
  }
  return (
    <div className={gridCols}>
      {[...answer].map((answerWord, index) => {
        if (shake) {
          return (
            <div
              key={index}
              className="text-xl border-2 border-slate-200 aspect-square flex items-center justify-center shake-animation"
            >
              {index < guess.length && guess[index]}
            </div>
          );
        }

        if (result === undefined) {
          return (
            <div
              key={index}
              className="text-xl border-2 border-slate-200 aspect-square flex items-center justify-center"
            >
              {index < guess.length && guess[index]}
            </div>
          );
        }

        const guessWord = guess[index];
        let bgColor = "bg-slate-300";
        if (result.sameAuthor) {
          bgColor = "bg-green-200";
        }
        if (result.samePoem) {
          bgColor = "bg-green-400";
        }

        if (result.sameYunmu && index === guess.length - 1) {
          bgColor = "bg-yellow-400";
        }

        if (answer.includes(guessWord)) {
          bgColor = "bg-green-600";
        }

        const classes =
          "font-medium text-xl text-white aspect-square flex items-center justify-center " +
          bgColor;

        return (
          <div key={index} className={classes}>
            {index < guess.length && guess[index]}
          </div>
        );
      })}
    </div>
  );
};

export { Guess, GuessProp };
