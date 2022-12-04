import { Uri, workspace, FileType } from "vscode";

export const checkFileFolder = async (
  uri: Uri,
  format: FileType.Directory | FileType.File
) => {
  let stat;
  try {
    stat = await workspace.fs.stat(uri);
  } catch (e) {
    return false;
  }
  return stat?.type === format;
};
