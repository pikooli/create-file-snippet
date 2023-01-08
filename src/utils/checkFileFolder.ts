import * as fs from "fs";

export const checkIsAFile = async (path: fs.PathLike) => {
  try {
    const stat = fs.statSync(path);
    return stat.isFile();
  } catch (e) {
    return false;
  }
};

export const checkIsAFolder = async (path: fs.PathLike) => {
  try {
    const stat = fs.statSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};
