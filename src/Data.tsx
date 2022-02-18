import { FunctionComponent } from "react";
import { X } from "react-feather";
import { GameSession } from "./Main";

const Data: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  let numerOfTry = 0;
  let numerOfWin = 0;
  let lastAnswer: string | undefined = undefined;
  let allRecords: { key: string; value: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key) {
      let value = localStorage.getItem(key);
      if (value) {
        allRecords.push({ key, value });
      }
    }
  }
  allRecords.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  console.log(allRecords);
  for (let i = 0; i < allRecords.length; i++) {
    const value = allRecords[i].value;
    numerOfTry += 1;
    let session = JSON.parse(value) as GameSession;
    if (session.results) {
      if (session.results.filter((result) => result.same).length > 0) {
        numerOfWin += 1;
      }
    }
    // find the last last record
    if (lastAnswer === undefined && i === localStorage.length - 2) {
      lastAnswer = session.answer;
    }
  }
  return (
    <div className="max-w-md mx-auto min-h-full flex items-center justify-center bg-white/50">
      <div className="w-11/12 pb-5 bg-white rounded-lg modal-shadow flex flex-col">
        <button
          onClick={onClose}
          className="flex justify-end items-center h-10 pr-3"
        >
          <X></X>
        </button>
        <div>
          <h1 className="text-lg font-bold text-center">统计</h1>
          <div className="flex justify-center gap-20 mt-2">
            <div className="flex flex-col items-center">
              <p className="text-4xl">{numerOfTry}</p>
              <p className="text-center">尝试次数</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl">
                {numerOfTry === 0
                  ? 0
                  : Math.round((numerOfWin / numerOfTry) * 100)}
              </p>
              <p className="text-center">胜率 %</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h1 className="text-lg font-bold text-center">上次尝试答案</h1>
          <h1 className="text-center mt-2">
            {lastAnswer !== undefined ? lastAnswer : "无"}
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          *所有数据均储存在本地，有可能会随着浏览器缓存清空而失效。
        </p>
      </div>
    </div>
  );
};

export default Data;
