import { Uri, workspace, FileType } from "vscode";

export const checkFileFolder = async (
  uri: Uri,
  format: FileType.Directory | FileType.File
) => {
  try {
    return (await workspace.fs.stat(uri)).type === format;
  } catch (e) {
    throw e;
  }
};
