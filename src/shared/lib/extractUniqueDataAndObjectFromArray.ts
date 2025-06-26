export const extractUniqueDataAndObjectFromArray = <T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  key: K
): { extractedObject: Record<T[K], T[]>, unique: string[]} => {
  const result = {} as Record<T[K], T[]>;
  const unique = [];

  arr.forEach((item) => {
    const keyValue = item[key];
    if (!result[keyValue]) {
      unique.push(keyValue);
      result[keyValue] = [];
    }
    result[keyValue].push(item);
  });

  return { extractedObject: result, unique };
};