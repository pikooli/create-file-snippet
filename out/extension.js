"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const utils_1 = require("./utils");
const vscode_1 = require("vscode");
const EXTENSION_NAME = "snippet.file_snippet";
const wsPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
const homePath = wsPath.split("/").slice(0, 3).join("/");
const SNIPPETS_PATH = `${homePath}/Library/Application\ Support/Code/User/snippets/snippet.code-snippets`;
const wsedit = new vscode_1.WorkspaceEdit();
//
const main = async () => {
    let config;
    config = await (0, utils_1.parceConfigFile)(SNIPPETS_PATH);
    const option = await (0, utils_1.selectOption)(config);
    if (option) {
        await (0, utils_1.createFile)({
            wsedit,
            content: option.body,
        });
    }
};
//
function activate(context) {
    let disposable = vscode_1.commands.registerCommand(EXTENSION_NAME, main);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map