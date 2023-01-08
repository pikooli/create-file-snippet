import { SnippetString, workspace, Uri } from "vscode";
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
const SNIPPETS_PATH = wsPath + "/" + CONFIG_FILE;

//
export const createFilesSnippetsCommand = async () => {
  let config: ArrayConfig;
  try {
    config = await parceSnippetsArray(SNIPPETS_PATH);

    const option = await selectOptionArray(config);
    if (option) {
      const fileName = await promptName({ type: "file" });
      for (let i = 0; i < option.bodys.length; i++) {
        const el = option.bodys[i];
        const fileParam = (el.prefix ?? "") + fileName + (el.suffix ?? "");
        const filePath = await createFile(fileParam);
        writeFile({ filePath, content: el.body as SnippetString });
        showInformationMessage(messages.success.creatingFileSnippet);
      }
    }
  } catch (e) {
    return showErrorMessage(e as string);
  }
};
