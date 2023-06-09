import { useRouter } from 'next/router'


export default function NewPost() {
  const router = useRouter()
  const { id } = router.query

  const createPost = async (event) => {
    event.preventDefault()

    const res = await fetch(`/api/boards/${id}/new`, {
      body: JSON.stringify({
        title: event.target.title.value,
        content: event.target.content.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await res.json()
    router.push(`/boards/${id}`)
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">New Post</h1>
      <form onSubmit={createPost} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="title">Title</label>
          <input id="title" name="title" type="text" className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" required />
        </div>
        <div>
          <label className="block mb-1" htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" className="w-full h-20 px-3 py-2 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" required></textarea>
        </div>
        <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>
    </div>
  )
} 