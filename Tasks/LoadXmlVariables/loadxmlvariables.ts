import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
import {recursiveProcessing} from './common/expandJObject';
var jxon = require('jxon');

try {
    
    var source = tl.getPathInput("XmlSource");
    var variablePrefix = tl.getInput("VariablePrefix");

    var content = fs.readFileSync(source, { encoding: 'utf8' });
    var jObject = jxon.stringToJs(content);

    recursiveProcessing(jObject, variablePrefix);

    tl.setResult(tl.TaskResult.Succeeded, "Variables loaded");
} catch (err) {
    console.error(String(err));
    tl.setResult(tl.TaskResult.Failed, String(err));
}