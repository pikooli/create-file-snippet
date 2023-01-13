import * as assert from "assert";
import { after, before } from "mocha";
import { parceSnippets } from "../../../utils";
import * as mockFs from "mock-fs";
import { messages } from "../../../I18n";
import { configFile, configFilePolluted } from "../../configSetup";
import { CONFIG_FILE } from "../../../constant";

suite("Test parceSnippets", () => {
  const configFilePath = CONFIG_FILE;
  const fsConfig = {
    [configFilePath]: JSON.stringify(configFile),
    ["pollutedFile.json"]: JSON.stringify(configFilePolluted),
  };

  before(() => {
    mockFs(fsConfig);
  });

  after(() => {
    mockFs.restore();
  });

  test(`
    Given an configFile to the function parceSnippets
    Then it should return a parsed object of the config file
      And the type array should no have been parsed
  `, async () => {
    const config = await parceSnippets(configFilePath);
    let prefix: string | string[] = configFile["test"].prefix;

    if (typeof configFile["test"].prefix !== "string") {
      prefix = configFile["test"].prefix.join(",");
    }

    assert.strictEqual(config["test"].prefix, prefix);
    assert.strictEqual(
      config["test"].description,
      configFile["test"].description
    );
    assert.strictEqual(config["views"], undefined);
  });

  test(`
    Given an path that point to nothing to the function parceSnippets
    Then it should fail
  `, async () => {
    try {
      await parceSnippets("path/to/fakepath");
    } catch (e) {
      assert.strictEqual(e, messages.errors.configFile);
    }
  });

  test(`
    Given an polluted configFile to the function parceSnippets
    Then it should throw an error
  `, async () => {
    try {
      await parceSnippets("pollutedFile.json");
    } catch (e) {
      assert.strictEqual(e, messages.errors.configFile);
    }
  });
});
