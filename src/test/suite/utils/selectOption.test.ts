import * as assert from "assert";
import { after, before } from "mocha";
import { selectOption, selectOptionArray } from "../../../utils";
import {
  configFileForOption,
  configFileForOptionArray,
} from "../../configSetup";
import { window } from "vscode";

suite("Test selectOption", () => {
  const saveShowQuickPick = window.showQuickPick;
  before(() => {
    window.showQuickPick = async (k: any) => "basic-test" as any;
  });

  after(() => {
    window.showQuickPick = saveShowQuickPick;
  });

  test(`
    Given an fileName to the function selectOption
    Then the selected item should have be deep equal to the object in config
  `, async () => {
    const option = await selectOption(configFileForOption);
    assert.deepStrictEqual(option, configFileForOption.test);
  });
});

suite("Test selectOptionArray", () => {
  const saveShowQuickPick = window.showQuickPick;
  before(() => {
    window.showQuickPick = async (k: any) => "array-test" as any;
  });

  after(() => {
    window.showQuickPick = saveShowQuickPick;
  });

  test(`
    Given an fileName to the function selectOptionArray
    Then the selected item should have be deep equal to the object in config
  `, async () => {
    const option = await selectOptionArray(configFileForOptionArray);
    assert.deepStrictEqual(option, configFileForOptionArray.test);
  });
});
