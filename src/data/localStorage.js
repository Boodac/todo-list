import { configurations } from "./index.js";

const STORAGE_TYPE = "localStorage";
const TEST_STRING = "{[storage/test]};";

export const storageReference = (function (){
    let reference = {};

    const storageVerified = () => {
        let store;
        try {
            store = window[STORAGE_TYPE];
            store.setItem(TEST_STRING, TEST_STRING);
            store.removeItem(TEST_STRING);
            return true;
        } catch (error) {
            return (error instanceof DOMException && error.name === "QuotaExceededError" && store && store.length !== 0);
        };
    };

    const checkConfig = (storageObject) => {
        if(!storageObject.getItem(configurations[0][0])) populate(storageObject);
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

function populate(storageObject) {
    storageObject.clear();
    configurations.forEach(configuration => {
        storageObject.setItem(configuration[0], configuration[1]);
    });
};