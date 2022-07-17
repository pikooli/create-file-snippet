// in progress
export const removeComment = (str: string) => {
  str = str.replace(/\/\/.+/g, "");
  return str;
};
