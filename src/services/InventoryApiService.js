import firebase from 'react-native-firebase'

const devicesCollection = firebase.firestore().collection('devices')

export default class InventoryApiService {

    static async addDevice(device) {
        return devicesCollection.add(device.data).then(doc => {
            console.log(">>> addDevice success: ", doc.id)
            return { id: doc.id, data: device.data }
        }).catch(error => {
            console.log(">>> addDevice error: ", error)
            return error
        });
    }


    static async getDeviceById(id) {
        return devicesCollection.doc(id).get()
            .then((doc) => {
                console.log(">>> getDeviceById success")
                return {
                    id: doc.id,
                    data: doc.data()
                }
            })
            .catch((error) => {
                console.log(">>> getDeviceById error: ", error)
                return error
            })
    }

    static async getDeviceBySerial(serial) {
        return devicesCollection.where("serial", "==", serial).get()
            .then((snapshot) => {
                console.log(">>> getDeviceBySerial success")
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                )[0]
            })
            .catch((error) => {
                console.log(">>> getDevices error: ", error)
                return error
            })
    }

    static async getDevices() {
        return devicesCollection.get()
            .then((snapshot) => {
                console.log(">>> getDevices success")
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                )
            })
            .catch((error) => {
                console.log(">>> getDevices error: ", error)
                return error
            })
    }

    static async updateDevice(device) {
        return devicesCollection.doc(device.id).update(device.data)
            .then((doc) => {
                console.log(">>> updateDevice success: ", doc)
                return doc
            })
            .catch((error) => {
                console.log(">>> updateDevice error: ", error)
                return error
            })
    }

    static async deleteDevice(device) {
        return devicesCollection.doc(device.id).delete()
            .then(() => {
                console.log(">>> deleteDevice success: ", device.id)
                return device.id
            })
            .catch((error) => {
                console.log(">>> deleteDevice error: ", error)
                return error
            })
    }
}
