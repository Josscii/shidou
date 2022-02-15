import { FunctionComponent, useEffect, useState } from "react";
import { Guess } from "./Guess";
import Input from "./Input";
import { POEMS } from "./Poem";
import { work, WorkResult } from "./Work";
import * as dayjs from "dayjs";
import { useLocalStorage } from "./useLocalStorage";
import StartButton from "./StartButton";
import { helpOpenGuess } from "./Helpers";

const START_DATE = "2022-02-14";
const POEM_INDEX = dayjs().diff(dayjs(START_DATE), "day");
const TODAY_POEM = POEMS[POEM_INDEX];
const GUESS_MAX_COUNT = 6;

const QRCODE_IMAGE = new URL("qrcode.png", import.meta.url);

interface GameSession {
  answer: string;
  guessList: string[];
  results?: WorkResult[];
}

const Main: FunctionComponent = () => {
  const [session, setSession] = useLocalStorage<GameSession>(
    dayjs().format("YYYY-MM-DD"),
    {
      answer: TODAY_POEM.quote.replace("。", "").split("，")[
        Math.floor(Math.random() * 2)
      ],
      guessList: Array(GUESS_MAX_COUNT).fill(""),
    }
  );

  // a workaround solution for shake animation
  const [shake, setShake] = useState<boolean>(false);

  const successed =
    session.results &&
    session.results.filter((result) => result.same).length !== 0;
  const finished =
    successed ||
    (session.results && session.results.length === GUESS_MAX_COUNT);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-10 flex flex-col gap-2 flex-1">
        {session.guessList.map((guess, index) => {
          return (
            <Guess
              key={index}
              answer={session.answer}
              guess={guess}
              result={
                session.results && index < session.results.length
                  ? session.results[index]
                  : undefined
              }
              shake={
                session.results
                  ? index === session.results.length && shake
                  : false
              }
            />
          );
        })}
      </div>
      {session.results === undefined ? (
        <StartButton
          onStart={() => {
            setSession((lastSession) => ({
              ...lastSession,
              results: [],
            }));
          }}
          onHelpStart={() => {
            setSession((lastSession) => {
              const guess = helpOpenGuess(lastSession.answer.length);
              let newGuessList = [...lastSession.guessList];
              newGuessList[0] = guess;
              return {
                ...lastSession,
                guessList: newGuessList,
                results: [],
              };
            });
          }}
        />
      ) : finished ? (
        <div className="flex-1 flex gap-5 justify-center items-center text-slate-400">
          <div className="w-20">
            <img src={`${QRCODE_IMAGE}`} alt="qrcode" />
          </div>
          <div>
            <p className="text-lg">明日再来</p>
          </div>
        </div>
      ) : (
        <Input
          session={session}
          onChange={(value) => {
            setShake(false);
            setSession((lastSession) => {
              let newGuessList = [...lastSession.guessList];
              newGuessList[lastSession.results!.length] = value;
              return {
                ...lastSession,
                guessList: newGuessList,
              };
            });
          }}
          onSubmit={(result) => {
            if (result.include) {
              setSession((lastSession) => ({
                ...lastSession,
                results: lastSession.results?.concat(result),
              }));
            } else {
              setShake(true);
            }
          }}
        />
      )}
    </div>
  );
};

export { Main, GameSession, TODAY_POEM };
