import React, { useState, useEffect } from 'react';

const TodoApp = () => {
 const [todos, setTodos] = useState([]);
 const [todoInput, setTodoInput] = useState('');
 const [editIndex, setEditIndex] = useState(null);
 const [currentFilter, setCurrentFilter] = useState('all');

 useEffect(() => {
    fetchTodos();
 }, []);

 const fetchTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    const data = await response.json();
    setTodos(data);
 };

 const handleSubmit = () => {
  if (!todoInput.trim()) {
    alert('Todo cannot be empty');
    return ;
  }
 
  const newTodo = {
    id: todos.length + 1,
    title: todoInput,
    completed: false,
  };
 

  setTodos([...todos, newTodo]);
  setTodoInput('');
};


 const handleEdit = (index) => {
    setEditIndex(index);
    setTodoInput(todos[index].title);
 };

 const handleEditSubmit = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], title: todoInput };
    setTodos(newTodos);
    setEditIndex(null);
    setTodoInput("")
 };

 
 const handleRemove = (id, e) => {
  
  e.stopPropagation();

  const newTodos = todos.filter((todo) => todo.id !== id);
  setTodos(newTodos);
};

  
 const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
 };

 const filteredTodos = () => {
    switch (currentFilter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'uncompleted':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
 };

 const handleToggle = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], completed: !newTodos[index].completed };
    setTodos(newTodos);

  }
  
 return (
    <div>
        <center><h1>Todo List</h1></center>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)} style={{marginBottom:"20px"}}
      />
      {editIndex === null && (
        <button type="button" onClick={handleSubmit} style={{marginRight:"20px",background:"purple"}}>
          Add Todo
        </button>
      )}
      {editIndex !== null && (
        <button type="button" onClick={() => handleEditSubmit(editIndex)} style={{marginRight:"20px"}}>
          Save
        </button>
      )}
      <button type="button" onClick={() => handleFilterChange('all')} style={{marginRight:"10px"}}>
        All
      </button>
      <button type="button" onClick={() => handleFilterChange('completed')} style={{marginRight:"10px"}}>
        Completed
      </button>
      <button type="button" onClick={() => handleFilterChange('uncompleted')} style={{marginRight:"10px",margin:"15px 5px"}}>
        Uncompleted
      </button>
     
      <ul>
  {filteredTodos().map((todo,index) => (
    <li key={todo.id} onClick={() => handleToggle(index)} style={{ marginTop: "10px" }}>
      {todo.completed ? <del>{todo.title}</del> : todo.title}
      <button type="button" onClick={() => handleEdit(index)} style={{ width: "70px", height: "30px" }}>
        Edit
      </button>
      <button
  type="button"
  onClick={(e) => handleRemove(todo.id, e)}
  style={{ width: "70px", height: "30px" }}
>
  Delete
</button>

    </li>
  ))}
</ul>

    </div>
 );
};

export default TodoApp;

