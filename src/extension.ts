import { parceConfigFile, createFile, selectOption } from "./utils";
import { Config } from "./type";
import {
  commands,
  ExtensionContext,
  SnippetString,
  workspace,
  WorkspaceEdit,
} from "vscode";

const EXTENSION_NAME = "snippet.file_snippet";
const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const homePath = wsPath.split("/").slice(0, 3).join("/");
const SNIPPETS_PATH = `${homePath}/Library/Application\ Support/Code/User/snippets/snippet.code-snippets`;
const wsedit = new WorkspaceEdit();

//
const main = async () => {
  let config: Config;
  config = await parceConfigFile(SNIPPETS_PATH);
  const option = await selectOption(config);
  if (option) {
    await createFile({
      wsedit,
      content: option.body as SnippetString,
    });
  }
};

//
export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(EXTENSION_NAME, main);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
