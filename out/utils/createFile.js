"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const vscode_1 = require("vscode");
const PROMPT = "Enter the path and name of the file you want to create. EI: apps/test.js";
const wsPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
const currentlyOpenTabfilePath = vscode_1.window.activeTextEditor?.document?.fileName.replace(wsPath, "");
//
const createFile = async ({ wsedit, content, }) => {
    const fileName = await vscode_1.window.showInputBox({
        prompt: PROMPT,
        value: currentlyOpenTabfilePath,
    });
    if (fileName && fileName !== currentlyOpenTabfilePath && content?.value) {
        const filePath = vscode_1.Uri.file(wsPath + "/" + fileName);
        wsedit.createFile(filePath, { ignoreIfExists: true });
        await vscode_1.workspace.applyEdit(wsedit);
        await vscode_1.commands.executeCommand("vscode.open", filePath);
        vscode_1.commands.executeCommand("editor.action.insertSnippet", {
            snippet: content.value,
        });
    }
};
exports.createFile = createFile;
//# sourceMappingURL=createFile.js.map