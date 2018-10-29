import firebase from 'react-native-firebase'

const devicesCollection = firebase.firestore().collection('devices')

export default class InventoryApiService {

    static async addItem(item) {
        return devicesCollection.add(item.data).then(doc => {
            console.log(">>> addItem success: ", doc.id)
            return { id: doc.id, data: item.data }
        }).catch(error => {
            console.log(">>> addItem error: ", error)
            return error
        });
    }


    static async getItemById(id) {
        return devicesCollection.doc(id).get()
            .then((doc) => {
                if (doc.metadata.fromCache) {
                    console.log(">>> getItemById failed -- returned cached item.")
                    throw "Request failed."
                }
                console.log(">>> getItemById success")
                return {
                    id: doc.id,
                    data: doc.data()
                }
            })
    }

    static async getItemBySerial(serial) {
        return devicesCollection.where("serial", "==", serial).get()
            .then((snapshot) => {
                console.log(">>> getItemBySerial success")
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                )[0]
            })
            .catch((error) => {
                console.log(">>> getItemBySerial error: ", error)
                return error
            })
    }

    static async subscribeToInventory(onItemChange) {
        return devicesCollection.onSnapshot(onItemChange)
    }

    static async getItems() {
        return devicesCollection.get()
            .then((snapshot) => {
                console.log(">>> getItems success")
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                )
            })
            .catch((error) => {
                console.log(">>> getItems error: ", error)
                return error
            })
    }

    static async updateItem(item) {
        return devicesCollection.doc(item.id).update(item.data)
            .then((doc) => {
                console.log(">>> updateItem success: ", doc)
                return doc
            })
    }

    static async deleteItem(item) {
        return devicesCollection.doc(item.id).delete()
            .then(() => {
                console.log(">>> deleteItem success: ", item.id)
                return item.id
            })
            .catch((error) => {
                console.log(">>> deleteItem error: ", error)
                return error
            })
    }
}
