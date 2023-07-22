import "./styles.css"
import {useState, useEffect} from 'react'
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { v4 as uuidv4 } from 'uuid'

export default function App(){
  const[todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue ==null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    const storageKey = "Todo_List_Data"; 
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos]);
  

function addTodo(title){
  setTodos((currentTodos) => {
          return [
            ...currentTodos,
            {id: uuidv4(), title, completed: false}
          ]
        })
}
  

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {... todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
    <NewTodoForm onSubmit={addTodo} />
    <h1 className="Header">To-Do List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  )
}
