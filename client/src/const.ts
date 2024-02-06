import { CompletionItem, MarkdownString } from "vscode";

export const SELF_FORMATTER = "moushicheng.formily-expression-support";
export const ALL_INVOKE_CHAR = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  ".",
  ":",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  " ",
  "$",
];

export type scopeVarType = (CompletionItem & { children?: scopeVarType })[];

const FiledChildrenCompletions = [
  {
    label: "initialized",
    kind: 1,
    detail: "[Boolean][ReadOnly] Has the field been initialized",
  },
  {
    label: "mounted",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field mounted",
  },
  {
    label: "unmounted",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field unmounted",
  },
  {
    label: "address",
    kind: 1,
    detail: "[FormPath][ReadOnly] Field node path",
  },
  {
    label: "path",
    kind: 1,
    detail: "[FormPath][ReadOnly] Field data path",
  },
  {
    label: "title",
    kind: 1,
    detail: "[FieldMessage][ReadOnly] Field Title",
  },
  {
    label: "description",
    kind: 1,
    detail: "[FieldMessage][ReadOnly] Field description",
  },
  {
    label: "loading",
    kind: 1,
    detail: "[Boolean][ReadOnly] Field loading status",
  },
  {
    label: "validating",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field being validated",
  },
  {
    label: "modified",
    kind: 1,
    detail:
      "[Boolean][ReadOnly] Whether the field tree has been manually modified",
  },
  {
    label: "selfModified",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field has been manually modified",
  },
  {
    label: "active",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field active",
  },
  {
    label: "visited",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field has been visited",
  },
  {
    label: "inputValue",
    kind: 1,
    detail: "[Any][ReadOnly] Field input value",
  },
  {
    label: "inputValues",
    kind: 1,
    detail: "[Array][ReadOnly] Field input value collection",
  },
  {
    label: "dataSource",
    kind: 1,
    detail: "[Array][ReadOnly] Field data source",
  },
  {
    label: "validator",
    kind: 1,
    detail: "[FieldValidator][ReadOnly] Field validator",
  },
  {
    label: "decorator",
    kind: 1,
    detail: "[Any[]][ReadOnly] field decorator",
  },
  {
    label: "component",
    kind: 1,
    detail: "[Any[]][ReadOnly] Field component",
  },
  {
    label: "feedbacks",
    kind: 1,
    detail: "[IFieldFeedback][ReadOnly] Field feedback information",
  },
  {
    label: "parent",
    kind: 1,
    detail: "[GeneralField][ReadOnly] Parent field",
  },
  {
    label: "errors",
    kind: 1,
    detail:
      "[IFormFeedback][ReadOnly] Field all error message(include children)",
  },
  {
    label: "warnings",
    kind: 1,
    detail:
      "[IFormFeedback][ReadOnly] Field all warning message(include children)",
  },
  {
    label: "successes",
    kind: 1,
    detail:
      "[IFormFeedback][ReadOnly] Field all success message(include children)",
  },
  {
    label: "valid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the all field valid(include children)",
  },
  {
    label: "invalid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the all field illegal(include children)",
  },
  { label: "value", kind: 1, detail: "[Any][ReadOnly] Field value" },
  {
    label: "initialValue",
    kind: 1,
    detail: "[Any][ReadOnly] Field default value",
  },
  {
    label: "display",
    kind: 1,
    detail: "[FieldDisplayTypes][ReadOnly] Field display status",
  },
  {
    label: "pattern",
    kind: 1,
    detail: "[FieldPatternTypes][ReadOnly] Field interaction mode",
  },
  {
    label: "required",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field required",
  },
  {
    label: "hidden",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field is hidden",
  },
  {
    label: "visible",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field is displayed",
  },
  {
    label: "disabled",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field is disabled",
  },
  {
    label: "readOnly",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field read-only",
  },
  {
    label: "readPretty",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the field is in the reading state",
  },
  {
    label: "editable",
    kind: 1,
    detail: "[Boolean][ReadOnly] Field is editable",
  },
  {
    label: "validateStatus",
    kind: 1,
    detail: "[FieldValidateStatus]][ReadOnly] Field validation status",
  },
  {
    label: "content",
    kind: 1,
    detail: "[any][ReadOnly] Field content, usually as a child node",
  },
  {
    label: "data",
    kind: 1,
    detail: "[Object][ReadOnly] Field extends properties",
  },
  {
    label: "selfErrors",
    kind: 1,
    detail: "[FieldMessage[]][ReadOnly] Field own error message",
  },
  {
    label: "selfWarnings",
    kind: 1,
    detail: "[FieldMessage[]][ReadOnly] Field own warning message",
  },
  {
    label: "selfSuccesses",
    kind: 1,
    detail: "[FieldMessage[]][ReadOnly] Success message of the field itself",
  },
  {
    label: "selfValid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field valid",
  },
  {
    label: "selfInvalid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the field itself illegal",
  },
  {
    label: "indexes",
    kind: 1,
    detail: "[Number][ReadOnly] collection of field numeric indexes",
  },
  {
    label: "index",
    kind: 1,
    detail:
      "[Number][ReadOnly] field numeric index, take the last index of indexes",
  },
];
const FormChildrenCompletions = [
  {
    label: "initialized",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the form is initialized",
  },
  {
    label: "validating",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form being validated",
  },
  {
    label: "submitting",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form being submitted",
  },
  {
    label: "modified",
    kind: 1,
    detail:
      "[Boolean][ReadOnly] Whether the form value has been manually modified",
  },
  {
    label: "pattern",
    kind: 1,
    detail: "[FormPatternTypes][ReadOnly] Form interaction mode",
  },
  {
    label: "display",
    kind: 1,
    detail: "[FormDisplayTypes][ReadOnly] Form display form",
  },
  {
    label: "mounted",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form mounted",
  },
  {
    label: "unmounted",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form unmounted",
  },
  {
    label: "values",
    kind: 1,
    detail: "[Object][ReadOnly] Form values",
  },
  {
    label: "initialValues",
    kind: 1,
    detail: "[Object][ReadOnly] Form default values",
  },
  {
    label: "valid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form valid",
  },
  {
    label: "invalid",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form illegal",
  },
  {
    label: "errors",
    kind: 1,
    detail: "[IFormFeedback[]][ReadOnly] Form validation error message",
  },
  {
    label: "warnings",
    kind: 1,
    detail: "[IFormFeedback[]][ReadOnly] Form verification warning message",
  },
  {
    label: "successes",
    kind: 1,
    detail: "[IFormFeedback[]][ReadOnly] Form verification success message",
  },
  {
    label: "hidden",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the form is hidden",
  },
  {
    label: "visible",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the form is displayed",
  },
  {
    label: "editable",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form editable",
  },
  {
    label: "readOnly",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form read-only",
  },
  {
    label: "disabled",
    kind: 1,
    detail: "[Boolean][ReadOnly] Whether the form is disabled",
  },
  {
    label: "readPretty",
    kind: 1,
    detail: "[Boolean][ReadOnly] Is the form in a read state",
  },
  { label: "id", kind: 1, detail: "[String][ReadOnly] Form ID" },
  {
    label: "displayName",
    kind: 1,
    detail: "[String][ReadOnly] Model label",
  },
];

export const scopeVars: scopeVarType = [
  {
    label: "$self",
    kind: 1,
    detail:
      "Represents the current field instance, can be used in ordinary attribute expressions, and can also be used in x-reactions",
    documentation: new MarkdownString(
      `[Field Type](https://core.formilyjs.org/zh-CN/api/models/field)\n\n[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)`
    ),
    children: FiledChildrenCompletions,
  },
  {
    label: "$form",
    kind: 1,
    detail:
      "Represents the current Form instance, which can be used in ordinary attribute expressions, and can also be used in x-reactions",
    documentation: new MarkdownString(
      "[Form Type](https://core.formilyjs.org/zh-CN/api/models/form)\n\n[Built-in expression](https://react.formilyjs.org/api/shared/schema#built-in-expression-scope)"
    ),
    children: FormChildrenCompletions,
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
