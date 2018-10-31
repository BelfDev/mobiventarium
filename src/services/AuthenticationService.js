import firebase from 'react-native-firebase'

const authentication = firebase.auth()
export default class AuthenticationService {
static async login(email, password,context) {
console.log("contect==>",context)
        return authentication.signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((credential) => {
                console.log("==========autenticado=======")
                console.log('user=======>', credential.user.toJSON())
            })
            .catch(err => {
                console.log("erro no login========>", err.code)
                return err.code
            })
    }
    static async signUp(email, password,context) {
        return authentication.createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => console.log("criado"))
            .catch(err => {
                console.log("erro no cadastro========>", err.code)
                return err.code
            })
    }

}