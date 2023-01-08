import { ArrayConfig, Config } from "../type";

export const configFile = {
  test: {
    prefix: ["basic-test"],
    body: ["test"],
    description: "Tsx basic file",
    type: "file",
  },
  views: {
    prefix: ["react-views"],
    bodys: [
      {
        prefix: "1",
        body: ["1"],
      },
      {
        prefix: "2",
        body: ["2"],
      },
    ],
    description: "View for react component",
    type: "array",
  },
};

export const configFileForOption = {
  test: {
    prefix: "basic-test",
    body: "test",
    description: "Tsx basic file",
    type: "file" as "file",
  },
  test2: {
    prefix: "basic-test2",
    body: "test2",
    description: "Tsx basic file",
    type: "file" as "file",
  },
};

export const configFileForOptionArray: ArrayConfig = {
  test: {
    prefix: "array-test",
    bodys: [
      {
        prefix: "1",
        body: ["1"],
      },
      {
        prefix: "2",
        body: ["2"],
      },
    ],
    description: "Tsx array file",
    type: "array" as "array",
  },
  test2: {
    prefix: "array-test2",
    bodys: [
      {
        prefix: "2",
        body: ["2"],
      },
      {
        prefix: "3",
        body: ["3"],
      },
    ],
    description: "Tsx array file",
    type: "array" as "array",
  },
};
