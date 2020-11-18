import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, {useState} from "react";


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
              <SignOut />
          </section>

      </header>
    </div>
  );
}
  function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then(r => console.log("Zalogowanie przeszło pomyślnie")).catch(console.log);
  }
    return (
      <button onClick={signInWithGoogle}>Zaloguj sie za pomocą google</button>
    )
  }

  function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Wyloguj sie</button>
    );
  }

  function ChatRoom() {
    const messagesChat = firestore.collection("messages");
    const query = messagesChat.orderBy("createdAt").limit(25);
    const [messagesUsers] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState("");


    const sendMessage = async (e) => {
      e.preventDefault()

      const {uid, photoURL} = auth.currentUser;

      await messagesChat.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormValue("")
    }

    return(
        <>
        <div>
            {messagesUsers && messagesUsers.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
        </div>
          <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(event => setFormValue(event.target.value))}/>
            <button type={"submit"}>Wyślij</button>
          </form>
          </>
    )
  }
  function ChatMessage(props) {
    console.log("4:00");
      const { text, uid, photoURL } = props.message;
      const messageClass = uid == auth.currentUser.uid ? "sent": "received";

      return (
          <div className={`message ${messageClass}`}>
              <img src={photoURL} />
            <p>{text}</p>
          </div>
      )
  }


export default App;
