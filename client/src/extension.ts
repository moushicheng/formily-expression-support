/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Disposable, ExtensionContext } from "vscode";
import { registerFormatter } from "./formatter";
import { registerCompletion } from "./completion";
let disposables: Disposable[] = [];
export function activate(context: ExtensionContext) {
  const formatterDisposables = registerFormatter(context);
  const CompletionDisposables = registerCompletion(context);
  disposables.push(...formatterDisposables, ...CompletionDisposables);
}

export function deactivate() {
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
