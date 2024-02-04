# Formily-expression-support

[english](https://github.com/moushicheng/formily-expression-support/blob/master/README.md)|[中文](https://github.com/moushicheng/formily-expression-support/blob/master/README_CN.md)

support formily expression

![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/preview.gif?raw=true)

## feature

- support code highlight
- support code completion
  if you want to use whole completion support, please set editor.quickSuggestions.string->on

  ![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/image.png?raw=true)

  or set this config in .vscode/setting.json

  ```
  "editor.quickSuggestions": {
    "other": "on",
    "comments": "off",
    "strings": "on"
  }
  ```

- [experimental]auto format your expression
you can close this feature use setting formily.useFormatter:false

## Contribution

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.n

## github

https://github.com/moushicheng/formily-expression-support
