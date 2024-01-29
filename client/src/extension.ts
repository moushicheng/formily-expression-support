/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { ExtensionContext } from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { registerFormatter } from "./formatter";
import { registerCompletion } from "./completion";
let client: LanguageClient;

export function activate(context: ExtensionContext) {
  registerFormatter(context);
  registerCompletion(context);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
