import { buildTask } from "./index.js";

export const taskCollection = (function (){
    const idMap = new Map();
    const RootCollection = {
        myTasks: [],
        refID: "myTasks",
        removeChild(refID) {
            this.myTasks = this.myTasks.filter(ID => {
                return ID === refID;
            });
        },
        addChild(refID) {
            this.myTasks.push(refID);
        }
    };

    const add = (task) => {
        if(typeof task === "string") {
            idMap.set(JSON.parse(task).refID, task);
        } else {
            idMap.set(task.refID, task);
        }

        if(typeof task === "string") task = JSON.parse(task);

        if(task.parents.length === 0) {
            task.parents.push(RootCollection.refID);
            RootCollection.addChild(task.refID);
        } else {
            task.parents.forEach((parentID) => {
                if(parentID === RootCollection.refID) RootCollection.addChild(task.refID);
            });
        };
    };

    const get = (refID) => {
        if(refID === RootCollection.refID) {
            return [... RootCollection.myTasks];
        };
        if(idMap.has(refID)) {
            let result = idMap.get(refID);
            if(typeof result === "object") return result;
            else {
                hotSwap(refID);
                return idMap.get(refID);
            }
        } else return undefined;
    };

    const remove = (task) => {
        if(typeof task === "string") task = JSON.parse(task);
        idMap.delete(task.refID);
        if(task.parents.length === 0) {
            RootCollection.removeChild(task);
        } else {
            task.parents.forEach((parentID) => {
                if(parentID === RootCollection.refID) RootCollection.removeChild(task);
            });
        };
    };

    function hotSwap(refID) {
        let entry = idMap.get(refID);
        let resultingObject = buildTask(entry).result();
        idMap.delete(refID);
        idMap.set(refID, resultingObject);
    };

    const load = (loaderArray) => {
        console.log(loaderArray);
    };

    const verify = (refID) => {
        idMap.set(refID, localStorage.getItem(refID));
    };

    idMap.set(RootCollection.refID, RootCollection.myTasks);

    return { add, get, remove, load, verify };
})();