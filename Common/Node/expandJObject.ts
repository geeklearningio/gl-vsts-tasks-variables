import tl = require('vsts-task-lib/task');
export function recursiveProcessing(obj: any, prefix: string, isSecret: boolean): void {
    var typeArray: string[] =["string", "number", "boolean"];
    if (obj instanceof Array) {
        for (var index = 0; index < obj.length; index++) {
            var element = obj[index];
            recursiveProcessing(element, prefix + "_" + index.toString(), isSecret);
        }
    } else if (typeArray.indexOf(typeof obj) > -1) {
        var objValue = typeArray.indexOf(typeof obj)>0 ? obj.toString() : obj;
        var objDisplayValue = isSecret ? "******" : objValue;
        console.log("Injecting variable : " + prefix + ", value : " + objDisplayValue);
        tl.setVariable(prefix, objValue, isSecret);
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                recursiveProcessing(element, prefix + "_" + key, isSecret);
            }
        }
    }
}
