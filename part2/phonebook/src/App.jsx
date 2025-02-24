import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number:'123'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')

  const handleNameChange =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange =(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber
    }
    const nameExists=persons.some((person)=>person.name===newName)
    if (nameExists){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input  value={newName} onChange={handleNameChange}/>
          <br/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
          <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
        <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default App