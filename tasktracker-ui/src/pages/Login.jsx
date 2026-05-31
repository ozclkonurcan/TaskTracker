import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const endpoint = isRegister ? 'register' : 'login'
    
    fetch(`http://localhost:8080/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (!res.ok) throw new Error('Hata')
      return res.json()
    })
    .then(data => {
      localStorage.setItem('token', data.token)
      onLogin()
    })
    .catch(() => setError('Email veya şifre yanlış'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>
        <p
          className="mt-4 text-center text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
        </p>
      </div>
    </div>
  )
}

export default Login