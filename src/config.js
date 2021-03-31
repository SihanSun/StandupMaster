import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC0J4Wuzg2DzZpdCj-DRAxpaulaIjGUJ-A",
    authDomain: "standup-master.firebaseapp.com",
    databaseURL: "https://standup-master-default-rtdb.firebaseio.com",
    projectId: "standup-master",
    storageBucket: "standup-master.appspot.com",
    messagingSenderId: "211044209153",
    appId: "1:211044209153:web:3e3d56ea0778d3868ce600",
    measurementId: "G-VLVDM4Z7SJ"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();