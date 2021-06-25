import React, { useContext, useState } from 'react';
import './Logic.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig)


// if(firebase.app.length===0) {
//   firebase.initializeApp(firebaseConfig)
// }


const gGprovider = new firebase.auth.GoogleAuthProvider();

const gooGle = () =>{
  firebase.auth()
  .signInWithPopup(gGprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("google user sign in ", user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

const FBprovider = new firebase.auth.FacebookAuthProvider();
const faceBook = ()=>{
  firebase
  .auth()
  .signInWithPopup(FBprovider)
  .then(result => {
   
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    console.log("fb user sign in ", user);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    console.log(error.message)
  });
}



const Login = () => {
  const [newuser,setNewUser] = useState(false);
const [user ,setUser]= useState({
  name: '',
  email: " ",
  password: " " ,
  photo: " ",
  error: " ",
  success: false
})

const [logginuser,setLogginUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };
 
  
const HandleBlur = (event) => {
  let isFormValid= true;
  if(event.target.name === 'email'){
   const isEmailValid= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value);
     console.log(isEmailValid) 
  }
  if(event.target.name==='password'){
    const isPasswordValid = event.target.value.length>6;
     const isNumberValid = /\d{1}/.test(event.target.value);
     console.log (isPasswordValid && isNumberValid);
  }
  if(isFormValid){
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
    }
    const HandleSubmit = (event) => {
      if(newuser && user.email && user.password ){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          const newUserInfo = {...user};
          newUserInfo.error = ' ';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          
        })
      
        .catch(error => {
          const newUserInfo = {...user}
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
         
        
        })
      }

      if(!newuser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
       .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = ' ';
        newUserInfo.success = true;
        setUser(newUserInfo)
       
        
       setLogginUser(newUserInfo)
       storeAuthToken();

       history.replace(from)
          console.log(res.user);
       })
      
        .catch(error => {
          const newUserInfo = {...user}
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
  
        })

        
      }
      event.preventDefault();
     
    }
     const updateUserName = (name)=>{
      const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name
       
      }).then(function() {
        console.log('successfully updated name')
      }).catch(function(error) {
        console.log(error)
      });
     }
    
     const storeAuthToken=()=>{
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      
    sessionStorage.setItem('Token',idToken);
    }).catch(function(error) {
      // Handle error
    });
    
    }



    return (
        <div>
         
         
          
 <form className="form" onSubmit={HandleSubmit} >
 
 <input type='checkbox' onChange={() =>setNewUser(!newuser)}  name='newuser' id = ' '/>           
 <label  htmlFor="newuser">Creat New Account</label>
              {newuser && <p>First Name</p>}
            {newuser && <input autoComplete ='off' onBlur={HandleBlur} name='name' type='text' placeholder=" first Name" required></input>}
            {newuser &&<p>Last Name</p>}
            {newuser &&<input autoComplete ='off' onBlur={HandleBlur} name='Last' type='text' placeholder="Last Name" required></input>}
            <p>Email Address</p>
            <input onBlur={HandleBlur} autoComplete ='off' type='text' name='email'  placeholder="Email" required></input>
            <p>Password</p>
            <input onBlur={HandleBlur} autoComplete ='off' type='password' name='password' placeholder="Password" required></input><br/><br/>
           <input className='submit-button'  type='submit' value='Submit'/>
           <p style={{color:'red'}}>{user.error}</p>
           {
             user.success  && <p style={{color:'green'}}>User {newuser?"created":"logged"} successfully</p>
           }
           <button className='button-icon' onClick={faceBook}> 
Facebook Sign In</button> <br/>
<button  className='button-icon' onClick={gooGle}>Google Sign In</button>
         </form>

        </div>
       
           
           
           
        
    );
};

export default Login;