import { CompletionItem, MarkdownString } from "vscode";

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
  console.log("@wordSection", wordSection);
  if (target === "$" && wordSection.length === 1) {
    return [
      {
        label: "$self",
        kind: 1,
        detail:
          "Represents the current field instance, can be used in ordinary attribute expressions, and can also be used in x-reactions",
        documentation: new MarkdownString(
          `[Field Type](https://core.formilyjs.org/zh-CN/api/models/field)\n\n[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)`
        ),
      },
      {
        label: "$form",
        kind: 1,
        detail:
          "Represents the current Form instance, which can be used in ordinary attribute expressions, and can also be used in x-reactions",
        documentation: new MarkdownString(
          "[Form Type](https://core.formilyjs.org/zh-CN/api/models/form)\n\n[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$values",
        kind: 1,
        detail: "It has the same effect as $filed.values",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$deps",
        kind: 1,
        detail:
          "It can only be consumed by expressions in x-reactions, corresponding to the dependencies defined by x-reactions, and the sequence of the array is the same",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$dependencies",
        kind: 1,
        detail:
          "It can only be consumed by expressions in x-reactions, corresponding to the dependencies defined by x-reactions, and the sequence of the array is the same",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$target",
        kind: 1,
        detail:
          "Can only be consumed in expressions in x-reactions, representing the target field of active mode",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$observable",
        kind: 1,
        detail:
          "It is used to create reactive objects in the same way as observable",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$memo",
        kind: 1,
        detail:
          "Used to create persistent reference data in the same way as autorun.memo",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$effect",
        kind: 1,
        detail:
          "The timing of the next microtask in response to autorun's first execution and the dispose in response to autorun are used in the same way as autorun.effect",
        documentation: new MarkdownString(
          "[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
        ),
      },
      {
        label: "$record",
        kind: 1,
      },
      { label: "$records", kind: 1 },
    ];
  }
  return [];
};

const test = "$deps.";
const length = test.length;
getScopeCompletion(test, test[length - 1], test.length - 1);
