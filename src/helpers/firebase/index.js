import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA13ms2nySao4vyGIOOOATrfDqxMjA_3rE",
    authDomain: "dashboardapp-a0f33.firebaseapp.com",
    databaseURL: "https://dashboardapp-a0f33.firebaseio.com",
    projectId: "dashboardapp-a0f33",
    storageBucket: "dashboardapp-a0f33.appspot.com",
    messagingSenderId: "455635510414",
    appId: "1:455635510414:web:41b60d1c480454a6"

}


const valid =firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;

const firebaseApp = valid && firebase.initializeApp(firebaseConfig);

class FirebaseHelper {
    isValid = valid;

    constructor() {
        
        this.database = this.isValid && firebase.firestore();
        if (this.database) {
            const settings = { timestampsInSnapshots: true };
            this.database.settings(settings);
        }

        this.rsf = this.isValid && new ReduxSagaFirebase(firebaseApp, firebase.firestore());
        this.rsfFirestore = this.isValid && this.rsf.firestore;
    }

    processFireStoreCollection(snapshot) {
        let data = {};
        snapshot.forEach(doc => {
          data = {
            ...data,
            [doc.id]: doc.data(),
          };
        });
        return data;
      }
}

export default new FirebaseHelper();
