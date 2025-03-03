
import Person from './components/Person'
import { useState, useEffect } from 'react'
import personService from './services/persons'


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


const Persons =({filteredNames,deletePerson})=>{
  return(
    <ul>
        {filteredNames.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson}/>
        ))}
      </ul>
  )
}

const Notification = ({message }) => {
  return (
    <div className='message'>
      <p>
      {message}
      </p>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [filteredNames,setFilteredNames] =useState([])
  const [message,setMessage] = useState('')

  const hook =  () => {
    console.log('effect')
    personService.getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
        setFilteredNames(initialPersons)
      }).catch(_error => 
        {
          alert("Display error")
        })
  }
  useEffect(hook,[])
 

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
    }
    const nameExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (nameExists) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
      if (replace) {
        const personToUpdate = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
        personService.update(personObject, personToUpdate.id)
          .then((updatedPerson) => {
            setPersons(persons.map((person) =>
              person.id !== personToUpdate.id ? person : updatedPerson
            ));
            setFilteredNames(persons.map((person) =>
              person.id !== personToUpdate.id ? person : updatedPerson
            ))
            const successMessage = `Successfully updated ${updatedPerson.name}'s phone number`;
            setMessage(successMessage);
            setTimeout(() => {
              setMessage(null);
            }, 1800);
          })
          .catch((_error) => {
            alert('Could not update the phonebook');
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    personService.create(personObject)
    .then(newPersons => {
      setPersons(persons.concat(newPersons))
      setFilteredNames(filteredNames.concat(newPersons))
      setNewName('')
      setNewNumber('')
      const addMessage=`Successfully added ${newPersons.name} to phonebook`
      setMessage(addMessage)
      setTimeout(()=>{setMessage(null)},1800)}).catch(_error=>{
        alert(`Could not add ${newPersons.name} to phonebook`)
      })
    }

const deletePerson = (id,name) =>{
  const confirmDelete=window.confirm(`Delete ${name} ?`)
  if(!confirmDelete){
    return;
  }
  personService.remove(id)
  .then(()=>{
    setPersons(persons.filter(person=>person.id  !== id)),
    setFilteredNames(filteredNames.filter(person=>person.id !== id))
    const deleteMessage=`Successfully deleted ${name} from phonebook`
    setMessage(deleteMessage)
    setTimeout(()=>{setMessage(null)},1800)}).catch(_error=>{
      alert(`Could not delete ${name} from phonebook`)
    })
}




  

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message}/>}
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames} deletePerson={deletePerson}/>
    </div>
  )
}

export default App