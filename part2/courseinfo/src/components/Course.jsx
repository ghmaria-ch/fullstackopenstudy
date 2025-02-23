
const Course =({course})=>{
    return(
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  const Header = (props) => {
    return(
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map((part)=>(
          <Part key={part.id} part={part}/>
          ))}
      </div>
    )
  }
  
  
  const Total = ({parts}) => {
    return(
      <div>
       <h4> total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</h4>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return(
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }

  export default Course