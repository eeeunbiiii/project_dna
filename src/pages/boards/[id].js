import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Board({ board, posts }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">{board.title}</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-6">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <Link href={`/posts/${post.id}`}>
            <span className="text-blue-500 cursor-pointer">Read more</span>
          </Link>
        </div>
      ))}
      <Link href={`/boards/${board.id}/new`}>
        <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create a new post
        </button>
      </Link>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  const posts = await prisma.post.findMany({
    where: {
      boardId: parseInt(id),
    },
  })

  return {
    props: {
      board: JSON.parse(JSON.stringify(board)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}