import { SnippetString } from "vscode";

export type Body = string[] | SnippetString | string;

export type Type = "file" | "array";

export interface OptionBodys {
  suffix?: string;
  prefix?: string;
  name?: string;
  body: Body;
}

export interface Option {
  prefix: string[] | string;
  bodys: OptionBodys[];
  description: string;
  type: Type;
}

export type Config = {
  [key: string]: {
    prefix: string[] | string;
    body: Body;
    description: string;
    type: Type;
  };
};

export type ArrayConfig = {
  [key: string]: Option;
};
