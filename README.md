# Formily-expression-support

support formily expression

![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/preview.gif?raw=true)

## feature

- support code highlight
- support code completion
  if you want to use whole completion support, please set editor.quickSuggestions.string->on
  ![Alt text](https://github.com/moushicheng/formily-expression-support/blob/master/assets/logo.png?raw=true)

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
