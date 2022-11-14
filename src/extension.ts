import { commands, ExtensionContext } from "vscode";
import {
  createFolderCommand,
  createFileSnippetCommand,
  createFileCommand,
  createFilesSnippetsCommand,
} from "./commands";

const COMMANDS_NAME = {
  createFolder: "vscode-create-file-snippet.folder",
  createFileSnippet: "vscode-create-file-snippet.file_snippet",
  createFile: "vscode-create-file-snippet.file",
  createFilesSnippets: "vscode-create-file-snippet.file_snippets",
};

//
export function activate(context: ExtensionContext) {
  const createFolder = commands.registerCommand(
    COMMANDS_NAME["createFolder"],
    createFolderCommand
  );
  const createFileSnippet = commands.registerCommand(
    COMMANDS_NAME["createFileSnippet"],
    createFileSnippetCommand
  );
  const createFile = commands.registerCommand(
    COMMANDS_NAME["createFile"],
    createFileCommand
  );

  const createFilesSnippets = commands.registerCommand(
    COMMANDS_NAME["createFilesSnippets"],
    createFilesSnippetsCommand
  );

  context.subscriptions.push(createFolder);
  context.subscriptions.push(createFileSnippet);
  context.subscriptions.push(createFile);
  context.subscriptions.push(createFilesSnippets);
}

export function deactivate() {}
