export const convertArrayToObject = <T, K extends keyof T>(array: T[], key: K): { [key: string]: T } => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      //@ts-ignore
      [item[key]]: item,
    };
  }, initialValue);
}
