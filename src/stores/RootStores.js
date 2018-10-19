import UsersStore from './UsersStore'
import ItemStore from './ItemStore'

class RootStores {
    constructor() {
        this.usersStore = new UsersStore()
        this.itemStore = new ItemStore()
    }
};

export default new RootStores();
