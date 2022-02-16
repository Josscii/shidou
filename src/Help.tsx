import { FunctionComponent } from "react";
import { X } from "react-feather";

const Help: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="max-w-md mx-auto min-h-full flex flex-col gap-4 p-2 bg-white/95">
      <button onClick={onClose} className="flex justify-end items-center h-10">
        <X></X>
      </button>
      <h1 className="text-xl font-bold">游戏规则</h1>
      <p>
        每天会有一句唐诗三百首里的诗句供你猜测，一共有6次机会。横向的格子数代表待猜测的诗句的字数（五言或七言）。提交诗句后，背景颜色代表不同的提示信息。
      </p>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-slate-300 text-white grid place-content-center">
          会
        </div>
        <p>代表毫不相关，再碰碰运气吧……</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-yellow-400 text-white grid place-content-center">
          当
        </div>
        <p>代表韵脚相同，试着想想韵脚一样的诗句。</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-green-200 text-white grid place-content-center">
          凌
        </div>
        <p>代表作者相同，范围缩小了！</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-green-400 text-white grid place-content-center">
          绝
        </div>
        <p>代表是同一首诗，答案呼之欲出～</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-green-600 text-white grid place-content-center">
          顶
        </div>
        <p>代表有同样的字，全变绿就成功了！！</p>
      </div>
      <p>开始游玩吧。</p>
      <p className="mt-auto text-center text-slate-400 italic">
        A{" "}
        <a
          className="not-italic"
          href="https://www.nytimes.com/games/wordle/index.html"
        >
          Wordle
        </a>{" "}
        variant, made with ❤️ by{" "}
        <a className="not-italic" href="https://github.com/Josscii">
          Josscii
        </a>
        .
      </p>
    </div>
  );
};

export default Help;
