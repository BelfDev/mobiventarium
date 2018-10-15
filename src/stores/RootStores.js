import UsersStore from './UsersStore';

class RootStores {

    constructor() {
        this.usersStore = new UsersStore();
    }
};

export default new RootStores();