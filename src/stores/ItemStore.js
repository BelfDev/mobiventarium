import { observable, action } from 'mobx';
import BaseStore from './BaseStore';
import InventoryApiService from '../services/InventoryApiService'

export default class ItemStore extends BaseStore {

    @observable deviceList = []

    @action
    async getDevices() {
        try {
            this.isRefresing = true
            const devices = await InventoryApiService.getDevices()
            this.deviceList = devices
        } catch (error) {
            console.log(`getDevices (ERROR) - ${JSON.stringify(error.message, null, 2)}`);
        } finally {
            this.isRefresing = false
        }
    }
}
