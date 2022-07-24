import { commands, Uri, SnippetString } from "vscode";
import { messages } from "../I18n";
import { showErrorMessage } from "./showMessage";

//
export const writeSnippet = async ({
  filePath,
  content,
}: {
  filePath: Uri;
  content: SnippetString;
}) => {
  if (filePath && content?.value) {
    try {
      await commands.executeCommand("vscode.open", filePath);
      commands.executeCommand("editor.action.insertSnippet", {
        snippet: content.value,
      });
    } catch (e) {
      showErrorMessage(messages.errors.writeFile);
      throw e;
    }
  }
};
