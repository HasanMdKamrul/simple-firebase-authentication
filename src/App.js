import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css';
import app from './firebase/firebase.init';

// ** Initialise firebase auth in your app

// ** first amra pop up authentication banabo with the help of google

// ** eita korar jonno amader 2 ta jinish lagbe 1. auth 2. provider

const auth = getAuth(app);


function App() {
  // ** Use google googleAuthentication as your third-party authentication procedure
  
  const provider = new GoogleAuthProvider();

  const authHandler = ()=>{
    const authentication = async ()=>{
      try {
        const result = await signInWithPopup(auth,provider);
        console.log(result.user);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    authentication();
  }
  
  return (
    <div className="App">
      <h1>Auth</h1>
     <button onClick={()=>authHandler()}>Google Sign-in</button>
    </div>
  );
}

export default App;
