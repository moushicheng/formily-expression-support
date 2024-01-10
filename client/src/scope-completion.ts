import { CompletionItem } from "vscode";

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
): { is: boolean; range: number[] } => {
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
const getWordSection = (code: string, range: number[]) => {
  return code
    .slice(range[0], range[1] + 1)
    .split(".")
    .filter(Boolean);
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
  const wordSection = getWordSection(code, scope.range);
  console.log(wordSection);
  if (target === "$") {
    return [
      { label: "$self", kind: 1, detail: "Field 模型" },
      { label: "$form", kind: 1 },
      { label: "$values", kind: 1 },
      { label: "$record", kind: 1 },
      { label: "$records", kind: 1 },
      { label: "$deps", kind: 1 },
      { label: "$dependencies", kind: 1 },
      { label: "$target", kind: 1 },
    ];
  }
  return [];
};

const test = "$deps.";
const length = test.length;
getScopeCompletion(test, test[length - 1], test.length - 1);
