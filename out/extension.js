"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const fs = require("fs");
const vscode_1 = require("vscode");
const wsPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
const wsedit = new vscode_1.WorkspaceEdit();
const PROMPT = "Enter the path and name of the file you want to create. EI: apps/test.js";
const URI = `${wsPath}/.snippet.json`;
let currentlyOpenTabfilePath = vscode_1.window.activeTextEditor?.document?.fileName.replace(wsPath, "");
let config;
//
const parceConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(URI, "utf8", (err, data) => {
            try {
                config = JSON.parse(data);
                for (let key in config) {
                    config[key].body = new vscode_1.SnippetString(config[key].body.join("\n"));
                }
                resolve(config);
            }
            catch (e) {
                vscode_1.window.showErrorMessage("Something is wrong with the config file");
            }
        });
    });
};
//
const createFile = async ({ filePath, content, }) => {
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await vscode_1.workspace.applyEdit(wsedit);
    await vscode_1.commands.executeCommand("vscode.open", filePath);
    vscode_1.commands.executeCommand("editor.action.insertSnippet", {
        snippet: content.value,
    });
};
//
const main = async () => {
    await parceConfigFile();
    vscode_1.window
        .showInputBox({ prompt: PROMPT, value: currentlyOpenTabfilePath })
        .then(async (value) => {
        if (value && value !== currentlyOpenTabfilePath) {
            const filePath = vscode_1.Uri.file(wsPath + "/" + value);
            console.log("filePath", filePath);
            await createFile({ filePath, content: config["basic"].body });
        }
    });
};
//
function activate(context) {
    let disposable = vscode_1.commands.registerCommand("snippet.helloWorld", main);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map