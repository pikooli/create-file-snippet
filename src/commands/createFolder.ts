import { createFolder } from "../utils";

//
export const createFolderCommand = async () => {
  try {
    await createFolder();
  } catch (e) {}
};
