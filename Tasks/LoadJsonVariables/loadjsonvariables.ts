import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
try {
    
    var jsonSource = tl.getPathInput("JsonSource");
    var variablePrefix = tl.getInput("VariablePrefix");

    var jsonContent = fs.readFileSync(jsonSource, { encoding: 'utf8' });
    var json = JSON.parse(jsonContent);

    var recursiveProcessing = (obj: any, prefix: string)=>{
        if (obj instanceof Array){
            for (var index = 0; index < obj.length; index++) {
                var element = obj[index];
                recursiveProcessing(element, prefix + "_" + index.toString());
            }
        } else if (typeof obj === "string") {
            console.log("Injecting variable : " + prefix + ", value : " + obj);
            tl.setVariable(prefix, obj);
        } else if (typeof obj === "number") {
            console.log("Injecting variable : " + prefix + ", value : " + obj.toString());
            tl.setVariable(prefix, obj.toString());
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var element = obj[key];
                    recursiveProcessing(element, prefix + "_" + key);
                }
            }
        }
    };

    recursiveProcessing(json, variablePrefix);

    tl.setResult(tl.TaskResult.Succeeded, "Variables loaded");
} catch (err) {
    console.error(String(err));
    tl.setResult(tl.TaskResult.Failed, String(err));
}
