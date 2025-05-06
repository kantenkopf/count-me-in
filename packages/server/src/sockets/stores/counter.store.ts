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

//only for the deployed publicly available version. Should not invoke when running locally dev/prod.
//this is a last minute addition, as a testable and deployed failsafe.
//ignore when checking for the actual implementation of the code challenge.
if (process.env.DEPLOYED === 'true') {
  ((): void => {
    console.log('Counter reset interval started (every 30 minutes).');
    setInterval(() => {
      console.log('Resetting counter state...');
      resetCounterState();
    }, 30 * 60 * 1000);
  })();
}