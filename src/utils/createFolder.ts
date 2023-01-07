import { Uri, workspace, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage, showInformationMessage } from "./showMessage";
import { checkIsAFolder, promptName, getCurrentWorkspacePath } from "./index";
import * as path from "path";

//
export const createFolder = async () => {
  const wsPath = getCurrentWorkspacePath();
  try {
    const folderName = await promptName({ type: "folder" });
    if (folderName) {
      const currentPath = path.join(wsPath, folderName);
      const uri = Uri.file(currentPath);
      if (await checkIsAFolder(currentPath)) {
        return showErrorMessage(messages.errors.folderExist);
      }
      await workspace.fs.createDirectory(uri);
      showInformationMessage(messages.success.creatingFolder);
      return uri.path;
    }
  } catch (e) {
    console.log(e);
    showErrorMessage(e as string);
  }
};
