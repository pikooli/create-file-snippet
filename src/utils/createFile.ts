import { Uri, workspace, WorkspaceEdit } from "vscode";
import { messages } from "../I18n";
import { checkIsAFile, getCurrentWorkspacePath } from "./index";
import * as path from "path";
export const createFile = async ({ fileName }: { fileName?: string }) => {
  const wsPath = getCurrentWorkspacePath();

  if (!fileName) {
    throw messages.errors.creatingFile;
  }
  const wsedit = new WorkspaceEdit();
  const currentPath = path.join(wsPath, fileName);
  const filePath = Uri.file(currentPath);
  if (await checkIsAFile(currentPath)) {
    return;
  }

  try {
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await workspace.applyEdit(wsedit);
    return filePath;
  } catch (e) {
    return;
  }
};
