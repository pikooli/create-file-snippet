import * as assert from "assert";
import { after, before } from "mocha";
import { checkFileFolder } from "../../utils";
import * as mockFs from "mock-fs";
import { Uri, FileType } from "vscode";

//  TODO : Fix
// suite("Test checkFileFolder", () => {
//   const pathFile = "test/path/file.txt";
//   const pathFolder = "test/path";

//   before(() => {
//     mockFs({
//       [pathFolder]: {
//         [pathFile]: "test",
//       },
//     });
//   });

//   after(() => {
//     mockFs.restore();
//   });

//   test("Success checkFileFolder", async () => {
//     const uri = Uri.file(pathFile);
//     const isTypeAFile = await checkFileFolder({ uri, type: FileType.File });

//     assert.strictEqual(isTypeAFile, true);
//   });

//   test("Failled checkFileFolder", async () => {
//     const isTypeAFile = await checkFileFolder({
//       uri: Uri.file(pathFolder),
//       type: FileType.File,
//     });

//     assert.strictEqual(isTypeAFile, true);
//   });
// });
