import { observable } from 'mobx';

export default class BaseStore {

    @observable isRefresing = false;
    
}
