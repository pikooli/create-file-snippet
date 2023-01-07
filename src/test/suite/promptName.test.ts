import * as assert from "assert";
import { after } from "mocha";
import { promptName } from "../../utils";
import { messages } from "../../I18n/";
import * as vscode from "vscode";

suite("Test promptName", () => {
  const savedShowInputBox = vscode.window.showInputBox;

  after(() => (vscode.window.showInputBox = savedShowInputBox));

  test(`Given an input box asking for a name show up
        When we give a name
        Then the output should be the given name`, async () => {
    const testName = "abcd";
    vscode.window.showInputBox = async () => {
      return testName;
    };
    const name = await promptName({ type: "file" });
    assert.strictEqual(name, testName);
  });

  test(`Given an input box asking for a name show up
        When we give nothing as name
        Then function should fail`, async () => {
    const testName = "";
    vscode.window.showInputBox = async () => {
      return testName;
    };
    try {
      const name = await promptName({ type: "file" });
    } catch (e) {
      assert.strictEqual(e, messages.errors.fileName);
    }
  });
});
