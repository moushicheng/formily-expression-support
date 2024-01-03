/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "path";
import {
  commands,
  CompletionList,
  ExtensionContext,
  languages,
  Uri,
  workspace,
} from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient";
import { getCurrentRegion } from "./utils";
import { ALL_INVOKE_CHAR } from "./const";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const virtualDocumentContents = new Map<string, string>();

  workspace.registerTextDocumentContentProvider("embedded-content", {
    provideTextDocumentContent: (uri) => {
      const originalUri = uri.path.slice(1).slice(0, -3);
      const decodedUri = decodeURIComponent(originalUri);
      console.log("@params", virtualDocumentContents.get(decodedUri));
      return "   console.   ";
    },
  });
  languages.registerCompletionItemProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
      { scheme: "file", language: "typescript" },
      { scheme: "file", language: "typescriptreact" },
      { scheme: "file", language: "fuckjs" },
    ],
    {
      async provideCompletionItems(document, position, token, context) {
        console.log(114514);
        // TODO: CheckPosition in {{}}
        console.log("@start provide");
        const region = getCurrentRegion(
          document.getText(),
          document.offsetAt(position)
        );
        const originalUri = document.uri.toString(true);
        // TODO: Get correct code in {{}}
        // such as:
        virtualDocumentContents.set(originalUri, document.getText());
        const vdocUriString = `embedded-content://javascript/${encodeURIComponent(
          originalUri
        )}.js`;
        const vdocUri = Uri.parse(vdocUriString);

        return await commands.executeCommand<CompletionList>(
          "vscode.executeCompletionItemProvider",
          vdocUri,
          position,
          context.triggerCharacter
        );
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
