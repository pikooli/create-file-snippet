import { window, Uri, workspace, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";
import { checkFileFolder } from "./index";

const PROMPT =
  "Enter the path and name of the folder you want to create. EI: apps/services";
const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

//
export const createFolder = async () => {
  const currentlyOpenTabfilePath =
    window.activeTextEditor?.document?.fileName.replace(wsPath, "");
  const folderName = await window.showInputBox({
    prompt: PROMPT,
    value: currentlyOpenTabfilePath,
  });

  if (folderName && folderName !== currentlyOpenTabfilePath) {
    const uri = Uri.file(wsPath + "/" + folderName);
    try {
      if (await checkFileFolder(uri, FileType.Directory)) {
        return showErrorMessage(messages.errors.folderExist);
      }
      await workspace.fs.createDirectory(uri);
    } catch (e) {
      showErrorMessage(`${e}`);
    }
  }
};
