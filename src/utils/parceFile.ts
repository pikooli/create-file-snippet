import * as fs from "fs";
import { SnippetString, window } from "vscode";
import { Config } from "../type";

//
export const parceConfigFile = (path: string) => {
  return new Promise((resolve: (config: Config) => void, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) console.log(err);
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
        console.log(e);
        window.showErrorMessage("Something is wrong with the config file");
      }
    });
  });
};
