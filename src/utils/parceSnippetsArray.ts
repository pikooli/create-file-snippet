import * as fs from "fs";
import { SnippetString } from "vscode";
import { messages } from "../I18n";
import { ArrayConfig } from "../type";
import { showErrorMessage } from "./index";

//
export const parceSnippetsArray = (path: string) => {
  return new Promise((resolve: (config: ArrayConfig) => void, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        return reject(err.message);
      }
      try {
        const config = JSON.parse(data) as ArrayConfig;
        for (let key in config) {
          if (config[key].type === "file") {
            delete config[key];
            continue;
          }
          if (typeof config[key].prefix !== "string") {
            config[key].prefix = (config[key].prefix as string[]).join(",");
          }
          if (typeof config[key].bodys !== "string") {
            for (let el in config[key].bodys) {
              config[key].bodys[el].body = new SnippetString(
                (config[key].bodys[el].body as string[]).join("\n")
              );
            }
          }
        }
        resolve(config);
      } catch (e) {
        showErrorMessage(messages.errors.readFile);
        throw e;
      }
    });
  });
};
