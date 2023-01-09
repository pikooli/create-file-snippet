import { PathLike } from "fs";
import { commands, Uri } from "vscode";
import { messages } from "../I18n";
//
export const writeFile = async ({
  filePath,
  content,
}: {
  filePath?: PathLike;
  content: string;
}) => {
  try {
    if (filePath && content) {
      const uriFile = Uri.file(filePath.toString());
      await commands.executeCommand("vscode.open", uriFile);
      commands.executeCommand("editor.action.insertSnippet", {
        snippet: content,
      });
    }
  } catch (e) {
    throw messages.errors.writeFile;
  }
};
