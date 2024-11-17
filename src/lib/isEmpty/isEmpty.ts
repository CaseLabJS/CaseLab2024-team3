export const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object' && obj.constructor === Object) {
    return Object.entries(obj).length === 0;
  }
  return false;
};
