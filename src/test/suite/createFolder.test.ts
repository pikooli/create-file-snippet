import * as assert from "assert";
import { after, before, beforeEach } from "mocha";
import { messages } from "../../I18n";
import { createFolder } from "../../utils";
import * as mockFs from "mock-fs";
import * as vscode from "vscode";
import * as fs from "fs";

suite("Test createFolder", () => {
  const folderPath = "abcd/apds";

  before(() => {
    vscode.window.showInputBox = async () => {
      return folderPath;
    };
  });

  beforeEach(() => {
    mockFs({});
  });

  after(() => {
    mockFs.restore();
  });

  test(`
    Given an folderPath
    Then it should create the folder without failling
  `, async () => {
    const path = await createFolder();
    const stat = fs.statSync(path!);
    assert.strictEqual(stat.isDirectory(), true);
    assert.strictEqual(path, folderPath);
  });

  test(`
    Given an folderPath to the function createFolder
    When we give the same folderPath to the function
    Then it should fail
  `, async () => {
    await createFolder();
    try {
      await createFolder();
    } catch (e) {
      assert.strictEqual(e, messages.errors.folderExist);
    }
  });
});
