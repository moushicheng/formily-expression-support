/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {
  commands,
  languages,
  Range,
  TextDocument,
  TextEdit,
  window,
  workspace,
  ConfigurationTarget,
  WorkspaceConfiguration,
  ExtensionContext
} from "vscode";
import {  getRegions } from "./utils";
import {SELF_FORMATTER } from "./const";
const beautify = require("js-beautify");

const getFormatter = (config: WorkspaceConfiguration) => {
  return config.get<string>("defaultFormatter");
};

export const registerFormatter = (context: ExtensionContext) => {
  let runningSignal=false
  languages.registerDocumentFormattingEditProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
      { scheme: "file", language: "typescript" },
      { scheme: "file", language: "typescriptreact" },
    ],
    {
      async provideDocumentFormattingEdits(
        document: TextDocument
      ): Promise<TextEdit[]> {
        const text = document.getText();
        const regions = getRegions(text);
        const res = [];
        for (const region of regions) {
          const start = region.start;
          const end = region.end;
          const startPos = document.positionAt(start);
          const endPos = document.positionAt(end);
          const code = text.slice(start, end);
          const formattedCode = beautify(code, { preserve_newlines: true });
          res.push(
            TextEdit.replace(new Range(startPos, endPos), formattedCode)
          );
        }
        return res;
      },
    }
  );
  workspace.onDidSaveTextDocument(async (doc) => {
    const config = workspace.getConfiguration(
      "editor",
      window.activeTextEditor?.document
    );
    const defaultFormatter = getFormatter(config);
    console.log("@", defaultFormatter, runningSignal);
    if (
      defaultFormatter !== SELF_FORMATTER &&
      Boolean(defaultFormatter) &&
      runningSignal === false
    ) {
      runningSignal = true;
      await config.update(
        "defaultFormatter",
        SELF_FORMATTER,
        ConfigurationTarget.Workspace,
        true
      );
      await commands.executeCommand("editor.action.formatDocument");
      if (config.get<boolean>("formatOnSave")) {
        await commands.executeCommand("workbench.action.files.save");
      }
      // Return back to the original configuration
      await config.update(
        "defaultFormatter",
        defaultFormatter,
        ConfigurationTarget.Workspace,
        true
      );
      runningSignal = false;
    }
  });
};
