import { observable, action } from 'mobx';
import BaseStore from './BaseStore';

export default class UsersStore extends BaseStore {

    /**
     * Users path.
     */
    USER_PATH = `${this.POSTS_URI}/users`;

    /**
     * User observable.
     */
    @observable users = [];

    /**
     * Fetchs users data from server.
     */
    @action
    async fetchUsersAsync() {
        try {
            this.isRefresing = true;
            const response = await fetch(`${this.USER_PATH}`);
            this.users = await response.json();
        } catch (error) {
            console.log(`fetchUsersAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
        } finally {
            this.isRefresing = false;
        }
    }
}
