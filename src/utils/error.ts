export const errHandling = (e: unknown): string => {
  console.log(e instanceof Error);
  console.log(e instanceof SyntaxError);
  console.log(e instanceof TypeError);

  if (
    e instanceof SyntaxError ||
    e instanceof TypeError ||
    e instanceof Error
  ) {
    return e.message;
  }
  return "Unknown error occurred";
};
