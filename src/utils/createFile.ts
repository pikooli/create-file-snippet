import { Uri, workspace, WorkspaceEdit, FileType } from "vscode";
import { messages } from "../I18n";
import { checkFileFolder, getCurrentWorkspacePath } from "./index";

export const createFile = async ({ fileName }: { fileName?: string }) => {
  const wsPath = getCurrentWorkspacePath();

  if (!fileName) {
    throw messages.errors.creatingFile;
  }
  const wsedit = new WorkspaceEdit();

  const filePath = Uri.file(wsPath + "/" + fileName);
  if (await checkFileFolder(filePath, FileType.File)) {
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
