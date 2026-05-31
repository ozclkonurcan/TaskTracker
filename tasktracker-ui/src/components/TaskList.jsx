import { useEffect, useState } from "react";
import TaskForm from './TaskForm'

function TaskList() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])


  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleDelete = (id) => {
      fetch(`http://localhost:8080/api/tasks/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    setTasks(tasks.filter(task => task.id !== id))
  })
  }


  const handleToggle = (task) => {
  const updated = { ...task, isCompleted: !task.isCompleted }
  
  fetch(`http://localhost:8080/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  })
  .then(() => {
    setTasks(tasks.map(t => t.id === task.id ? updated : t))
  })
}

  return (
    <div>
      <h2>Görevler</h2>

<TaskForm onTaskAdded={handleTaskAdded} />

{tasks.map(task => (
  <div key={task.id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>{task.isCompleted ? '✅ Tamamlandı' : '⏳ Devam ediyor'}</p>


<button onClick={() => handleToggle(task)}>
  {task.isCompleted ? 'Geri Al' : 'Tamamla'}
</button>
     <button onClick={() => handleDelete(task.id)}>Sil</button>
  </div>
))}
    </div>
  )
}

export default TaskList