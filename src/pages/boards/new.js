import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewBoard() {
  const [title, setTitle] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        password: password,
      }),
    })

    if (response.ok) {
        const data = await response.json()
      console.log('Response:', data)

      router.push('/boards')
    }else {
        console.log('Error:', response.statusText)
      }
  }


  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">New Diary</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit">
          Create
        </button>
      </form>
    </div>
  )
}