import ItemStore from './ItemStore'
import SessionStore from './SessionStore'

class RootStores {
    constructor() {
        this.itemStore = new ItemStore()
        this.sessionStore = new SessionStore()
    }
};

export default new RootStores();
