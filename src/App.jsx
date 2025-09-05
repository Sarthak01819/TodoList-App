import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />

      <div className='flex justify-center w-full'>
        <div className='md:mx-10 bg-violet-100 rounded-xl my-5 p-5 min-h-[85vh] w-[100%] mx-6 md:w-[70%] justify-center items-center'>
          <h1 className='font-bold text-4xl justify-center items-center flex'>Make Your Task and ToDo List</h1>
          <h2 className='font-bold text-3xl mt-5 mb-2'>Add a Todo</h2>
          <div className='flex flex-col justify-center items-center gap-5 mb-5'>
            <input onChange={handleChange} value={todo} className='rounded-[5px] px-3 py-1 bg-white w-full' type="text" placeholder='Add your todo' />
            <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-violet-800 disabled:bg-violet-800 hover:bg-violet-900 p-3 py-1 text-white rounded-md font-bold text-[20px] w-18'>Save</button>
          </div>
          <div className='flex flex-wrap gap-2'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
            <span className='text-lg'>Show Finished</span>
          </div>
          <hr className='my-2'/>
          <h2 className='font-bold text-3xl'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='flex items-center w-full justify-center my-5'>No Todos to Display</div>}
            {todos.map(item => {

              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-5 justify-between px-6 py-1 flex-wrap">
                <div className='my-2 w-full flex justify-between flex-wrap items-center'>
                  <div className='flex gap-5'>
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                    <div className={item.isCompleted ? "line-through text-[18px] " : "text-[18px] "} >{item.todo}</div>
                  </div>
                  <div className="buttons flex gap-4 max-h-8 justify-center flex-wrap items-center">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-3 py-1 h-8 text-white rounded-md font-semibold'><FaEdit /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-3 py-1 h-8 text-white rounded-md font-semibold'><MdDelete /></button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
