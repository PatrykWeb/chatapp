import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";


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
            {/*{user ? </ChatRoom> : <SignIn />}*/}
          </section>
      </header>
    </div>
  );
}
  function SignIn() {
    return (
        <div>

        </div>
    )
  }

  function ChatRoom() {
    return(
        <div>

        </div>
    )
  }

export default App;
