import tl = require('vsts-task-lib/task');
export function recursiveProcessing(obj: any, prefix: string): void {
    if (obj instanceof Array) {
        for (var index = 0; index < obj.length; index++) {
            var element = obj[index];
            recursiveProcessing(element, prefix + "_" + index.toString());
        }
    } else if (typeof obj === "string") {
        console.log("Injecting variable : " + prefix + ", value : " + obj);
        tl.setVariable(prefix, obj);
    } else if (typeof obj === "number" || typeof obj === "boolean") {
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
}
