import { workspace } from "vscode";

export function getCurrentWorkspacePath() {
  return workspace.workspaceFolders?.length
    ? workspace.workspaceFolders[0].uri.fsPath
    : "";
}
