import { window } from "vscode";

export const showInformationMessage = (message: string) =>
  window.showInformationMessage(message);

export const showErrorMessage = (message: string) =>
  window.showErrorMessage(message);
