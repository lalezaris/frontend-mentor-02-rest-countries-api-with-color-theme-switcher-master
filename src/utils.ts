export const debounce = (func: (...args: any[]) => any, timeout: number) => {
  let currentTimeout: NodeJS.Timeout | undefined;

  return (args: any) => {
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
      func(args);
    }, timeout);
  };
};
