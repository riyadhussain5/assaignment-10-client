import React, { useContext, useEffect, useState } from 'react';

import Event from '../Event/Event';
import './Home.css';

// import  { useContext } from 'react';
import { UserContext } from '../../App';
const Home = () => {

    const [logginuser,setLogginUser] = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [cart, setCart] = useState([]);
   

    useEffect(() => {
        fetch('https://secret-woodland-09997.herokuapp.com/events')
        .then(res => res.json())
        .then(data =>setEvents(data))
        
    }, [])
    const handleProduct=(product) =>{
        console.log('product added', product)
        const newCart = [...cart,product]
        setCart(newCart);
        const newOrder = {...logginuser, ...product}
        fetch('https://secret-woodland-09997.herokuapp.com/orders',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newOrder)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
        })
    }

    return (
        <div className='shopContainer'>
             <div className=" productContainer">
            {
                events.map(event =><Event handleProduct={handleProduct} event={event}></Event>)
            }
        </div>
        
        </div>
       
    );
};

export default Home;