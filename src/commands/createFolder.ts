import { createFolder, showInformationMessage } from "../utils";
import { messages } from "../I18n";

//
export const createFolderCommand = async () => {
  try {
    await createFolder();
    showInformationMessage(messages.success.creatingFolder);
  } catch (e) {}
};
