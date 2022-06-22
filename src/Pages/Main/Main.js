import React from "react"

import { useState} from "react"

import firebaseApp from "../../Firebase/firebase.js"
import { onSnapshot, getFirestore, doc, setDoc} from "@firebase/firestore"
import { getAuth, onAuthStateChanged} from "firebase/auth";

import Navbar from "../../Components/Navbar/Navbar.js"
import Footer from "../../Components/Footer/Footer.js"
import "./Main.css"

const Main = () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [User, setUser] = useState('...');
    const [UID, setUID] = useState('');
    const [Username, setUsername] = useState('. . .');

    // function preventBack(){
    //     window.history.forward();
    // }

    // setTimeout("preventBack()",0);

    // window.onunload = null;

    onAuthStateChanged(auth, (User) => {
        if(User)
            setUID(User.uid);
        else{
            if(window.location.pathname === "/main-page"){
                document.body.style.display = "none";
                window.location.href = "/";
            }
        }
    });

    if (UID.toString()) {
        onSnapshot(doc(db, "Users", UID.toString()), (doc) => {
            const t = doc.data();
            setUser(t.Name.split(' ')[0]);
            setUsername(t.Username);
            if(t.Data[0] && t.Data[1]){
                document.getElementById('text-area').innerHTML = t.Data.join("\n");
            }
            else{
                document.getElementById('text-area').innerHTML = '';
            }
        });
    }

    const setNotes = async (e) => {
        if(e){
            // console.log(e);
            await setDoc(doc(db,"Users", UID.toString()),{
                Data: e.split("\n")
            }, {merge: true})
        }
        else{
            await setDoc(doc(db,"Users", UID.toString()),{
                Data: " "
            }, {merge: true})
        }
    }

    return (
        <div className="main">
            <Navbar />

            <div id="landed-page">
                <div className="header">
                    <h3 >Welcome to YourNote, {User}!! </h3>
                </div>
                <main className="notes-area">
                    <h3 className="sub-header">Notes Box</h3>
                    <div className="holder">
                        <textarea
                            className="comment-div"
                            //type="text"
                            placeholder={"Note by " + Username.toString()}
                            name="text-area"
                            id="text-area"                            
                            onChange={(event) => {
                                setNotes(event.target.value);
                            }}
                        />

                    </div>
                </main>
                <main className="box">
                    <h3 className="sub-header">About Project</h3>
                    <div className="info">
                        <p className="para">
                            This is a simple project in<strong> ReactJS and Firebase</strong>, able to perform authentications such as sign-in, sign-up and logout.
                            Furthermore, it allows you to keep permanent notes, stored in Firebase.
                        </p>
                        <hr />
                        <p className="lower-para">Developed by: Maitrey Bhute<br />
                            <hr />Checkout on: <a target="_blank" href="https://github.com/Maitrey1111">GitHub</a>
                        </p>
                    </div>
                </main>

            </div>
            <Footer />
        </div >
    );
}

export default Main;
