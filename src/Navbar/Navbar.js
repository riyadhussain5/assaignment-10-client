import React from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../App';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import  { useContext } from 'react';
  

const Navbar = () => {
  const [logginuser,setLogginUser] = useContext(UserContext);
    return (
        <div  >
           
          

<nav class="navbar navbar-expand-lg navbar-light bg-light text-center ">
  <div class="container-fluid ">
    <p class="navbar-brand d-flex" >White Gamers</p>
   
    <div class="collapse navbar-collapse  " id="navbarNavAltMarkup">
      <div class="navbar-nav  ">
      <Link  class="nav-link active " aria-current="page"  to="/">Home</Link>
       
        <Link class="nav-link" to="/orders">Orders</Link>
        
        <Link class="nav-link" to="/details">All Products</Link>
      
     
      <Link to='/login' onClick={()=>setLogginUser({})} className=' nav-link'>{logginuser.email ?'Logout':'Login'}</Link>
              <Link >{logginuser.email==logginuser.email?<Link class="nav-link  " to="/addEvents" >Admin</Link>:<Link  class="nav-link disabled" ></Link>}</Link>
              
              
        
      </div>
    </div>
  </div>
</nav>
         

       
        </div>
        
    );
};

export default Navbar;