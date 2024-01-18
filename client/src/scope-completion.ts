import { CompletionItem, MarkdownString } from "vscode";
import { scopeVarType, scopeVars } from "./const";

const [_code, dotCode] = ["_", "."].map((item) => item.charCodeAt(0));
const checkIsVar = (target: string) => {
  if (!target) return false;
  const targetCode = target.charCodeAt(0);
  if (targetCode >= 65 && targetCode <= 122) {
    return true;
  }
  if (targetCode >= 48 && targetCode <= 57) {
    return true;
  }
  if (targetCode === _code) {
    return true;
  }
  if (targetCode === dotCode) {
    return true;
  }
  return false;
};
const checkIsScope = (
  code: string,
  position: number
): { is: boolean; range?: number[] } => {
  for (let i = position; i >= 0; i--) {
    const target = code[i];

    if (checkIsVar(target)) continue;

    if (!checkIsVar(code[i - 1])) {
      if (target === "$")
        return {
          is: true,
          range: [i, position],
        };
      return {
        is: false,
        range: undefined,
      };
    }
  }

  return {
    is: false,
    range: undefined,
  };
};
const getWordSection = (code: string, range: number[], target: string) => {
  const section = code
    .slice(range[0], range[1] + 1)
    .split(".")
    .filter(Boolean);
  return {
    section: section,
    depth: target === "." ? section.length : section.length - 1,
  };
};
const deleteCompletionsChildren = (completions: scopeVarType) => {
  return completions.map((item) => {
    const { children, ...other } = item;
    return other;
  });
};
export const getScopeCompletion = (
  code: string,
  target: string,
  position: number
): CompletionItem[] => {
  const scope = checkIsScope(code, position);
  if (!scope.is) {
    return [];
  }
  const wordSection = getWordSection(code, scope.range, target);

  const currentCompletion = findCurrentCompletion(
    wordSection.section,
    wordSection.depth
  );
  return deleteCompletionsChildren(currentCompletion) || [];
};
const findCurrentCompletion = (wordSection: string[], maxDepth) => {
  const find = (
    currentLayerCompletions: scopeVarType,
    currentDepth: number
  ) => {
    if (currentDepth >= maxDepth) {
      return currentLayerCompletions;
    } else {
      const currentWord = wordSection[currentDepth];
      const completionItemChildren = currentLayerCompletions.find(
        (completionItem) => completionItem.label === currentWord
      )?.children;
      if (!completionItemChildren) return [];
      else {
        return find(completionItemChildren, currentDepth + 1);
      }
    }
  };
  return find(scopeVars, 0);
};
