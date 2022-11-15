import { window, workspace } from "vscode";
import { messages } from "../I18n";

const PROMPT_FILE =
  "Enter the path and name of the file you want to create. EI: apps/test.js";
const PROMPT_FOLDER =
  "Enter the path and name of the folder you want to create. EI: apps/services";
// gets the path of the first workspace folder
const wsPath = workspace.workspaceFolders![0].uri.fsPath;

interface Props {
  type: "folder" | "file";
}

export const promptName = async ({ type }: Props) => {
  const currentlyOpenTabfilePath =
    window.activeTextEditor?.document?.fileName.replace(wsPath, "");
  const fileName = await window.showInputBox({
    prompt: type === "file" ? PROMPT_FILE : PROMPT_FOLDER,
    value: currentlyOpenTabfilePath,
  });

  if (!fileName && fileName === currentlyOpenTabfilePath) {
    throw messages.errors.fileName;
  }
  return fileName;
};
