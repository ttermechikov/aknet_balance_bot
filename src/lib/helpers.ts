export const isValidNumber = (value: number | string) => {
  let number;

  if (typeof value === 'number') {
    number = value;
  } else {
    number = parseInt(value, 10);
  }

  return !Number.isNaN(number);
};
