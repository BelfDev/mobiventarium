import firebase from 'react-native-firebase'

const usersCollection = firebase.firestore().collection('users')

export default class UserDataApiService {

    static async getUserDataById(id) {
        return usersCollection.doc(id).get()
            .then((doc) => {
                if (doc.metadata.fromCache) {
                    console.log(">>> getUserDataById failed -- returned cached item.")
                    throw "Request failed."
                }
                console.log(">>> getUserDataById success")
                return doc.data()
            })
    }

    static async createUserDataIfNeeded(user) {
        try {
            const response = await usersCollection.doc(user.id).set(user.data)
            console.log(">>> createUserData RESPONSE: ", response)
            return response
        } catch (error) {
            console.log(">>> createUserData error: ", error)
        }
    }

    static async updateUserData(user) {
        return usersCollection.doc(user.id).update(user.data)
            .then((doc) => {
                console.log(">>> updateItem success: ", doc)
                return doc
            })
    }
}
