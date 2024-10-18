import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';

initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
signInWithPopup(auth, provider)
  .then(res => {
    const {displayName, email, photoURL} = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
    }
    setUser(signedInUser);
    console.log(displayName, email, photoURL)
  })
  .catch(error => {
    console.log(error);
    console.log(error.massage);
  })
  }
  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      setUser(signedOutUser);
  })
  .catch(error => {
    console.log(error);
    console.log(error.massage);
  })
  }
  return (
    <div className="App">
    {  
      user.isSignedIn ? <button onClick={handleSignOut} >SIGN OUT</button> :
      <button onClick={handleSignIn} >SIGN IN</button>
      }

    {
      user.isSignedIn && <div>
        <img src={user.photo} alt="" />
        <p>Welcome, {user.name} </p>
        <p>Your email is: {user.email}</p>
      </div>
    }
    </div>
  );
}

export default App;
