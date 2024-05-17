import { useState } from 'react'


const Name = ({ name }) => {
  return (
    <p>{name.name} {name.number}</p>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <p>filter shown with <input value={newFilter} onChange={handleFilterChange}/></p>
  )
}

const PersonForm = ({addData, newName, handleNameChange, newPhone, handlePhoneChange}) => {
  return (
    <form onSubmit={addData}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addData = (event) => {
    event.preventDefault()
    let existeNombre = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        existeNombre = true
      }
    }
    if (existeNombre) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number:newPhone
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    //console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    if (event.target.value.trim().length) {
      for (let i = 0; i < persons.length; i++) {
        if (!persons[i].name.toUpperCase().includes(event.target.value.toUpperCase())) {
          persons.splice(i, 1);
        }
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter= {newFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm
        addData = {addData}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newPhone = {newPhone}
        handlePhoneChange = {handlePhoneChange}
      />

      <h3>Numbers</h3>
      <PersonForm/>
      {persons.map(person =>
        <Name key={person.id} name={person} />
      )}
    </div>
  )
}

export default App
