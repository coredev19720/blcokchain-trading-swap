export const errHandling = (e: unknown): string => {
  if (
    e instanceof SyntaxError ||
    e instanceof TypeError ||
    e instanceof Error
  ) {
    return e.message;
  }
  return "Unknown error occurred";
};
