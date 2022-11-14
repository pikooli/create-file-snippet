import { SnippetString } from "vscode";

export type Config = {
  [key: string]: {
    prefix: string[] | string;
    body: string[] | SnippetString | string;
    description: string;
    type: "file" | "array";
  };
};

export type ArrayConfig = {
  [key: string]: {
    prefix: string[] | string;
    bodys: [
      {
        suffix: string;
        prefix: string;
        body: string[] | SnippetString | string;
      }
    ];
    description: string;
    type: "file" | "array";
  };
};
