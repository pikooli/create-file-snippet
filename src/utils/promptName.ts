import { window, workspace } from "vscode";
import { messages } from "../I18n";
import { getCurrentWorkspacePath } from "./";

const PROMPT_FILE =
  "Enter the path and name of the file you want to create. EI: apps/test.js";
const PROMPT_FOLDER =
  "Enter the path and name of the folder you want to create. EI: apps/services";

interface Props {
  type: "folder" | "file";
}

export const promptName = async ({ type }: Props) => {
  const wsPath = getCurrentWorkspacePath();
  const currentlyOpenTabfilePath =
    window?.activeTextEditor?.document?.fileName?.replace(wsPath, "");
  const fileName = await window.showInputBox({
    prompt: type === "file" ? PROMPT_FILE : PROMPT_FOLDER,
    value: currentlyOpenTabfilePath,
  });

  if (!fileName && fileName === currentlyOpenTabfilePath) {
    throw messages.errors.fileName;
  }
  return fileName;
};
