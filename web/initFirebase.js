function initFirebase(callback) {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDOF1XvuQEf4-9sbGGtwYR0asJmESEzHCA",
        authDomain: "satvikgupta-portfolio.firebaseapp.com",
        projectId: "satvikgupta-portfolio",
        storageBucket: "satvikgupta-portfolio.appspot.com",
        messagingSenderId: "923253458526",
        appId: "1:923253458526:web:5e198f773fbc014e1296cf",
        measurementId: "G-PNFVE8VWJE"
    };

    // console.log(firebaseConfig)  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    console.log(app);

    const initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("here");
                callback(user);

            } else {
                // User is signed out.
                console.log('User is signed out')
                document.getElementsByTagName('h1')[0].innerHTML = 'Login to access this page.'

                // document.getElementById('sign-in-status').textContent = 'Signed out';
                // document.getElementById('sign-in').textContent = 'Sign in';
                // document.getElementById('account-details').textContent = 'null';
            }
        }, function (error) {
            console.log(error);
        });
    };

    window.addEventListener('load', function () {
        initApp()
    });
}



export default initFirebase;