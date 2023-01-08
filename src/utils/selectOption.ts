import { window } from "vscode";
import { ArrayConfig, Config } from "../type";
import { showInformationMessage } from "./index";

//
export const selectOption = async (config: Config) => {
  const keys = [];

  for (let k in config) {
    keys.push(config[k].prefix as string);
  }
  const result = await window.showQuickPick(keys);
  showInformationMessage(`Selected: ${result}`);
  for (let k in config) {
    if (config[k].prefix === result) {
      return config[k];
    }
  }
};

export const selectOptionArray = async (config: ArrayConfig) => {
  const keys = [];
  for (let k in config) {
    keys.push(config[k].prefix as string);
  }

  const result = await window.showQuickPick(keys);
  showInformationMessage(`Selected: ${result}`);
  for (let k in config) {
    if (config[k].prefix === result) {
      return config[k];
    }
  }
};
