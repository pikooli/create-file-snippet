import { SnippetString, workspace, WorkspaceEdit, Uri } from "vscode";
import {
  parceSnippets,
  createFile,
  selectOption,
  showInformationMessage,
  writeSnippet,
  showErrorMessage,
  askFileName,
} from "../utils";
import { Config } from "../type";
import { messages } from "../I18n";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const wsedit = new WorkspaceEdit();

// const homePath = wsPath.split("/").slice(0, 3).join("/");
// const SNIPPETS_PATH = `${homePath}/Library/Application Support/Code/User/snippets/snippet.code-snippets`;
const SNIPPETS_PATH = `${wsPath}/.snippets.json`;

//
export const createFileSnippetCommand = async () => {
  let config: Config;
  try {
    config = await parceSnippets(SNIPPETS_PATH);
  } catch (e) {
    return showErrorMessage(e as string);
  }
  const option = await selectOption(config);
  if (option) {
    try {
      const fileName = await askFileName();
      const filePath: Uri | undefined = await createFile({
        wsedit,
        fileName,
      });
      if (filePath) {
        writeSnippet({ filePath, content: option.body as SnippetString });
      }
      showInformationMessage(messages.success.creatingFileSnippet);
    } catch (e) {}
  }
};
