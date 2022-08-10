import React, {useState} from 'react'

const NewForm = ({onAddTree}) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const treeData = {
            name: name,
            image: image, 
            price: price,
        }
        fetch("http://localhost:6001/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(treeData),
        })
        .then((r) => r.json())
        .then((newTree) => onAddTree(newTree))
    }
  return (
    <div>New Tree Form
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder='Tree Name'></input> 
          <input 
          type="text" 
          name="image" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="image URL"
          ></input>
          <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
          ></input>
          <button type='submit'>Add Tree</button>
        </form>

    </div>
  )
}

export default NewForm;