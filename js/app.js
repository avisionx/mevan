var firebaseConfig = {
    apiKey: "AIzaSyD4HcCq-tsEtFXOFTnsVbmCbr6IyktN3_Q",
    authDomain: "maven-49bdb.firebaseapp.com",
    databaseURL: "https://maven-49bdb.firebaseio.com",
    projectId: "maven-49bdb",
    storageBucket: "",
    messagingSenderId: "986917107960",
    appId: "1:986917107960:web:cc3e6a9ca4c41c8e"
  };

firebase.initializeApp(firebaseConfig);

function login(e) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    firebase.auth().useDeviceLanguage();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

function logout(e) {
    firebase.auth().signOut();
    document.location.href = "./index.html";
}
