import buildTask from "./index.js";

const taskCollection = (function () {
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
            this.idMap.set(JSON.parse(task).refID, task);
        } else {
            this.idMap.set(task.refID, task);
        }

        if(task === "string") task = JSON.parse(task);

        if(task.parents.length === 0) {
            this.parents.push(RootCollection.refID);
            this.RootCollection.addChild(task.refID);
        } else {
            task.parents.forEach((parentID) => {
                if(parentID === RootCollection.refID) this.RootCollection.addChild(task.refID);
            });
        };
    }

    const get = (refID) => {
        if(refID === RootCollection.refID) {
            return { refID: RootCollection.refID, children: RootCollection.myTasks }
        };
        if(this.idMap.has(refID)) {
            let result = this.idMap.get(refID);
            if(typeof result === "object") return result;
            else {
                hotSwap(refID);
                return this.idMap.get(refID);
            }
        } else return undefined;
    };

    const remove = (task) => {
        if(typeof task === "string") task = JSON.parse(task);
        this.idMap.delete(task.refID);
        if(task.parents.length === 0) {
            this.RootCollection.removeChild(task);
        } else {
            task.parents.forEach((parentID) => {
                if(parentID === RootCollection.refID) this.RootCollection.removeChild(task);
            });
        };
    };

    function hotSwap(refID) {
        let entry = this.idMap.get(refID);
        let resultingObject = buildTask(entry);
        this.idMap.delete(refID);
        this.idMap.set(refID, resultingObject);
    };

    idMap.set(RootCollection.refID, RootCollection.myTasks);

    return { add, get, remove };
});

export default taskCollection;