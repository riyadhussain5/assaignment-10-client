// import React from 'react';
// import  { useContext, useEffect, useState } from 'react';

// import Event from '../Event/Event';
// import './Details.css';

// // import  { useContext } from 'react';
// import { UserContext } from '../../App';
// const Details = () => {
//     const [logginuser,setLogginUser] = useContext(UserContext);
//     const [events, setEvents] = useState([]);
//     const [cart, setCart] = useState([]);
   

//     useEffect(() => {
//         fetch('http://localhost:55000/events')
//         .then(res => res.json())
//         .then(data => setEvents(data))
//     }, [])
//     const handleProduct=(product) =>{
//         console.log('product added', product)  
//         const newCart = [...cart,product]
//         setCart(newCart);
//         const newOrder = {...logginuser, ...product}
//         fetch('http://localhost:55000/orders',{
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify(newOrder)
//         })
//         .then(res=> res.json())
//         .then(data=>{
//             console.log(data)
//         })
//     }
//     return (
//         <div className='shopContainer'>
//              <div className=" productContainer">
//             {
//                 events.map(event =><Event handleProduct={handleProduct} event={event}></Event>)
//             }
//         </div>
//         {/* <div className='cartContainer'>
//            <Cart cart={cart}></Cart>
//         </div> */}
//         </div>
       
//     );
// };
// export default Details;
import React, { useEffect, useState } from 'react';


const Details = () => {

    const [add, setAdd] = useState([])
    useEffect(()=>{
        fetch('https://secret-woodland-09997.herokuapp.com/events')
        .then(res=> res.json())
        .then(data=> setAdd(data))
            
            
        },[])
       

    return (
        <div className='product'>
          <h3> Name of all products  </h3>
        {
           
            add.map(ad =>
           <p>Product Name:   {ad.name}</p>  )
            
        }
        
      
    
        </div>
    );
};

export default Details;