/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {
  commands,
  CompletionList,
  ConfigurationTarget,
  ExtensionContext,
  languages,
  TextDocument,
  TextEdit,
  Uri,
  window,
  workspace,
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { getCurrentRegion, getCurrentRegionCode } from "./utils";
import { ALL_INVOKE_CHAR } from "./const";
import { getScopeCompletion } from "./scope-completion";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const virtualDocumentContents = new Map<string, string>();

  languages.registerDocumentFormattingEditProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
      { scheme: "file", language: "typescript" },
      { scheme: "file", language: "typescriptreact" },
    ],
    {
      provideDocumentFormattingEdits(document: TextDocument): TextEdit[] {
        const firstLine = document.lineAt(0);
        if (firstLine.text !== "console.log(22);") {
          return [TextEdit.insert(firstLine.range.start, "console.log(22);\n")];
        }
      },
    }
  );
  workspace.onDidSaveTextDocument(async (doc) => {
    const document = window.activeTextEditor?.document;
    const config = workspace.getConfiguration("editor", document);
    const defaultFormatter = config.get<string>("defaultFormatter");
    if (defaultFormatter !== "moushicheng.formily-expression-support") {
      await config.update(
        "defaultFormatter",
        "moushicheng.formily-expression-support",
        undefined,
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
        undefined,
        true
      );
    }
  });

  languages.registerCompletionItemProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
      { scheme: "file", language: "typescript" },
      { scheme: "file", language: "typescriptreact" },
    ],
    {
      async provideCompletionItems(document, position, token, context) {
        const text = document.getText();
        const region = getCurrentRegion(text, document.offsetAt(position));
        if (!region) {
          return;
        }
        const originalUri = document.uri.toString(true);
        const code = getCurrentRegionCode(text, region);
        virtualDocumentContents.set(originalUri, code);
        const vdocUriString = `embedded-content://javascript/${encodeURIComponent(
          originalUri
        )}.js`;
        const vdocUri = Uri.parse(vdocUriString);
        const completion: CompletionList =
          await commands.executeCommand<CompletionList>(
            "vscode.executeCompletionItemProvider",
            vdocUri,
            position,
            context.triggerCharacter
          );
        const target = document.getText()[document.offsetAt(position) - 1];
        const items = getScopeCompletion(
          code,
          target,
          document.offsetAt(position) - 1
        );
        completion.items.unshift(...items);

        return completion;
      },
    },
    ...ALL_INVOKE_CHAR
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
