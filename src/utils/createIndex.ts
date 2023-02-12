import { messages } from "../I18n";
import { Uri, workspace, WorkspaceEdit } from "vscode";
import * as path from "path";

export const createIndex = async (oldFilePath: string) => {
  const wsedit = new WorkspaceEdit();

  if (!oldFilePath) {
    throw messages.errors.creatingFile;
  }

  const newFilePath = path.join(
    oldFilePath.split("/").slice(0, -1).join("/"),
    "index.ts"
  );

  const oldFileUri = Uri.file(oldFilePath);
  const newFileUri = Uri.file(newFilePath);
  wsedit.renameFile(oldFileUri, newFileUri);
  await workspace.applyEdit(wsedit);
  return newFilePath;
};
