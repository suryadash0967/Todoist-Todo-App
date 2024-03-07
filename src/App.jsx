import { useState, useEffect } from 'react'
import blog from './graph.png'
import './App.css'

function App() {
  const [allTodos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [newTitle, setNewTitle] = useState("")

  const handleRedirectDoneTodo = (item, index) => {
    let completedTask = item.title;
    let updatedCompletedTodos = [...completedTodos]
    updatedCompletedTodos.push(completedTask);
    setCompletedTodos(updatedCompletedTodos);
    handleDeleteTodo(index);

    localStorage.setItem('completedTodoList', JSON.stringify(updatedCompletedTodos));
  }

  const handleEditTodo = (item, index) => {
    setNewTitle(item.title);
    handleDeleteTodo(index);
    document.querySelector('#task-title').focus();
  }

  const handleDeleteTodo = (index) => {
    let reduceTodos = [...allTodos];
    reduceTodos.splice(index, 1);
    localStorage.setItem('todolist1', JSON.stringify(reduceTodos));
    setTodos(reduceTodos);
  }
  const handleDeleteCompletedTodo = (array, index) => {
    let reduceTodos = [...array];
    reduceTodos.splice(index, 1);
    localStorage.setItem('completedTodoList', JSON.stringify(reduceTodos));
    setCompletedTodos(reduceTodos);
  }

  const handleAddTodo = () => {
    if (newTitle === "" || newTitle.trim() === "") alert("Please enter a task before adding!")
    else {
      let newTodoItem = {
        title: newTitle
      }
      let updatedArr = [...allTodos];
      updatedArr.push(newTodoItem);
      setTodos(updatedArr);
      localStorage.setItem('todolist1', JSON.stringify(updatedArr))
      setNewTitle("");
    }
  }

  useEffect(() => {
    let savedTodos1 = JSON.parse(localStorage.getItem('todolist1'));
    let savedTodos2 = JSON.parse(localStorage.getItem('completedTodoList'));
    if (savedTodos1) {
      setTodos(savedTodos1);
    }
    if (savedTodos2) {
      setCompletedTodos(savedTodos2);
    }
  }, [])

  return (
    <>
        <div className="navbar">
          <img src={blog} alt="" />
          <div className="app-name">The Todoist</div>
        </div>

        
      <div className='todo-app-container'>
        <div className="h1"><h2>Your Tasks</h2></div>
        <div className="container">
          <div className="title">
            <div className="input-task">

              <input value={newTitle} id='task-title' onKeyUp={(key) => {
                if (key.code === "Enter") handleAddTodo();
              }} onChange={(e) => { setNewTitle(e.target.value) }} placeholder='Enter your task' />
            </div>
            <div className="add-btn"><button className='task-add ' onClick={handleAddTodo}>Add</button></div>
          </div>
          <hr className='hr1' />

          <div className="footer">
            <div className="display-btns">
              <button onClick={() => { setShowCompleted(!showCompleted) }} className='display-completed'>{showCompleted ? "Show Completed Tasks" : "Show To-Do Tasks"}</button>
            </div>
            <div className="dipslay-todos-or-completed">
              {showCompleted ? (

                allTodos.map((item, index) => {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div><div className='list-item-display'>{item.title}</div></div>
                      <div className="controls">
                        <span onClick={() => { handleRedirectDoneTodo(item, index) }} className="done-todo-list-item"><span><i className='bx bx-check'></i></span></span>
                        <span onClick={() => { handleEditTodo(item, index) }} className="edit-todo-list-item"><span><i className='bx bxs-edit'></i></span></span>
                        <span className="remove-todo-list-item" onClick={() => handleDeleteTodo(index)} ><span><i className='bx bx-trash'></i></span></span>
                      </div>
                    </div>
                  )
                })

              ) : (
                completedTodos.map((item, index) => {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div className='list-item-display'>{item}</div>

                      <div className="controls2">
                        <span className="remove-todo-list-item" onClick={() => handleDeleteCompletedTodo(completedTodos, index)} ><span><i className='bx bx-trash'></i></span></span>
                      </div>
                    </div>
                  )
                })

              )}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App