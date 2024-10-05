function createFlatCollection(map = new Map()) {
    const flatCollection = {
        idMap: map,
        find(refID) {
            if(this.idMap.has(refID)) {
                return this.idMap.get(refID);
            }
            else return undefined;
        },
        add(taskObject) {
            this.idMap.set(taskObject.refID, taskObject);
        },
        remove(taskObject) {
            this.idMap.delete(taskObject.refID);
        },
        list() {
            return this.idMap.values();
        },
    };

    return flatCollection;
}

const flatCollection = createFlatCollection();

const rootCollection = {
    children: [],
    refID: 1
};

flatCollection.add(rootCollection);

function linkTree(flat = flatCollection, root = rootCollection) {
    for(const referenceID of flat) {
        const taskObject = flat.get(referenceID);

        if(taskObject.children.length > 0) {
            taskObject.children.forEach(child => {
                const childTaskObject = flat.find(child);
                if(childTaskObject) child = childTaskObject;
            });
        };

        if(taskObject.parents.length > 0) {
            taskObject.parents.forEach(parent => {
                const parentTaskObject = flat.find(parent);
                if(parentTaskObject) parent = parentTaskObject;
            });
        } else {
            taskObject.parents[0] = root;
        }
    };
    return flat;
};

function flattenTree(flat = flatCollection) {
    for(const taskObject in flat.list()) {
        if(taskObject.children.length > 0) {
            taskObject.children.forEach(child => {
                const childID = child.refID;
                child = childID;
            });
        }
        
        if(taskObject.parents.length > 0) {
            taskObject.parents.forEach(parent => {
                const parentID = parent.refID;
                parent = parentID;
            })
        }
    }
    return flat;
}; 