export function calculateDiff<T>(original: T, updated: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in updated) {
    if (Object.prototype.hasOwnProperty.call(updated, key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (Array.isArray(originalValue) && Array.isArray(updatedValue)) {
        if (originalValue.length !== updatedValue.length) {
          result[key] = updatedValue;
        }
      } else if (
        typeof originalValue === 'object' &&
        originalValue !== null &&
        typeof updatedValue === 'object' &&
        updatedValue !== null
      ) {
        const nestedDiff = calculateDiff(originalValue, updatedValue);
        if (Object.keys(nestedDiff).length > 0) {
          result[key] = nestedDiff as unknown as T[Extract<keyof T, string>];
        }
      } else if (originalValue !== updatedValue) {
        result[key] = updatedValue;
      }
    }
  }

  return result;
}
