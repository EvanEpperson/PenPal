import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBU1o_siRDvEJEYSxOvIh60egQMmQud1FY",
  databaseURL: "https://penpalsweb-default-rtdb.firebaseio.com/",
  projectId: "penpalsweb",
  appId: "1:229700981080:web:1a9f4da5d809eb7e73d52d",
};

export default Firebase.initializeApp(firebaseConfig);
