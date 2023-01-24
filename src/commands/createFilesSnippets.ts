import { SnippetString, workspace } from "vscode";
import {
  parceSnippetsArray,
  createFile,
  selectOptionArray,
  showInformationMessage,
  writeFile,
  showErrorMessage,
  promptName,
  selectMultipleSnippetFile,
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
      const filesIndex = await selectMultipleSnippetFile(option);
      const fileName = await promptName({ type: "file" });
      const bodys = option.bodys.filter((_option, idx) => {
        return filesIndex?.includes(idx);
      });
      if (bodys?.length) {
        for (let i = 0; i < bodys.length; i++) {
          const el = bodys[i];
          const fileParam = (el.prefix ?? "") + fileName + (el.suffix ?? "");
          const filePath = await createFile(fileParam);
          writeFile({ filePath, content: (el.body as SnippetString).value });
          showInformationMessage(messages.success.creatingFileSnippet);
        }
      }
    }
  } catch (e) {
    return showErrorMessage(e as string);
  }
};
