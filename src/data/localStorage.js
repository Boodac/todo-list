const STORAGE_TYPE = "localStorage";

const storage = (function (){
    let reference = {};

    const storageVerified = () => {
        let store;
        try {
            store = window[STORAGE_TYPE];
            const testString = "{[storage/test]};";
            store.setItem(testString, testString);
            store.removeItem(testString);
            return true;
        } catch (error) {
            return (error instanceof DOMException && error.name === "QuotaExceededError" && storage && storage.length !== 0);
        };
    };

    const checkConfig = (storageObject) => {
        if(!storageObject.getItem("config")) initStorage(storageObject);
    };

    const initStorage = (storageObject) => {
        
    };

    if(storageVerified()) {
        reference = window[STORAGE_TYPE];
    } else {
        reference = { // return a storage interface
            data: new Map(),
            setItem(keyName, keyValue) {
                return this.data.set(keyName, keyValue);
            },
            getItem(keyName) {
                return this.data.get(keyName);
            },
            removeItem(keyName) {
                return this.data.delete(keyName);
            },
            clear() {
                return this.data.clear();
            },
            key(index) { 
                return [...this.data.keys()][index];
            }
        };
    };

    checkConfig(reference);

    return reference;
})();