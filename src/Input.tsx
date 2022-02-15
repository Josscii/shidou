import * as React from "react";
import { FunctionComponent } from "react";
import { Check } from "react-feather";
import { GameSession, TODAY_POEM } from "./Main";
import { work, WorkResult } from "./Work";

const Input: FunctionComponent<{
  session: GameSession;
  onChange: (value: string) => void;
  onSubmit: (result: WorkResult) => void;
}> = ({ session, onChange, onSubmit }) => {
  // can't use controlled input
  const [lock, setLock] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = session.guessList[session.results!.length];
      inputRef.current.focus();
    }
  }, []);

  function handleValidateChange() {
    if (inputRef.current) {
      const chinese = inputRef.current.value
        .split("")
        .filter((char) => /\p{Script=Han}/u.test(char))
        .join("")
        .substring(0, session.answer.length);
      inputRef.current.value = chinese;
      onChange(chinese);
    }
  }

  return (
    <div className="mb-4 px-4 h-10 flex gap-2 items-stretch">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 rounded border-slate-200 border text-center"
        onCompositionStart={(_) => {
          setLock(true);
          console.log("onCompositionStart");
        }}
        onCompositionEnd={(_) => {
          setLock(false);
          console.log("onCompositionEnd");
          // in chrome and safari, onChange doesn't call after onCompositionEnd, so
          // have to call validate manully.
          handleValidateChange();
        }}
        onChange={(_) => {
          if (!lock && inputRef.current) {
            handleValidateChange();
          }
        }}
      />
      <button
        className="w-16 flex justify-center items-center rounded bg-slate-400 disabled:bg-slate-200 text-white"
        disabled={
          inputRef.current != null
            ? inputRef.current.value.length !== session.answer.length
            : true
        }
        onClick={() => {
          if (inputRef.current) {
            let result = work(
              TODAY_POEM,
              session.answer,
              session.guessList[session.results!.length]
            );

            if (result) {
              if (result.include) {
                inputRef.current.value = "";
              }

              onSubmit(result);
            }
          }
        }}
      >
        <Check />
      </button>
    </div>
  );
};

export default Input;
