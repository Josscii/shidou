import { FunctionComponent } from "react";

const StartButton: FunctionComponent<{
  onStart: () => void;
  onHelpStart: () => void;
}> = ({ onStart, onHelpStart }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mb-2">
      <button
        className="px-8 py-2 text-xl rounded bg-slate-400 text-white"
        onClick={onStart}
      >
        开局
      </button>
      <button className="text-xs text-slate-400" onClick={onHelpStart}>
        帮我开局
      </button>
    </div>
  );
};

export default StartButton;
