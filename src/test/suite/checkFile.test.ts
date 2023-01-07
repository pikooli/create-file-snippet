import * as assert from "assert";
import { after, before } from "mocha";
import { createFile } from "../../utils";
import * as mockFs from "mock-fs";

suite("Test createFile", () => {
  const fileName = "test/path/file.txt";

  before(() => {
    mockFs({});
  });

  after(() => {
    mockFs.restore();
  });

  test(`
    Given an fileName
    Then it should return the file Uri`, async () => {
    const uri = await createFile({ fileName });

    assert.strictEqual(uri?.path, "/" + fileName);
  });
});
