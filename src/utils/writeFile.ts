import { commands, Uri, SnippetString } from "vscode";
import { messages } from "../I18n";

//
export const writeFile = async ({
  filePath,
  content,
}: {
  filePath?: Uri;
  content: SnippetString;
}) => {
  if (filePath && content?.value) {
    try {
      await commands.executeCommand("vscode.open", filePath);
      commands.executeCommand("editor.action.insertSnippet", {
        snippet: content.value,
      });
    } catch (e) {
      throw messages.errors.writeFile;
    }
  }
};
