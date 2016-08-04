![Icon](https://github.com/geeklearningio/gl-vsts-tasks-variables/blob/master/Extension/extension-icon.png)

# Variables Helpers Build and Release Tasks

![cistatus](https://geeklearning.visualstudio.com/_apis/public/build/definitions/f841b266-7595-4d01-9ee1-4864cf65aa73/48/badge)

Visual Studio Team Services Build and Release Management extensions that help you manipulate and load variables.

[Learn more](https://github.com/geeklearningio/gl-vsts-tasks-variables/wiki) about this extension on the wiki!

## Tasks included

* **[Load JSON Variables](https://github.com/geeklearningio/gl-vsts-tasks-variables/wiki/Load-JSON-Variables)**: Load variables from a JSON file

## To contribute

1. Globally install typescript and tfx-cli (to package VSTS extensions): `npm install -g typescript tfx-cli`
2. From the root of the repo run `npm install`. This will pull down the necessary modules for the different tasks and for the build tools.
3. Run `npm run build` to compile the build tasks.
4. Run `npm run package -- --version <version>` to create the .vsix extension packages (supports multiple environments) that includes the build tasks.

## Release Notes

> **8-4-2016**
> - Added: Load JSON Variables

## Contributors

This extension was created by [Geek Learning](http://geeklearning.io/), with help from the community.

## Attributions

* [JSON File by Oliviu Stoian from the Noun Project](https://thenounproject.com/search/?q=json&i=271662)
