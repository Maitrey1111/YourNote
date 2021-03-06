import React from "react";

import firebaseApp from "../../Firebase/firebase.js"
import { getAuth, onAuthStateChanged, } from "firebase/auth";

import "./Navbar.css"

function Navbar() {

    const auth = getAuth(firebaseApp);

    const Logout = () => {
        onAuthStateChanged(auth, (User) => {
            if (User) {
                // const uid = User.uid;
                auth.signOut();
                window.location.href = "/";
                console.log(window.history.state());
            }
        });
    }

    return (
        <div className="navbar">
            <ul className="navbar-holder">
                <button onClick={() => { Logout() }} className="logout-button">
                    <h4 className="button-text">Logout</h4>
                </button>
            </ul>
        </div>
    );
}

export default Navbar;