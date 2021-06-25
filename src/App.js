import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import AddEvents from './components/AddEvents/AddEvents';
import Login from './Login/Login';
import Orders from './components/Orders/Orders';
import Details from './components/Details/Details';
import Navbar from './Navbar/Navbar';
import NotMatch from './NotMatch/NotMatch';
import { createContext, useState } from "react";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
export const UserContext = createContext();
export const DestinationContext = createContext();

function App() {
  const[logginuser,setLogginUser] = useState({})
  const [pick,setPick] = useState({})
  return (
    <div>
    <UserContext.Provider value={[logginuser,setLogginUser]}>
    <DestinationContext.Provider value={[pick,setPick]}>
    <p className='email'>Email: {logginuser.email}</p>
    <Router>
  
     
<Switch>
          <Route exact path="/home">
            <Navbar/>
            <Home />
          </Route>

          <Route exact path='/'>
          <Navbar/>
            <Home />
          </Route>

   <PrivateRoute path='/orders'>
   <Navbar/>
   <Orders></Orders>
   
   </PrivateRoute>



          <Route path="/addEvents">
          <Navbar/>
            <AddEvents />
          </Route>

          <PrivateRoute path="/details">
          <Navbar/>
            <Details></Details>
          </PrivateRoute>

          
          

          <Route path="/login">
            <Navbar/>
            <Login></Login>
          </Route>
        
       

    <Route  path='/*'>
   <NotMatch></NotMatch>
   </Route>
   </Switch>
       
      
    
       </Router>
    </DestinationContext.Provider>
     </UserContext.Provider>
     </div>
  );
}

export default App;
