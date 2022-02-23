import react from "react"
import reactDom from "react-dom"
import { useState, useEffect } from "react"

import firebaseApp from "../../Firebase/firebase.js"
import { onSnapshot, getFirestore, doc, setDoc } from "@firebase/firestore"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import "./Main.css"

function Main() {
    const auth = getAuth();
    const db = getFirestore(firebaseApp);

    const [User, setUser] = useState();
    const [Email, setEmail] = useState();


    /*const user = () => {
        const u = auth.currentUser;
        if(u != null)
            setUser(u.email);
    }*/

    var user;
    onAuthStateChanged(auth, (User) => {
        if (User) {
            const uid = User.uid;
            user = auth.currentUser;
            //console.log(uid);
        }
        else
            console.log("User logged out");
    });

    useEffect(() => {    
        user = auth.currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
            console.log(uid);    
        }
        onSnapshot(doc(db, "Users", uid), (doc) => {
            const t = doc.data();
            setUser(t.Username);
            console.log(User);
        }); 

    });



    const Logout = () => {
        onAuthStateChanged(auth, (User) => {
            if (User) {
                const uid = User.uid;
                //console.log(uid);
                auth.signOut();
                window.location.href = "/";
                auth.props.history.replaceState("/")
            }
            else
                console.log("User logged out");
        });
    }



    return (
        <div id="landed-page">
            <div className="header">
                <h3 >Hello, User {User}!!</h3>
            </div>
            <main className="input-box">
                <h3 className="sub-header">Page Under Construction</h3>
                <button onClick={() => { Logout() }} className="logout-button">Logout</button>
            </main>
            <main className="input-box">
                <h3 className="sub-header">About Project</h3>
                <p>This is a project able to perform authentications such as sign-in, sign-up and logout.</p>
                <p>Developed by: Maitrey Bhute</p>
                <p>Checkout on: <a target="_blank" href="">GitHub</a> </p>
            </main>
        </div>
    );
}

export default Main;
