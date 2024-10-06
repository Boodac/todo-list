function createTaskCollection() {
    const idMap = new Map();
    const objMap = new Map();
    const RootCollection = {
        children: [],
        refID: 1,
        removeChild(taskObject) {
            this.children.filter(task => task !== taskObject);
        },
        addChild(taskObject) {
            if(this.children.indexOf(taskObject) === -1) this.children.push(taskObject);
        }
    };

    const get = (refID) => {
        if(this.idMap.has(refID)) return this.idMap.get(refID);
        else return undefined;
    };

    const add = (taskObject) => {
        if(typeof taskObject !== "object") throw new Error(`Cannot add ${typeof taskObject} to task collection`);
        this.idMap.set(taskObject.refID, taskObject);
        this.objMap.set(taskObject, yieldChildrenOf(taskObject));
        if(taskObject.refID === RootCollection.refID) return;

        const parents = yieldParentsOf(taskObject);
        if(taskObject.parents.length === 0) {
            this.RootCollection.addChild(taskObject);
            parents.push(RootCollection.refID);
        } else {
            parents.forEach((parentID) => {
                if(parentID === RootCollection.refID) {
                    this.RootCollection.addChild(taskObject);
                };
            });
        };
        return this;
    }

    const remove = (task) => {
        if(typeof task === "string") {
            return removeById(task);
        };
        this.idMap.delete(task.refID);
        this.objMap.delete(task);
        if(task.parents.length === 0) {
            this.RootCollection.removeChild(task);
        } else {
            task.parents.forEach((parentID) => {
                if(parentID === 1) {
                    this.RootCollection.removeChild(task);
                };
            });
        };
        return this;
    }

    function removeById(refID) {
        if(refID === 1) throw new Error("cannot remove the root");
        let taskObject = {};
        if(typeof refID === "object") taskObject = refID;
        else taskObject = this.getById(refID);
        
        return this.remove(taskObject);
    };

    function yieldParentsOf(task) {
        if(typeof task === "string") task = this.get(task);
        const parentIDsArray = [...task.parents];
        const parentObjectArray = [];

        parentIDsArray.forEach(parentID => {
            const parentTaskObject = this.getById(parentID);
            parentObjectArray.push(parentTaskObject);
        });

        return parentObjectArray;
    };

    function yieldChildrenOf(taskObject) {
        const childrenIDsArray = [...taskObject.children];
        const childrenObjectsArray = [];

        childrenIDsArray.forEach(childID => {
            if(childID === 1) return;
            const childTaskObject = this.getById(childID);
            childrenObjectsArray.push(childTaskObject);
        });

        return childrenObjectsArray;
    };

    const getChildrenOf = (task) => {
        if(typeof task === "string") task = this.get(task);

        return objMap.get(task);
    };

    const flatten = () => {
        const fullCollection = [];

        this.remove(RootCollection);

        const taskArray = [...idMap.values()];

        taskArray.forEach(task => {
            task = task.convertToJson();
            fullCollection.push(task);
        });

        return fullCollection;
    };

    add(RootCollection);

    return { get, add, remove, getChildrenOf, flatten }
};

export default createTaskCollection();