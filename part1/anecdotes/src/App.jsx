import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const votes = [0, 0, 0, 0,0,0,0,0]
  
  const [selected, setSelected] = useState(0)
  const[vote,setVote]=useState(votes)
  
  const randomString =()=>{
    const randomIndex=Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  
  const addVote=()=>{
    const copy=[...vote]
    copy[selected]+=1
    setVote(copy)
    }

    const maxVoteIndex=vote.indexOf(Math.max(...vote))


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected] }</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={randomString}>next anecdote</button>
      <button onClick={addVote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVoteIndex] }</p>
      <p>has {vote[maxVoteIndex]} votes</p>
    </div>
  )
}

export default App