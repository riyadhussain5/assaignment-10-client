import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css';

const Orders = () => {
    const [logginuser,setLogginUser] = useContext(UserContext);
    const [ordered, setOrdered]= useState([])
    useEffect(()=>{
        fetch('https://secret-woodland-09997.herokuapp.com/orders?email='+logginuser.email,{
            method: 'GET',
            // 
            headers: {  
                'Content-Type' : "application/json",
                authorization: `Bearer ${sessionStorage.getItem('Token')}`

            }
            
        })
        .then(res=> res.json())
        .then(data=> setOrdered(data))
    },[])
    return (
        <div className='table'>
            <p>Your Order Details </p> 
            <p>Product Order : {ordered.length}</p>
            
            {
                ordered.map(order=> 
                
              <div>  <table id="customers">
  <tr>
    <th>Product Name</th>
        </div>
    );
};

export default Orders;