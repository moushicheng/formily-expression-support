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
  Position,
  Range,
  TextDocument,
  TextEdit,
  Uri,
  window,
  workspace,
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { getCurrentRegion, getCurrentRegionCode, getRegions } from "./utils";
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
          // debugger;
          res.push(TextEdit.replace(new Range(startPos, endPos), code));
        }
        return undefined;
        // return res;
      },
    }
  );
  workspace.registerTextDocumentContentProvider("embedded-content", {
    provideTextDocumentContent: (uri) => {
      const originalUri = uri.path.slice(1).slice(0, -3);
      const decodedUri = decodeURIComponent(originalUri);
      return virtualDocumentContents.get(decodedUri);
    },
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
        console.log("@completion", completion);

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
