import { FunctionComponent } from "react";
import { BarChart2, HelpCircle } from "react-feather";

const Header: FunctionComponent<{
  onHelp: () => void;
  onData: () => void;
}> = ({ onHelp, onData }) => {
  return (
    <div className="h-10 flex justify-between items-center border-b border-b-slate-200">
      <button onClick={onHelp}>
        <HelpCircle />
      </button>
      <h1 className="font-medium">诗斗</h1>
      <button onClick={onData}>
        <BarChart2 />
      </button>
    </div>
  );
};

export default Header;
