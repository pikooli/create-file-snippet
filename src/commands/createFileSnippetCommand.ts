import { SnippetString, workspace } from "vscode";
import {
  parceSnippets,
  createFile,
  selectOption,
  showInformationMessage,
  writeFile,
  showErrorMessage,
  promptName,
} from "../utils";
import { Config } from "../type";
import { messages } from "../I18n";
import { CONFIG_FILE } from "../constant";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const SNIPPETS_PATH = wsPath + "/" + CONFIG_FILE;

//
export const createFileSnippetCommand = async () => {
  let config: Config;
  try {
    config = await parceSnippets(SNIPPETS_PATH);
    const option = await selectOption(config);
    if (option) {
      const fileName = await promptName({ type: "file" });
      const filePath = await createFile(fileName);
      writeFile({ filePath, content: option.body as SnippetString });
      showInformationMessage(messages.success.creatingFileSnippet);
    }
  } catch (e) {
    return showErrorMessage(e as string);
  }
};
