const originalError = console.error.bind(console);
export const errorHandler = (...rest: unknown[]) => {
  const warningMessage = typeof rest[0] === 'string' ? rest[0] : '';

  const isErrorValidateDOMNesting =
    (warningMessage.startsWith('Warning: validateDOMNesting') &&
      rest[1] === '<a>' &&
      rest[2] === 'tbody') ||
    (rest[1] === '<tr>' && rest[2] === 'a');

  const isErrorValidateDOMNesting2 =
    (warningMessage.startsWith('Warning: validateDOMNesting') &&
      rest[1] === '<td>' &&
      rest[2] === 'a') ||
    (rest[1] === '<tr>' && rest[2] === 'div');

  if (isErrorValidateDOMNesting || isErrorValidateDOMNesting2) return;

  originalError(...rest);
};
