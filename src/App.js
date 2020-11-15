import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";


firebase.initializeApp({

});


const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
          <section>
            {user ? <ChatRoom/> : <SignIn />}
          </section>
      </header>
    </div>
  );
}
  function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then(r => console.log(r)).catch(console.log);
  }
    return (
      <button onClick={signInWithGoogle}>Zaloguj sie za pomocą google</button>
    )
  }

  function ChatRoom() {
    return(
        <div>

        </div>
    )
  }


export default App;
