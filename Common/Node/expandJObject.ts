import tl = require("azure-pipelines-task-lib");

export function recursiveProcessing(obj: any, prefix: string, isSecret: boolean): void {
    let typeArray: string[] = ["string", "number", "boolean"];
    if (obj instanceof Array) {
        for (let index = 0; index < obj.length; index++) {
            let element = obj[index];
            recursiveProcessing(element, prefix + "_" + index.toString(), isSecret);
        }
    } else if (typeArray.indexOf(typeof obj) > -1) {
        let objValue = typeArray.indexOf(typeof obj) > 0 ? obj.toString() : obj;
        let objDisplayValue = isSecret ? "******" : objValue;
        // tslint:disable-next-line: no-console
        console.log("Injecting variable : " + prefix + ", value : " + objDisplayValue);
        tl.setVariable(prefix, objValue, isSecret);
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let element = obj[key];
                recursiveProcessing(element, prefix + "_" + key, isSecret);
            }
        }
    }
}
