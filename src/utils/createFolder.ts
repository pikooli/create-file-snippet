import { Uri, workspace, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";
import { checkFileFolder, promptName, getCurrentWorkspacePath } from "./index";

//
export const createFolder = async () => {
  const wsPath = getCurrentWorkspacePath();
  try {
    const folderName = await promptName({ type: "folder" });
    if (folderName) {
      const uri = Uri.file(wsPath + "/" + folderName);
      if (await checkFileFolder({ uri, type: FileType.Directory })) {
        return showErrorMessage(messages.errors.folderExist);
      }
      await workspace.fs.createDirectory(uri);
    }
  } catch (e) {
    showErrorMessage(e as string);
  }
};
