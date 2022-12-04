import { Uri, workspace, FileType } from "vscode";

export const checkFileFolder = async (params: {
  uri: Uri;
  type: FileType.Directory | FileType.File;
}) => {
  let stat;
  const { uri, type } = params;
  console.log("==============");
  console.log(params);
  console.log("==============");
  try {
    stat = await workspace.fs.stat(uri);
  } catch (e) {
    return false;
  }
  return stat?.type === type;
};
