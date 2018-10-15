import { observable } from 'mobx';

export default class BaseStore {

    /**
     * Posts URI Host.
     */
    POSTS_URI = 'https://jsonplaceholder.typicode.com';

    /**
   * Indicates wheather the 
   */
    @observable isRefresing = false;
}
