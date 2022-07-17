"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOption = void 0;
const vscode_1 = require("vscode");
//
const selectOption = async (config) => {
    const keys = [];
    for (let k in config) {
        keys.push(config[k].prefix);
    }
    const result = await vscode_1.window.showQuickPick(keys);
    vscode_1.window.showInformationMessage(`Selected: ${result}`);
    for (let k in config) {
        if (config[k].prefix === result) {
            return config[k];
        }
    }
};
exports.selectOption = selectOption;
//# sourceMappingURL=selectOption.js.map