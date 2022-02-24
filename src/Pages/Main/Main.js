import react from "react"
import reactDom from "react-dom"
import { useState, useEffect } from "react"

import firebaseApp from "../../Firebase/firebase.js"
import { onSnapshot, getFirestore, doc, setDoc, collection } from "@firebase/firestore"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";

import background from "../../Assets/Images/8289.jpg"
import Navbar from "../../Components/Navbar/Navbar.js"
import Footer from "../../Components/Footer/Footer.js"
import "./Main.css"


const Main = () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [User, setUser] = useState('...');
    const [UID, setUID] = useState('');
    const [Username, setUsername] = useState({});


    onAuthStateChanged(auth, (User) => {
        const uid = User?.uid;
        setUID(uid);
    });

    if (UID.toString()) {
        onSnapshot(doc(db, "Users", UID.toString()), (doc) => {
            const t = doc.data();
            setUser(t.Name.split(' ')[0]);
            setUsername(t.Username);
            document.getElementById('text-area').innerHTML = t.Data.join("\n");
        });
    }

    const setNotes = async (e) => {
        if(e){
            console.log(e);
            await setDoc(doc(db,"Users", UID.toString()),{
                Data: e.split("\n")
            }, {merge: true})
        }
        else{
            await setDoc(doc(db,"Users", UID.toString()),{
                Data: "--"
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
                            placeholder={"Note by " + Username}
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
