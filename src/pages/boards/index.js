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
      <h1 className="text-3xl mb-4">Diary<br></br>n<br></br>Answer<br></br>____</h1>
      {boards.map((board) => (
        <div key={board.id} className="mb-6">
          <h2 className="text-xl font-bold">📒 {board.title}</h2>
          <Link href={`/boards/${board.id}`}>
            <span className="text-yellow-600">일기장 열기</span>
          </Link>
        </div>
      ))}
      <br></br>
      <Link href="/boards/new">
        <span className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
        🔗 새로운 일기장 만들기
        </span>
      </Link>
    </div>
  )
}