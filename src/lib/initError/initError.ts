import { errorHandler } from './error';

export const initError = () => {
  console.error = errorHandler;
};
