// import { Link } from '@material-ui/core'; //{event}
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';
import './Event.css';
import { UserContext } from '../../App';


const Event = (props) => {
console.log(props.event);

    const{name,imageURL,price} = props.event;
    const [logginuser,setLogginUser] = useContext(UserContext);
    
    return (
        <div className='product' >
 <div >
            <img  src={imageURL} alt=""/></div>
            {/* <p>Product Id : {_id}</p> */}
            
            <div >
            <h3 style={{color:'blue'}}>{name}</h3>
           <br/>
           <p>Price:${price}</p><br/>
        
           
          
           {
               logginuser.email?<button onClick={()=>props.handleProduct(props)}  className="Button"><Link to='/orders'>Buy Now</Link> </button>:<button   className="Button"><Link to='/orders'>Buy Now</Link></button> 
           }
        

            </div>
            
           
 
      
           
            
        </div>
        
       
    );
};

export default Event;