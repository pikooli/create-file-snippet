import { SnippetString, workspace, WorkspaceEdit, Uri } from "vscode";
import {
  parceSnippetsArray,
  createFile,
  selectOptionArray,
  showInformationMessage,
  writeFile,
  showErrorMessage,
  promptName,
} from "../utils";
import { ArrayConfig } from "../type";
import { messages } from "../I18n";
import { CONFIG_FILE } from "../constant";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const wsedit = new WorkspaceEdit();
const SNIPPETS_PATH = wsPath + "/" + CONFIG_FILE;

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
      const fileName = await promptName({ type: "file" });
      for (let i = 0; i < option.bodys.length; i++) {
        const el = option.bodys[i];
        const filePath: Uri | undefined = await createFile({
          wsedit,
          fileName: el.prefix + fileName + el.suffix,
        });
        if (filePath) {
          writeFile({ filePath, content: el.body as SnippetString });
        }
      }
      showInformationMessage(messages.success.creatingFileSnippet);
    } catch (e) {
      return showErrorMessage(e as string);
    }
  }
};
