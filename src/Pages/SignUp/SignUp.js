
import react from "react"
import reactDom from "react-dom"
import { useState } from "react"

import firebaseApp from "../../Firebase/firebase.js"
import { getFirestore, doc, setDoc, addDoc } from "@firebase/firestore"
import {
    getAuth, signInWithEmailAndPassword,
    onAuthStateChanged, createUserWithEmailAndPassword, updateCurrentUser
} from "firebase/auth";

import "./SignUp.css"
import capitalize from "../functions.js"

const SignUp = () => {

    const auth = getAuth();
    const db = getFirestore(firebaseApp);

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [User, setUser] = useState();

    const Signup = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm-password').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;

        document.getElementById("errors").style.display = "none";

        //### Password Processing
        if (password === confirm_password) {

            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;

                    //firestore add-up                
                    setDoc(doc(db, "Users", uid), {
                        Name: name,
                        Email: email,
                        Username: username
                    }, { merge: true });

                    //window.location.href = "/";
                })
                .catch((error) => {
                    const errorCode = error.code;

                    const e = capitalize(errorCode.substring(5).split('-').join(' '));
                    if (e == "Internal Error")
                        document.getElementById("errors").innerText = "Password field can't be blank";
                    else
                        document.getElementById("errors").innerText = e;

                    document.getElementById("errors").style.display = "flex";
                });

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setUser(user.uid)
                    window.location.href = "/main-page";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    const e = capitalize(errorCode.substring(5).split('-').join(' '))

                    if (e == "Internal Error")
                        document.getElementById("errors").innerText = "Password field can't be blank";
                    else
                        document.getElementById("errors").innerText = e;

                    document.getElementById("errors").style.display = "flex";
                });
        }
        else {
            document.getElementById("errors").innerText = "Passwords don't match";
            document.getElementById("errors").style.display = "flex";
        }

    }


    return (
        <div className="SignUp">
            <div id="sign-up-page">
                <div className="header-sign-up">
                    <h3 >Signup to YourNote</h3>
                </div>
                <main className="input-box">
                    <h3 className="sub-header-sign-up">Sign Up</h3>
                    <div className="inputs">
                        <input className="email-input" id="name" type="text" placeholder="Name"></input>
                        <input className="email-input" id="username" type="text" placeholder="Username"></input>
                        <input className="email-input" id="email" type="email" placeholder="Email"></input>
                        <input className="password-input" id="password" type="password" placeholder="Password"></input>
                        <input className="password-input" id="confirm-password" type="password" placeholder="Confirm the Password"></input>
                    </div>
                    <button onClick={() => { Signup() }} className="signup-button">Signup</button>
                    <div id="errors">Email or Password are not valid</div>

                </main>
            </div>




        </div>
    );
}

export default SignUp;
