import * as fs from "fs";

export const checkIsAFile = async (path: fs.PathLike) => {
  let stat;
  try {
    stat = fs.statSync(path);
  } catch (e) {
    return false;
  }
  return stat.isFile();
};

export const checkIsAFolder = async (path: fs.PathLike) => {
  let stat;
  try {
    stat = fs.statSync(path);
  } catch (e) {
    return false;
  }
  return stat.isDirectory();
};
