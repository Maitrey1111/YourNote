// import { useState } from "react";
import React from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import "./SignIn.css";

const SignIn = () => {

  const auth = getAuth();
  // const [User, setUser] = useState();

  const Login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        
        onAuthStateChanged(auth, (user) => {
          if (user != null) {
            //setUser(user);
            console.log("User is logged in");
            //const uid = User.uid;
            
          } 
          else     
            console.log("User logged out");
        });

        window.location.href = "/main-page";

      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        const e = errorCode.substring(5).split('-').join(" ").toUpperCase();
        
        if(e === "INTERNAL ERROR")
          document.getElementById("errors").innerText = "Password field can't be blank".toUpperCase();
        else
          document.getElementById("errors").innerText = e;

        document.getElementById("errors").style.display = "flex";

      });
  }

  return (
    <div className="SignIn">
      <div id="sign-in-page">
        <div className="header-sign-in">
          <h3 >Login to YourNote</h3>
        </div>
        <main className="input-box">
          <h3 className="sub-header-sign-in">Sign In</h3>
          <div className="inputs">
            <input className="email-input" id="email" type="email" placeholder="Email"></input>
            <input className="password-input" id="password" type="password" placeholder="Password"></input>
          </div>
          <button onClick={() => { Login() }} className="login-button">Login</button>
          <div id="errors">Email or Password is not valid or incorrect</div>
          <div className="signup-noti">
            <h3>New user? <a href="/sign-up">Sign Up</a></h3>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignIn;
