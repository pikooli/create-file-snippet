import { messages } from "../I18n";
import { showInformationMessage } from "./showMessage";
import { checkIsAFolder, promptName, getCurrentWorkspacePath } from "./index";
import * as path from "path";
import * as fs from "fs";
//
export const createFolder = async () => {
  const wsPath = getCurrentWorkspacePath();
  const folderName = await promptName({ type: "folder" });
  if (folderName) {
    const currentPath = path.join(wsPath, folderName);
    if (await checkIsAFolder(currentPath)) {
      throw messages.errors.folderExist;
    }
    fs.mkdirSync(currentPath, { recursive: true });
    showInformationMessage(messages.success.creatingFolder);
    return currentPath;
  }
};
