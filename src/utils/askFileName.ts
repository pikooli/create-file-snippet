import { window, workspace } from "vscode";
import { messages } from "../I18n";

const PROMPT =
  "Enter the path and name of the file you want to create. EI: apps/test.js";

// gets the path of the first workspace folder
const wsPath = workspace.workspaceFolders![0].uri.fsPath;

export const askFileName = async () => {
  const currentlyOpenTabfilePath =
    window.activeTextEditor?.document?.fileName.replace(wsPath, "");
  const fileName = await window.showInputBox({
    prompt: PROMPT,
    value: currentlyOpenTabfilePath,
  });

  if (!fileName && fileName === currentlyOpenTabfilePath) {
    throw messages.errors.fileName;
  }
  return fileName;
};
