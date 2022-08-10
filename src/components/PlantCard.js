import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
 const {name, image, price, id} = plant
 const [updatedPrice, setupdatedPrice] = useState('')

 const [isInStock, setIsInStock] = useState(true)

 function handleToggleStock(){
  setIsInStock((isInStock) => !isInStock)
 }
 function handleDeleteClick(){
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "DELETE",
  });
  onDeletePlant(id);
 }

 function handlePriceFormSubmit(e){
  e.preventDefault()
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({price: updatedPrice}),
  })
  .then((r) => r.json())
  .then((updatedPlant) => {
    onUpdatePlant(updatedPlant)
  })
 }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input 
        type="number"
        placeholder="New price"
        value={updatedPrice}
        onChange={(e) => setupdatedPrice(parseFloat(e.target.value))}
        >
        </input>
        <button type="submit">Update Price</button>
      </form>
      
    </li>
  );
}

export default PlantCard;