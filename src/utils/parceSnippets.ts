import * as fs from "fs";
import { SnippetString } from "vscode";
import { messages } from "../I18n";
import { Config } from "../type";

export const parceSnippets = async (path: string) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    const config = JSON.parse(data) as Config;
    for (let key in config) {
      if (config[key].type === "array") {
        delete config[key];
        continue;
      }
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
    return config;
  } catch (e) {
    throw messages.errors.configFile;
  }
};
