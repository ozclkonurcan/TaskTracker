import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'

function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
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
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(updated)
    })
    .then(() => {
      setTasks(tasks.map(t => t.id === task.id ? updated : t))
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Görevler</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks.length === 0 && <p className="text-gray-500 mt-4">Henüz görev yok</p>}
      <div className="mt-4 space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className={`font-semibold text-lg ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleToggle(task)}
                className="px-3 py-1 rounded text-sm bg-green-100 text-green-700 hover:bg-green-200"
              >
                {task.isCompleted ? 'Geri Al' : 'Tamamla'}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-3 py-1 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList