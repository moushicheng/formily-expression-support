# Formily-expression-support

[english](https://github.com/moushicheng/formily-expression-support/blob/master/README.md)|[中文](https://github.com/moushicheng/formily-expression-support/blob/master/README_CN.md)

formily 表达式的语法支持插件

![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/preview.gif?raw=true)

## feature

- 支持代码高亮
- 支持代码补全
  如果你想获得完整的代码补全功能，请设置 editor.quickSuggestions.string->on

  ![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/image.png?raw=true)

  或者设置配置在.vscode/setting.json，如下 ⬇️

  ```
  "editor.quickSuggestions": {
    "other": "on",
    "comments": "off",
    "strings": "on"
  }
  ```

- 自动格式化你的表达式
你可以关闭该功能在setting.json中，使用Formily.useFormatter配置
## Contribution

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a HTML document
  - Type `<d|` to try HTML completion
  - Type `<style>.foo { c| }</style>` to try CSS completion

## github

https://github.com/moushicheng/formily-expression-support
