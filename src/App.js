import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddTodo = () => {
    if (!input) return; // Don't add empty todos
    if (!selectedDate) return; // Don't add todos without a date
    const newTodo = {
      id: Date.now(),
      text: input,
      date: selectedDate,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput(''); // Clear input after adding
    setSelectedDate(''); // Clear selected date after adding
  };

  const handleRemoveTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };
  const hhandleshowCalendar = () => {
    setShowCalendar(true)
  }

  return (
    <div className="App">
      <div className="todo-container">
        <h1>PLAN YOUR TIME</h1><h3><i>Get your money</i></h3>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          type="text"
          placeholder="Add a new task"
        />
        <input 
          type="date" 
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
        <button onClick={handleAddTodo} className='AddTodo'>Add Todo</button>

        <button onClick={hhandleshowCalendar} className='AddTodo'>View Weekly Calendar</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <span className="todo-date">{todo.date}</span>
              <button className="remove-btn" onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {showCalendar && (
        <div className="calendar-popup">
          <button onClick={handleCalendarClose} className="close-btn">Close</button>
          <Calendar
            className="custom-calendar"
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dateStr = date.toISOString().split('T')[0];
                const events = todos.filter(todo => todo.date === dateStr);
                if (events.length > 0) {
                  return <span>📅</span>;
                }
              }
              return null;
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
