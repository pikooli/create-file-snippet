import {
  window,
  commands,
  Uri,
  SnippetString,
  workspace,
  WorkspaceEdit,
} from "vscode";

const PROMPT =
  "Enter the path and name of the file you want to create. EI: apps/test.js";
const wsPath = workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

//
export const createFile = async ({
  wsedit,
  content,
}: {
  wsedit: WorkspaceEdit;
  content: SnippetString;
}) => {
  const currentlyOpenTabfilePath =
    window.activeTextEditor?.document?.fileName.replace(wsPath, "");
  const fileName = await window.showInputBox({
    prompt: PROMPT,
    value: currentlyOpenTabfilePath,
  });

  if (fileName && fileName !== currentlyOpenTabfilePath && content?.value) {
    const filePath = Uri.file(wsPath + "/" + fileName);
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await workspace.applyEdit(wsedit);
    await commands.executeCommand("vscode.open", filePath);
    commands.executeCommand("editor.action.insertSnippet", {
      snippet: content.value,
    });
  }
};
