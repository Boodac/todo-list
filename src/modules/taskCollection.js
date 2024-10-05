function createTaskCollection() {
    const idMap = new Map();
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
        if(taskObject.refID === 1) return this;

        const parents = this.getParentsOf(taskObject);
        if(taskObject.parents.length === 0) {
            this.RootCollection.addChild(taskObject);
            parents.push(1);
        } else {
            parents.forEach((parentID) => {
                if(parentID === 1) {
                    this.RootCollection.addChild(taskObject);
                };
            });
        };
        return this;
    }

    const remove = (task) => {
        if(typeof task === "string") {
            this.removeById(task);
            return this;
        };
        this.idMap.delete(task.refID);
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
    };

    const getParentsOf = (task) => {
        if(typeof task === "string") task = this.getById(task);
        const parentIDsArray = [...task.parents];
        const parentObjectArray = [];

        parentIDsArray.forEach(parentID => {
            const parentTaskObject = this.getById(parentID);
            parentObjectArray.push(parentTaskObject);
        });

        return parentObjectArray;
    };

    const getChildrenOf = (task) => {
        if(typeof task === "string") task = this.getById(task);
        const childrenIDsArray = [...task.children];
        const childrenObjectsArray = [];

        childrenIDsArray.forEach(childID => {
            if(childID === 1) return;
            const childTaskObject = this.getById(childID);
            childrenObjectsArray.push(childTaskObject);
        });

        return childrenObjectsArray;
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

    return { get, add, remove, getParentsOf, getChildrenOf, flatten }
};

export default createTaskCollection();