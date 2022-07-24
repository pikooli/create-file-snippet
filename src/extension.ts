import { commands, ExtensionContext } from "vscode";
import {
  createFolderCommand,
  createFileSnippetCommand,
  createFileCommand,
} from "./commands";

const COMMANDS_NAME = {
  createFolder: "vscode-create-file-snippet.folder",
  createFileSnippet: "vscode-create-file-snippet.file_snippet",
  createFile: "vscode-create-file-snippet.file",
};

//
export function activate(context: ExtensionContext) {
  let disposableFolder = commands.registerCommand(
    COMMANDS_NAME["createFolder"],
    createFolderCommand
  );
  let disposableFileSnippet = commands.registerCommand(
    COMMANDS_NAME["createFileSnippet"],
    createFileSnippetCommand
  );
  let disposableFile = commands.registerCommand(
    COMMANDS_NAME["createFile"],
    createFileCommand
  );

  context.subscriptions.push(disposableFolder);
  context.subscriptions.push(disposableFileSnippet);
  context.subscriptions.push(disposableFile);
}

export function deactivate() {}
