import { messages } from "../I18n";
import { Uri, workspace, WorkspaceEdit } from "vscode";
import { checkIsAFile, getCurrentWorkspacePath } from "./index";
import * as path from "path";
import * as fs from "fs";

export const createFile = async (filePath: string) => {
  const wsPath = getCurrentWorkspacePath();
  const wsedit = new WorkspaceEdit();

  if (!filePath) {
    throw messages.errors.creatingFile;
  }
  const completeFilePath = path.join(wsPath, filePath);
  const directoryPath = completeFilePath.split("/").slice(0, -1).join("/");
  if (await checkIsAFile(completeFilePath)) {
    throw messages.errors.fileAlreadyExist;
  }
  const fileUri = Uri.file(completeFilePath);
  fs.mkdirSync(directoryPath, { recursive: true });
  fs.appendFileSync(completeFilePath, "");
  wsedit.createFile(fileUri);
  await workspace.applyEdit(wsedit);
  return completeFilePath;
};
