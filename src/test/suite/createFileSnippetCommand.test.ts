// import * as assert from "assert";
// import { after, beforeEach } from "mocha";
// import { createFileSnippetCommand } from "../../commands";
// import { messages } from "../../I18n";
// import * as mockFs from "mock-fs";
// import * as fs from "fs";
// import { configFile } from "../configSetup";
// import { CONFIG_FILE } from "../../constant";
// import * as vscode from "vscode";

// suite.only("Test createFileSnippetCommand", () => {
//   const filePath = CONFIG_FILE;
//   const testName = "abcd";
//   vscode.window.showInputBox = async () => {
//     return testName;
//   };

//   beforeEach(() => {
//     mockFs({
//       [filePath]: JSON.stringify(configFile),
//     });
//   });

//   after(() => {
//     mockFs.restore();
//   });

//   test(`
//     Given an fileName to the function createFile
//     Then the file should have been created
//   `, async () => {
//     await createFileSnippetCommand();
//   });
// });
