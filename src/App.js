import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import app from './firebase/firebase.init';

// ** Initialise firebase auth in your app

// ** first amra pop up authentication banabo with the help of google

// ** eita korar jonno amader 2 ta jinish lagbe 1. auth 2. provider

const auth = getAuth(app);


function App() {
  // ** Use google googleAuthentication as your third-party authentication procedure
  
  const googleProvider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  const [user,setUser] = useState({})


// ** Why we don't use useEffect here -> bcz useEffect eikhane amra button use kortesi tai useEffect r use kori nai
  const authHandler = ()=>{
    const authentication = async ()=>{
      try {
        const result = await signInWithPopup(auth,googleProvider);
        setUser(result.user);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    authentication();
  };

  const githubHandler = ()=>{
    const handleGithub = async ()=>{
      try {
        const result = await signInWithPopup(auth,githubProvider);
        setUser(result.user);
      } catch (error) {
        console.error('error: ' , error);
      }
    }
    handleGithub()
  }

  const signOutHandler = ()=>{
    
    const signoutInfo = async ()=> {
      try {
        await signOut(auth);
        setUser({});
      } catch (error) {
        console.log(error);
        setUser({})
      }
    };

    signoutInfo()

  }


  const {displayName,photoURL,email,uid} = user;
  
  return (
    <div className="App">
      <h1>Auth</h1>
      {
        uid ? <div>
          <p>{displayName}</p>
      <img src={photoURL} alt="" />
      <p>Email: {email}</p>
      <button onClick={()=>signOutHandler()}>Google Sign-out</button>
        </div> : <><button onClick={()=>authHandler()}>Google Sign-in</button>
        <button onClick={()=>githubHandler()}>Github Sign-in</button>
        </>
      }
     
     
    </div>
  );
}

export default App;
