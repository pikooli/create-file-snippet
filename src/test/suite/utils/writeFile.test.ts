import * as assert from "assert";
import { after, beforeEach } from "mocha";
import { writeFile, createFile } from "../../../utils";
import { commands, Uri } from "vscode";
import { messages } from "../../../I18n";
import * as mockFs from "mock-fs";
import * as fs from "fs";

// TODO : to finish =============================
suite.skip("Test writeFile", () => {
  const filePath = "test/path/file.txt";
  const content = "test text";

  beforeEach(() => {
    mockFs({});
  });

  after(() => {
    mockFs.restore();
  });

  test(`
    Given an fileName to the function createFile
    Then the file should have been created
  `, async () => {
    try {
      await createFile(filePath);
      await writeFile({ filePath, content });
      const uriFile = Uri.file(filePath);
      await commands.executeCommand("vscode.open", uriFile);
    } catch (e) {
      console.log(e);
    }
  });
});
