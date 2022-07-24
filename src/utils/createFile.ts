import { window, Uri, workspace, WorkspaceEdit, FileType } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";
import { checkFileFolder } from "./index";

const PROMPT =
  "Enter the path and name of the file you want to create. EI: apps/test.js";
const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

//
export const createFile = async ({ wsedit }: { wsedit: WorkspaceEdit }) => {
  const currentlyOpenTabfilePath =
    window.activeTextEditor?.document?.fileName.replace(wsPath, "");
  const fileName = await window.showInputBox({
    prompt: PROMPT,
    value: currentlyOpenTabfilePath,
  });

  if (fileName && fileName !== currentlyOpenTabfilePath) {
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
  }
};
