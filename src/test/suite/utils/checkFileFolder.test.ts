import * as assert from "assert";
import { after, before } from "mocha";
import { checkIsAFile, checkIsAFolder } from "../../../utils";
import * as mockFs from "mock-fs";
import * as path from "path";

suite("Test checkFileFolder", () => {
  const pathFile = "/test/path/file.txt";
  const pathFolder = "/someRandomPath";

  before(() => {
    mockFs({
      [pathFile]: "testtest",
      [pathFolder]: {},
    });
  });

  after(() => {
    mockFs.restore();
  });

  test(`Given a file path to the function checkIsAFile
        Then it should return true`, async () => {
    const currentPath = path.join(pathFile);
    const isTypeAFile = await checkIsAFile(currentPath);
    assert.strictEqual(isTypeAFile, true);
  });

  test(`Given a folder path to the function checkIsAFile
        Then it should return false`, async () => {
    const currentPath = path.join(pathFolder);
    const isTypeAFile = await checkIsAFile(currentPath);
    assert.strictEqual(isTypeAFile, false);
  });

  test(`Given a folder path to the function checkIsAFolder
        Then it should return true`, async () => {
    const currentPath = path.join(pathFolder);
    const isTypeAFolder = await checkIsAFolder(currentPath);
    assert.strictEqual(isTypeAFolder, true);
  });

  test(`Given a file path to the function checkIsAFolder
        Then it should return false`, async () => {
    const currentPath = path.join(pathFile);
    const isTypeAFolder = await checkIsAFolder(currentPath);
    assert.strictEqual(isTypeAFolder, false);
  });
});
