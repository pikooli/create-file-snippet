import { SnippetString } from "vscode";

export type Config = {
  [key: string]: {
    prefix: string[] | string;
    body: string[] | SnippetString | string;
    description: string;
  };
};
