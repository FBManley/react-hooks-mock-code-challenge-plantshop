import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import NewForm from "./NewForm";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(plants => setPlants(plants))
  }, [])

  function handleAddPlant(newPlant) {
    const updatedPlantsArray = [...plants, newPlant];
    setPlants(updatedPlantsArray)
  }

  function handleDeletePlant(id) {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlantsArray)
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(search.toLowerCase());
  })

  function handleUpdatePlant(updatedPlant){
    const updatedPlantsArray = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlantsArray)
  }

  function handleAddTree(newTree){
    setPlants([...plants, newTree])
  }
  
  return (
    <main>
       <NewPlantForm 
      onAddPlant={handleAddPlant}
      />
      <Search 
      search={search}
      onSearchChange={setSearch}
      /> 
      <PlantList 
      plants={displayedPlants}
      onDeletePlant={handleDeletePlant}
      onUpdatePlant={handleUpdatePlant}
      />
      <NewForm 
      onAddTree={handleAddTree}
      />
    </main>
  );
}

export default PlantPage;
