import firebase from 'react-native-firebase'

const storage = firebase.storage().ref();

export default class StorageApiService {

    constructor() {
        storage.setMaxOperationRetryTime(5000)
    }

    static async getInventoryItemImageUrl(inventoryId, itemId) {
        const inventoryAssets = storage.child(inventoryId)
        const imageName = `${itemId}.png`
        return inventoryAssets.child(imageName).getDownloadURL()
    }

}
