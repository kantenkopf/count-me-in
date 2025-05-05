import {
  resetCounterState,
  getCounter,
  setCounter,
  getCounterHistoy,
} from 'src/sockets/stores/counter.store';

describe('When counter store is invoked', () => {
  beforeEach(() => {
    resetCounterState();
  });

  it('should initialize counter to 0', () => {
    expect(getCounter()).toBe(0);
  });

  it('should increment the counter when setCounter is called', () => {
    setCounter();
    expect(getCounter()).toBe(1);

    setCounter();
    expect(getCounter()).toBe(2);
  });

  it('should update counter history when the currentCounter is incremented', () => {
    setCounter();
    setCounter();
    setCounter();

    expect(getCounterHistoy()).toEqual([1, 2, 3]);
  });

  it('counterHistory should not exceed the max history limit', () => {
    for (let i = 0; i < 7; i++) {
      setCounter();
    }

    expect(getCounterHistoy()).toEqual([3, 4, 5, 6, 7]);
  });

  it('should correctly handle history when counter is reset', () => {
    setCounter();
    setCounter();
    expect(getCounterHistoy()).toEqual([1, 2]);

    resetCounterState();
    expect(getCounter()).toBe(0);
    expect(getCounterHistoy()).toEqual([]);
  });
});
