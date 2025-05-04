const MAX_HISTORY_LENGTH = 5;
let counterHistory: number[] = [];
let currentCounter = 0;

export const getCounter = (): number => currentCounter;
export const getCounterHistoy = (): number[] => counterHistory;

export const setCounter = (): void => {
  currentCounter = incrementCounter(currentCounter);
  counterHistory = updateCounterHistory(currentCounter);
};

const incrementCounter = (prevCounter: number): number => prevCounter + 1;

const updateCounterHistory = (counterHistoryEntry: number): number[] => {
  const nextCounterHistory = [...counterHistory];

  if (counterHistory.length >= MAX_HISTORY_LENGTH) nextCounterHistory.shift();

  nextCounterHistory.push(counterHistoryEntry);
  return nextCounterHistory;
};

//testing only
export const resetCounterState = (): void => {
  currentCounter = 0;
  counterHistory = [];
};
