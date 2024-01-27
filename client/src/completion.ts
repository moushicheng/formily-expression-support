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
export const registerCompletion=(context: ExtensionContext)=>{
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