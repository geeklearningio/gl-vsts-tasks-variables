import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
var plist = require('plist');
import {recursiveProcessing} from './common/expandJObject';

try {
    
    var source = tl.getPathInput("PlistSource");
    var variablePrefix = tl.getInput("VariablePrefix");
    var isSecret = tl.getBoolInput("MarkAsSecret");

    var content = fs.readFileSync(source, { encoding: 'utf8' });
    var jObject = plist.parse(content);

    recursiveProcessing(jObject, variablePrefix, isSecret);

    tl.setResult(tl.TaskResult.Succeeded, "Variables loaded");
} catch (err) {
    console.error(String(err));
    tl.setResult(tl.TaskResult.Failed, String(err));
}
