import * as assert from "assert";
import { after, beforeEach } from "mocha";
import { createFile } from "../../../utils";
import { messages } from "../../../I18n";
import * as mockFs from "mock-fs";
import * as fs from "fs";

suite("Test createFile", () => {
  const filePath = "test/path/file.txt";

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
    const createFilePath = await createFile(filePath);
    const stat = fs.statSync(createFilePath);
    assert.strictEqual(stat.isFile(), true);
  });

  test(`
    Given we use the function createFile two time
      And the fileName is the same
    Then the function should fail the second time
  `, async () => {
    await createFile(filePath);
    try {
      await createFile(filePath);
    } catch (e) {
      assert.strictEqual(e, messages.errors.fileAlreadyExist);
    }
  });
});
