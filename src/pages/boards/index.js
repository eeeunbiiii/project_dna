import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function getServerSideProps() {
    const boards = await prisma.board.findMany()
  
    return {
      props: {
        boards: JSON.parse(JSON.stringify(boards)),
      },
    }
  } 

export default function Boards({ boards }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Boards</h1>
      {boards.map((board) => (
        <div key={board.id} className="mb-6">
          <h2 className="text-xl font-bold">{board.title}</h2>
          <Link href={`/boards/${board.id}`}>
            <span className="text-blue-500">View posts</span>
          </Link>
        </div>
      ))}
      <Link href="/boards/new">
        <span className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create a new board
        </span>
      </Link>
    </div>
  )
}
