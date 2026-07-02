import { describe, it, expect } from 'vitest';
import { hashStringToSeed, createSeededRandom, randomInRange } from './seededRandom';

describe('hashStringToSeed', () => {
  it('produces the same hash for the same string', () => {
    expect(hashStringToSeed('a marketplace for bikes')).toBe(hashStringToSeed('a marketplace for bikes'));
  });

  it('produces different hashes for different strings', () => {
    expect(hashStringToSeed('idea one')).not.toBe(hashStringToSeed('idea two'));
  });
});

describe('createSeededRandom', () => {
  it('produces the same sequence for the same seed', () => {
    const randA = createSeededRandom(42);
    const randB = createSeededRandom(42);
    const sequenceA = [randA(), randA(), randA()];
    const sequenceB = [randB(), randB(), randB()];
    expect(sequenceA).toEqual(sequenceB);
  });

  it('produces different first values for different seeds', () => {
    const randA = createSeededRandom(1);
    const randB = createSeededRandom(999);
    expect(randA()).not.toBe(randB());
  });

  it('does not collide seed 0 with seed 1', () => {
    const randZero = createSeededRandom(0);
    const randOne = createSeededRandom(1);
    expect(randZero()).not.toBe(randOne());
  });
});

describe('randomInRange', () => {
  it('returns a value within the inclusive range', () => {
    const rand = createSeededRandom(7);
    for (let i = 0; i < 20; i++) {
      const value = randomInRange(rand, 10, 20);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(20);
    }
  });
});
