import { Uri, workspace, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";
import { checkFileFolder, promptName } from "./index";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

//
export const createFolder = async () => {
  try {
    const folderName = await promptName({ type: "folder" });
    if (folderName) {
      const uri = Uri.file(wsPath + "/" + folderName);
      if (await checkFileFolder(uri, FileType.Directory)) {
        return showErrorMessage(messages.errors.folderExist);
      }
      await workspace.fs.createDirectory(uri);
    }
  } catch (e) {
    showErrorMessage(e as string);
  }
};
