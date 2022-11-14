import { Uri, workspace, WorkspaceEdit, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";
import { checkFileFolder } from "./index";

const PROMPT =
  "Enter the path and name of the file you want to create. EI: apps/test.js";

// gets the path of the first workspace folder
const wsPath = workspace.workspaceFolders![0].uri.fsPath;

export const createFile = async ({
  wsedit,
  fileName,
}: {
  wsedit: WorkspaceEdit;
  fileName?: string;
}) => {
  try {
    const filePath = Uri.file(wsPath + "/" + fileName);
    if (await checkFileFolder(filePath, FileType.File)) {
      throw messages.errors.creatingFile;
    }
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await workspace.applyEdit(wsedit);
    return filePath;
  } catch (e) {
    showErrorMessage(messages.errors.creatingFile);
    throw e;
  }
};