import { SnippetString, workspace, WorkspaceEdit, Uri } from "vscode";
import {
  parceSnippetsArray,
  createFile,
  selectOptionArray,
  showInformationMessage,
  writeSnippet,
  showErrorMessage,
  askFileName,
} from "../utils";
import { ArrayConfig } from "../type";
import { messages } from "../I18n";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const wsedit = new WorkspaceEdit();

// const homePath = wsPath.split("/").slice(0, 3).join("/");
// const SNIPPETS_PATH = `${homePath}/Library/Application Support/Code/User/snippets/snippet.code-snippets`;
const SNIPPETS_PATH = `${wsPath}/.snippets.json`;

//
export const createFilesSnippetsCommand = async () => {
  let config: ArrayConfig;
  try {
    config = await parceSnippetsArray(SNIPPETS_PATH);
  } catch (e) {
    return showErrorMessage(e as string);
  }
  const option = await selectOptionArray(config);
  if (option) {
    try {
      const fileName = await askFileName();
      for (let i = 0; i < option.bodys.length; i++) {
        const el = option.bodys[i];
        const filePath: Uri | undefined = await createFile({
          wsedit,
          fileName: el.prefix + fileName + el.suffix,
        });
        if (filePath) {
          writeSnippet({ filePath, content: el.body as SnippetString });
        }
      }
      showInformationMessage(messages.success.creatingFileSnippet);
    } catch (e) {}
  }
};
