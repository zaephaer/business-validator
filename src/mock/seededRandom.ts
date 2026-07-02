export function hashStringToSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

export function createSeededRandom(seed: number): () => number {
  let state = seed;
  return function next(): number {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function randomInRange(rand: () => number, min: number, max: number): number {
  return Math.round(min + rand() * (max - min));
}
