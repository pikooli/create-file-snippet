import { after, before } from "mocha";
import { createFolder } from "../../utils";
import * as mockFs from "mock-fs";
import * as vscode from "vscode";

suite("Test createFolder", () => {
  const folderPath = "abcd";

  before(() => {
    mockFs({});
    vscode.window.showInputBox = async () => {
      return folderPath;
    };
  });

  after(() => {
    mockFs.restore();
  });

  test(`
    Given an folderPath
    Then it should create the folder without failling`, async () => {
    await createFolder();
  });
});
