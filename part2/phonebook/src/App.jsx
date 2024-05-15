import { useState } from 'react'


const Name = ({ name }) => {
  return (
    <p key={name.id}>{name.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id:1,
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName= (event) => {
    event.preventDefault()
    let existeNombre = false
    for (let i = 0; i < persons.length; i++) {      
      if(persons[i].name ===newName){
        existeNombre = true
      }
    }  
    if (existeNombre) {
      window.alert(newName + " is already added to phonebook")
    }else{
      const personObject = {
        name: newName,
        id:  persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {persons.map(person =>
          <Name name={person}/>
        )}
    </div>
  )
}

export default App