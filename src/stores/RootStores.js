import ItemStore from './ItemStore'

class RootStores {
    constructor() {
        this.itemStore = new ItemStore()
    }
};

export default new RootStores();
