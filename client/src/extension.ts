/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {
  commands,
  CompletionList,
  ExtensionContext,
  languages,
  Position,
  Uri,
  workspace,
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import {
  getCurrentRegion,
  getCurrentRegionCode,
  getScopeCompletion,
} from "./utils";
import { ALL_INVOKE_CHAR } from "./const";

let client: LanguageClient;

export function activate(activateContext: ExtensionContext) {
  const virtualDocumentContents = new Map<string, string>();

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


        // const corePath =Uri.joinPath(activateContext.extensionUri, 'client', 'node_modules','@formily','core','esm');
        // const corePath={fsPath:'@formily/core'}
        // const injectCode=`import {Field} from "${corePath.fsPath}";const $self:Field;`
        // const injectCode='type a={a:number};const $self:a;'
        // const pos=new Position(position.line,position.character+injectCode.length)

  
        // virtualDocumentContents.set(originalUri, injectCode+code);
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
        const items = getScopeCompletion(code, target);
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
