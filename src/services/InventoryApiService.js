import firebase from 'react-native-firebase'

const devicesCollection = firebase.firestore().collection('devices')

export default class InventoryApiService {

    static async addDevice(device) {
        // let devices = firebase.firestore().collection('devices')
        devicesCollection.add({
            os: device.os,
            type: device.type,
            brand: device.brand,
            model: device.model,
            version: device.version,
            serial: device.serial,
            color: device.color,
            isRented: device.isRented
        });
    }

    static async getDevices() {
        // let devices = firebase.firestore().collection('devices')
        console.log(">>>> Get Devices")

        devicesCollection.get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log("Parent Document ID: ", doc.id)
                })
            })
            .catch((error) => {
                console.log("Error getting sub-collection documents", error);
            })
    }

}

//  os: "android",
//  type: "mobile",
//  brand: "Samsung",
//  model: "Moto G2- XT1069",
//  version: "Android 6.0",
//  serial: "431606277",
//  color: "black",
//  isRented: true
