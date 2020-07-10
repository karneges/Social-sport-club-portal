export const convertArrayToObject = <T>(array: T[], key): { [key: string]: T } => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}
