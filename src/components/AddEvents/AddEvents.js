import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddEvents.css';

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);


  const onSubmit = data => {
    // console.log(data)
    const eventData = {
      price: data.price,
      name: data.name,
      imageURL: imageURL,
      
    }
    const url = `https://secret-woodland-09997.herokuapp.com//addEvents`;

    console.log(eventData)
    fetch(url, {
      method: 'POST', 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => console.log('server side response', res))
  };

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', 'f1cbdbac569a374ea9452cc0062c5599');
    imageData.append('image', event.target.files[0]);
    
    axios.post('https://api.imgbb.com/1/upload', 
    imageData)
    .then(function (response) {
      // console.log(response)
      setIMageURL(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  return (
    <div className='event'>
      <h1>Add your awesome Event here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
    
      <input name="name" placeholder="Product Name" ref={register} /><br/><br/>
      <input type='number' placeholder="price" name="price" defaultValue="Price" ref={register} /><br/>
      <br/>
      <input name="exampleRequired"     type="file" onChange={handleImageUpload} />
      <br/><br/>
      <input type="submit" />
    </form>
    </div>
  );
};

export default AddEvents;