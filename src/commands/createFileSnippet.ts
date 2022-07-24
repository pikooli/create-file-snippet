import { SnippetString, workspace, WorkspaceEdit, Uri } from "vscode";
import {
  parceConfigFile,
  createFile,
  selectOption,
  showInformationMessage,
  writeSnippet,
} from "../utils";
import { Config } from "../type";
import { messages } from "../I18n";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const homePath = wsPath.split("/").slice(0, 3).join("/");
const SNIPPETS_PATH = `${homePath}/Library/Application\ Support/Code/User/snippets/snippet.code-snippets`;
const wsedit = new WorkspaceEdit();

//
export const createFileSnippetCommand = async () => {
  let config: Config;
  config = await parceConfigFile(SNIPPETS_PATH);
  const option = await selectOption(config);
  if (option) {
    try {
      const filePath: Uri | undefined = await createFile({
        wsedit,
      });
      if (filePath) {
        writeSnippet({ filePath, content: option.body as SnippetString });
      }
      showInformationMessage(messages.success.creatingFileSnippet);
    } catch (e) {}
  }
};
