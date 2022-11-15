import { Uri, workspace, WorkspaceEdit, FileType } from "vscode";
import { messages } from "../I18n";
import { checkFileFolder } from "./index";

// gets the path of the first workspace folder
const wsPath = workspace.workspaceFolders![0].uri.fsPath;

export const createFile = async ({
  wsedit,
  fileName,
}: {
  wsedit: WorkspaceEdit;
  fileName?: string;
}) => {
  if (!fileName) {
    throw messages.errors.creatingFile;
  }
  try {
    const filePath = Uri.file(wsPath + "/" + fileName);
    if (await checkFileFolder(filePath, FileType.File)) {
      throw messages.errors.creatingFile;
    }
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await workspace.applyEdit(wsedit);
    return filePath;
  } catch (e) {
    throw messages.errors.creatingFile;
  }
};
