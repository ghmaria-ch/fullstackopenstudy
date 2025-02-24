import { useState } from 'react'
import Person from './components/Person'


const Filter = ({filterName,handleFilterName}) => {
  return (
    <div>
        filter shown with <input value={filterName} onChange={handleFilterName}/>
    </div>
  )
}

const PersonForm = ({addPerson,newName,newNumber,handleNameChange,handleNumberChange}) =>{
  return(
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
  )
}

const Persons =({filteredNames})=>{
  return(
    <ul>
        {filteredNames.map((person) => (
        <Person key={person.name} person={person} />
        ))}
      </ul>
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
  const [newNumber,setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [filteredNames,setFilteredNames] =useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const handleNameChange =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange =(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterName =(event)=>{
    console.log(event.target.value)
    setFilterName(event.target.value)

    const filteredNames=persons.filter((person)=>person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredNames(filteredNames)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber,
      id:(persons.length)+1
    }
    const nameExists=persons.some((person)=>person.name.toLowerCase()===newName.toLowerCase())
    if (nameExists){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat(personObject))
    setFilteredNames(filteredNames.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames}/>
    </div>
  )
}

export default App