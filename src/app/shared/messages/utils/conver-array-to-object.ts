export const convertArrayToObject = <T, K extends keyof T>(array: T[], key: K): { [key: string]: T } => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}
