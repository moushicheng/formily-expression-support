import {
  commands,
  CompletionList,
  ExtensionContext,
  languages,
  Uri,
  workspace,
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { getCurrentRegion, getCurrentRegionCode, getRegions } from "./utils";
import { ALL_INVOKE_CHAR } from "./const";
import { getScopeCompletion } from "./scope-completion";
import { registerFormatter } from "./formatter";
import { registerCompletion } from './completion';
let client: LanguageClient;

export function activate(context: ExtensionContext) {
  registerFormatter(context);
  registerCompletion(context)  
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
