import { window } from "vscode";
import { Option } from "../type";
import { showInformationMessage } from "./index";

export const selectMultipleSnippetFile = async (option: Option) => {
  const nameBodys = option.bodys.map((body, idx) => {
    return { label: `File ${idx + 1} - ${body.name ?? ""}`, picked: true };
  });

  let selectedNames = await window.showQuickPick(nameBodys, {
    canPickMany: true,
  });

  const filesIndex = selectedNames?.map(
    (name) => Number(name.label.split(" - ").slice(0, 1)[0].split(" ")[1]) - 1
  );

  showInformationMessage(`Selected: ${filesIndex}`);
  return filesIndex;
};
