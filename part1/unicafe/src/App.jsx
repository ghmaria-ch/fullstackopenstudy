import { useState } from 'react'

const Header = ({header}) =>{
  return(
    <div style={{fontWeight:'bold'}}>
      {header}
    </div>
  )
}

const Button = ({handleClick,text}) =>{
  return(
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <p><button onClick={handleClick}>{text}</button></p>
    </div>
  )
}

const StatisticLine = ({text,value}) =>{
  return(
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}
const Statistics = ({good,bad,neutral}) =>{
  const all=good+bad+neutral
  const average=(good*1+bad*-1+neutral*0)/(all)
  const positive=(good/(good+bad+neutral))*100
  if(good===0 && bad===0 && neutral==0){
    return(
      <div>
        <p>
        no feedback given
        </p>
      </div>
    )
  }
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive +"%"}/>
      </tbody>
    </table>
  )
}
  


const App = () => {
  const header1="give feedback"
  const header2="statistics"
  const text1="good"
  const text2="neutral"
  const text3="bad"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good+1)
  }

  const handleBadClick = () =>{
    setBad(bad+1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral+1)
  }

 
 
  return (
    <div>
      <Header header={header1}/>
      <Button handleClick={handleGoodClick} text={text1}/>
      <Button handleClick={handleNeutralClick} text={text2}/>
      <Button handleClick={handleBadClick} text={text3}/>
      <Header header={header2}/> 
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App