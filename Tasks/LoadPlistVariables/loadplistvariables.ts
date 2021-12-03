import fs = require("fs-extra");
import tl = require("azure-pipelines-task-lib");
let plist = require("plist");
import { recursiveProcessing } from "./common/expandJObject";

try {
    let source = tl.getPathInput("PlistSource");
    let variablePrefix = tl.getInput("VariablePrefix");
    let isSecret = tl.getBoolInput("MarkAsSecret");

    let content = fs.readFileSync(source, { encoding: "utf8" });
    let jObject = plist.parse(content);

    recursiveProcessing(jObject, variablePrefix, isSecret);

    tl.setResult(tl.TaskResult.Succeeded, "Variables loaded");
} catch (err) {
    // tslint:disable-next-line: no-console
    console.error(String(err));
    tl.setResult(tl.TaskResult.Failed, String(err));
}
