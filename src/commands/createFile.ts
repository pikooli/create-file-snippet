import { WorkspaceEdit, Uri, commands } from "vscode";
import { createFile, showInformationMessage } from "../utils";
import { messages } from "../I18n";

const wsedit = new WorkspaceEdit();

//
export const createFileCommand = async () => {
  try {
    const filePath: Uri | undefined = await createFile({
      wsedit,
    });
    await commands.executeCommand("vscode.open", filePath);
    showInformationMessage(messages.success.creatingFile);
  } catch (e) {}
};
