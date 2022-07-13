import * as fs from "fs";
import {
  commands,
  ExtensionContext,
  Uri,
  SnippetString,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";

const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
const homePath = wsPath.split("/").slice(0, 3).join("/");
const SNIPPETS_PATH = `${homePath}/Library/Application\ Support/Code/User/snippets/snippet.code-snippets`;
const wsedit = new WorkspaceEdit();
const PROMPT =
  "Enter the path and name of the file you want to create. EI: apps/test.js";

let currentlyOpenTabfilePath =
  window.activeTextEditor?.document?.fileName.replace(wsPath, "");
let config: any;

// in progress
const removeComment = (str: string) => {
  str = str.replace(/\/\/.+/g, "");
  return str;
};

//
const parceConfigFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(SNIPPETS_PATH, "utf8", (err, data) => {
      if (err) console.log(err);
      try {
        config = JSON.parse(data);
        for (let key in config) {
          config[key].body = new SnippetString(config[key].body.join("\n"));
        }
        resolve(config);
      } catch (e) {
        console.log(e);
        window.showErrorMessage("Something is wrong with the config file");
      }
    });
  });
};

//
const createFile = async ({
  filePath,
  content,
}: {
  filePath: Uri;
  content: SnippetString;
}) => {
  wsedit.createFile(filePath, { ignoreIfExists: true });
  await workspace.applyEdit(wsedit);
  await commands.executeCommand("vscode.open", filePath);
  commands.executeCommand("editor.action.insertSnippet", {
    snippet: content.value,
  });
};

//
const main = async () => {
  await parceConfigFile();
  window
    .showInputBox({ prompt: PROMPT, value: currentlyOpenTabfilePath })
    .then(async (value) => {
      if (value && value !== currentlyOpenTabfilePath) {
        const filePath = Uri.file(wsPath + "/" + value);
        await createFile({ filePath, content: config["basic"].body });
      }
    });
};

//
export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand("snippet.helloWorld", main);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
