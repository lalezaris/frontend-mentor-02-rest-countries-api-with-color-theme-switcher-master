export const debounce = (func: (...args: any[]) => any, timeout: number) => {
  let currentTimeout: NodeJS.Timeout;

  return (args: any) => {
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
      func(args);
    }, timeout);
  };
};

export const formatNumber = (number: number) => {
  return Intl.NumberFormat("en-US").format(number);
};
