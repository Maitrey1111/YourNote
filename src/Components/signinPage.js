
import react from "react"
import reactDom from "react-dom"
import { useState } from "react"

import firebaseApp from "../../Firebase/firebase.js"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import "../Landing/landing.css"

const SignIn= () => {

  const auth = getAuth();

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [User, setUser] = useState();

  const Login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //### Email-processing
    var array = email.split('@');
    if (array[1] && array[0]) {
      var a = email.split('.');
      if (a[1] && a[0]) {
        setEmail(email);
      }
    }

    //### Password Processing
    if (password) {
      setPassword(password);
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if(errorCode === "auth/invalid-email"){
          alert("Invalid Email");
        }
        else if(errorCode === "auth/wrong-password"){
          alert("Invalid Password");
        }
        else if(errorCode === "auth/user-not-found"){

        }
      });
    //console.log(Email, Password);
    //alert("logged-in");
  }

  //const auth = getAuth();
  onAuthStateChanged(auth, (User) => {
    if (User) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = User.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      console.log("User is signed out");
      // ...
    }
  });

  return (
    <div>
    <div className="Landing">
      <div className="header">
        <h3 >Simple Login</h3>
      </div>
      <main className="input-box">
        <h3 className="sub-header">Sign In</h3>
        <div className="inputs">
          <input className="email-input" id="email" type="email" placeholder="Email"></input>
          <input className="password-input" id="password" type="password" placeholder="Password"></input>
        </div>
        <button onClick={() => { Login() }} className="login-button">Login</button>
        <div className="signup-noti">
          <h3>New user? <a href="">Sign Up</a></h3>
        </div>
      </main>
        

      </div>
    </div>
  );
}

export default SignIn;
