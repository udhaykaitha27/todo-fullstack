import React,{useState,useEffect} from 'react';
import axios from 'axios'

const App = () => {

  const API = 'http://localhost:3000/'
  const [todoArray,setTodoArray] = useState([]);
  const [run,setRun] = useState(true);
  const [render,setRender] = useState(false)


  const[objectPost,setobjectPost] = useState({text : " "});

const inputHandler = (event) =>
  {
    const {name,value} = event.target;
    setobjectPost({
      ...objectPost,
      [name] : value
    })
  }  

const addHandler = async() =>
{
  const postTodo = await axios.post(`${API}post-todo`,objectPost)
  if(postTodo)
  {
    alert('posted todo successfully')
    setRun(!true)
  }
  const postedData = postTodo.data.todoItem.text;

  return (
    <>
    <h3>your todo is : {postedData}</h3>
    </>
  )
}

const deleteHandler = async(id) =>
  {
    const deleteTodo = await axios.delete(`${API}delete-todo/${id}`)
    if(deleteTodo)
    {
       alert('deleted todo')
       setRender(!false)
    }
  } 

  useEffect(()=>{


(async()=>
{
  const getTodos = await axios.get(`${API}get-todos`);
  const arrayoftodos =  getTodos.data.todoItems;
  setTodoArray(arrayoftodos)

})()

  },[])

  const todoItems = todoArray.map((todoItems,index)=>{

    const {text,_id} = todoItems;
    

    return (
      <div key={index} className='border p-3 m-3 rounded'>
      <h3>Your todo is : {text}</h3>
      <button onClick={ () => {deleteHandler(_id)}} className='btn btn-danger'> delete todo</button>
      </div>
    )

  })

  return (
    <div>
      <div className='d-flex flex-column'>
        <input name='text' onChange={inputHandler} className='w-50 m-auto ' type='text' placeholder='enter your todo'/>
        <button onClick={addHandler} className='btn btn-success w-25 m-auto'>Add todo</button>
      </div>
      {todoItems}
      {addHandler}
    </div>
  )
}

export default App
