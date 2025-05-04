import {
  getCounter,
  getCounterHistoy,
  resetCounterState,
  setCounter,
} from '@/sockets/stores/counter.store';

describe('Counter Store', () => {
  beforeEach(() => {
    resetCounterState();
  });

  test('should initialize counter to 0', () => {
    expect(getCounter()).toBe(0);
  });

  test('should increment the counter', () => {
    setCounter();
    expect(getCounter()).toBe(1);

    setCounter();
    expect(getCounter()).toBe(2);
  });

  test('should update counter history', () => {
    setCounter();
    setCounter();
    setCounter();

    expect(getCounterHistoy()).toEqual([1, 2, 3]);
  });

  test('should not exceed max history length', () => {
    for (let i = 0; i < 7; i++) {
      setCounter();
    }

    expect(getCounterHistoy()).toEqual([3, 4, 5, 6, 7]);
  });

  test('should correctly handle history when counter is reset', () => {
    setCounter();
    setCounter();
    expect(getCounterHistoy()).toEqual([1, 2]);

    resetCounterState();
    expect(getCounter()).toBe(0);
    expect(getCounterHistoy()).toEqual([]);
  });
});
