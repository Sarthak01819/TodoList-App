import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Navbar from './components/Navbar'
import './App.css'

export default function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  const saveToLS = (data) => localStorage.setItem("todos", JSON.stringify(data))

  const handleAdd = () => {
    if (!todo.trim()) return
    const updated = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(updated)
    setTodo("")
    saveToLS(updated)
  }

  const handleDelete = (id) => {
    const updated = todos.filter((t) => t.id !== id)
    setTodos(updated)
    saveToLS(updated)
  }

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id)
    setTodo(t.todo)
    const updated = todos.filter((i) => i.id !== id)
    setTodos(updated)
    saveToLS(updated)
  }

  const handleCheckbox = (id) => {
    const updated = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(updated)
    saveToLS(updated)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center px-4 py-10">
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl w-full md:w-[70%] rounded-2xl p-8 border border-white/20">

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            Task Organizer
          </h1>
          <p className="text-center text-white/80 mb-8 text-sm md:text-base">
            Plan. Execute. Conquer your day 🚀
          </p>

          {/* Input Section */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="✍️ Write your next task..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={handleAdd}
              disabled={todo.trim().length < 2}
              className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-100 disabled:opacity-50 transition-all duration-200"
            >
              Add Task
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showFinished}
                onChange={() => setShowFinished(!showFinished)}
                className="w-4 h-4 accent-purple-500"
              />
              <span>Show Completed</span>
            </div>
            <span className="text-sm text-white/70">
              {todos.length} task{todos.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-white/70 py-6">No tasks added yet 🌱</p>
            ) : (
              todos
                .filter((t) => showFinished || !t.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleCheckbox(item.id)}
                        className="w-5 h-5 accent-purple-600"
                      />
                      <span
                        className={`text-white text-lg break-words ${
                          item.isCompleted ? "line-through text-white/50" : ""
                        }`}
                      >
                        {item.todo}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-white hover:text-yellow-300 text-xl transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-white hover:text-red-400 text-xl transition"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
