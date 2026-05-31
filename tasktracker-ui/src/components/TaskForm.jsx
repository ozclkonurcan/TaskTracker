import { useState } from 'react'

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, isCompleted: false })
    })
    .then(res => res.json())
    .then(newTask => {
      onTaskAdded(newTask)
      setTitle('')
      setDescription('')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Görev adı"
      />
      <input 
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Açıklama"
      />
      <button type="submit">Ekle</button>
    </form>
  )
}

export default TaskForm