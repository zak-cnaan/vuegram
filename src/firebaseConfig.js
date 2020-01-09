import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyAzTYKbE9A_l4c8eRSys0CpsdNRTua0sTA",
  authDomain: "cropchien-d273d.firebaseapp.com",
  databaseURL: "https://cropchien-d273d.firebaseio.com",
  projectId: "cropchien-d273d",
  storageBucket: "cropchien-d273d.appspot.com",
  messagingSenderId: "664225618480",
  appId: "1:664225618480:web:1bf8fc4be7bc9e4e22ebf5"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
// const settings = {
//   timestampsInSnapshots: true
// };
// db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const treesCollection = db.collection("trees");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  treesCollection,
  commentsCollection,
  likesCollection
};
