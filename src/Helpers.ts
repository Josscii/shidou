import { POEMS } from "./Poem";

export function helpOpenGuess(length: number): string {
  const result =
    POEMS[Math.floor(Math.random() * POEMS.length)].quote.split("，")[0];
  if (result.length === length) {
    return result;
  }
  return helpOpenGuess(length);
}

export type Optional<T> = T | undefined;
