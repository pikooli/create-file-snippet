"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parceConfigFile = void 0;
const fs = require("fs");
const vscode_1 = require("vscode");
//
const parceConfigFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err)
                console.log(err);
            try {
                const config = JSON.parse(data);
                for (let key in config) {
                    if (typeof config[key].prefix !== "string") {
                        config[key].prefix = config[key].prefix.join(",");
                    }
                    if (typeof config[key].body !== "string") {
                        config[key].body = new vscode_1.SnippetString(config[key].body.join("\n"));
                    }
                    else {
                        config[key].body = new vscode_1.SnippetString(config[key].body);
                    }
                }
                resolve(config);
            }
            catch (e) {
                console.log(e);
                vscode_1.window.showErrorMessage("Something is wrong with the config file");
            }
        });
    });
};
exports.parceConfigFile = parceConfigFile;
//# sourceMappingURL=parceFile.js.map