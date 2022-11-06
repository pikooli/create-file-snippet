import * as fs from "fs";
import { SnippetString } from "vscode";
import { messages } from "../I18n";
import { Config } from "../type";
import { showErrorMessage } from "./index";

//
export const parceConfigFile = (path: string) => {
  return new Promise((resolve: (config: Config) => void, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        return reject(err.message);
      }
      try {
        const config = JSON.parse(data) as Config;
        for (let key in config) {
          if (typeof config[key].prefix !== "string") {
            config[key].prefix = (config[key].prefix as string[]).join(",");
          }
          if (typeof config[key].body !== "string") {
            config[key].body = new SnippetString(
              (config[key].body as string[]).join("\n")
            );
          } else {
            config[key].body = new SnippetString(config[key].body as string);
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
