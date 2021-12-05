export const compare = (a: string, b: string) => {
  if (a.toString() > b.toString()) {
    return 1;
  }

  if (a.toString() < b.toString()) {
    return -1;
  }

  return 0;
};
