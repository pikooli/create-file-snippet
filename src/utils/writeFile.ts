import { PathLike } from "fs";
import { commands, SnippetString, Uri } from "vscode";
import { messages } from "../I18n";
//
export const writeFile = async ({
  filePath,
  content,
}: {
  filePath?: PathLike;
  content: SnippetString;
}) => {
  try {
    if (filePath && content?.value) {
      const uriFile = Uri.file(filePath.toString());
      await commands.executeCommand("vscode.open", uriFile);
      commands.executeCommand("editor.action.insertSnippet", {
        snippet: content.value,
      });
    }
  } catch (e) {
    throw messages.errors.writeFile;
  }
};
