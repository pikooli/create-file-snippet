import {Uri, commands} from "vscode";
import {createFile, promptName, showInformationMessage} from "../utils";
import {messages} from "../I18n";


//
export const createFileCommand = async () => {
  const fileName = await promptName({type: "file"});
  try {
    const filePath: Uri | undefined = await createFile({fileName});
    await commands.executeCommand("vscode.open", filePath);
    showInformationMessage(messages.success.creatingFile);
  } catch (e) {
  }
};
