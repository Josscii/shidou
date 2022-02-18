import * as pinyin from "pinyin";
import { Optional } from "./Helpers";
import { Poem, POEMS } from "./Poem";

export interface WorkResult {
  include: boolean;
  same: boolean;
  sameAuthor?: boolean;
  samePoem?: boolean;
  sameYunmu?: boolean;
}

export function work(
  poem: Poem,
  answer: string,
  guess: string
): Optional<WorkResult> {
  if (answer.length !== guess.length) {
    return;
  }
  if (answer === guess) {
    return { include: true, same: true };
  }

  const filtered = POEMS.filter((poem) => poem.content.includes(guess));
  if (filtered.length === 0) {
    return { include: false, same: false };
  }

  const first = filtered[0];

  console.log(first);

  let workResult: WorkResult = { include: true, same: false };
  workResult.sameAuthor = first.author === poem.author;
  workResult.samePoem = first.content === poem.content;

  const answerLastWord = answer[answer.length - 1];
  const answerLastWordYunmu = getWordYunmu(answerLastWord);

  console.log("answerLastWordYunmu:" + answerLastWordYunmu);

  const guessLastWord = guess[guess.length - 1];
  const guessLastWordYunmu = getWordYunmu(guessLastWord);

  console.log("guessLastWordYunmu:" + guessLastWordYunmu);

  workResult.sameYunmu = answerLastWordYunmu === guessLastWordYunmu;

  console.log(workResult);

  return workResult;
}

function getWordYunmu(word: string): Optional<string> {
  const w_pinyin = pinyin(word, {
    style: pinyin.STYLE_TO3NE,
  })[0][0];
  console.log("pinyin:" + w_pinyin);
  const match = w_pinyin.match(/\d/g);
  if (match) {
    const first = match[0];
    const index = w_pinyin.indexOf(first);
    return w_pinyin.replace(first, "").substring(index - 1);
  }
}
