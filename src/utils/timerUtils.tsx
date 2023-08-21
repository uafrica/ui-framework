const intervals: { [key: string]: number } = {};

function setIntervalAccurately(
  name: string,
  functionToCall: Function,
  intervalInMs: number,
  executeImmediately: Boolean = false
): ReturnType<typeof setTimeout> {
  if (executeImmediately) {
    functionToCall();
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    let lastExecutedTime: number = 0;

    // cache last executed time in memory
    if (intervals[name]) {
      lastExecutedTime = intervals[name];
    } else {
      lastExecutedTime = parseInt(localStorage.getItem(`interval-${name}`) || "0");
    }

    // initialize values
    if (!lastExecutedTime) {
      lastExecutedTime = now;
      intervals[name] = now;
      localStorage.setItem(`interval-${name}`, `${lastExecutedTime}`);
    }

    // if enough time passed, execute the function and update last execution time
    if (now >= lastExecutedTime + intervalInMs) {
      localStorage.setItem(`interval-${name}`, `${now}`);
      intervals[name] = now;
      functionToCall();
    }
  }, 1 * 1000); // 1 second

  return interval;
}

export { setIntervalAccurately };
