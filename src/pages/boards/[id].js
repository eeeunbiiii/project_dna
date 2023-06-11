import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { useState } from 'react';


const prisma = new PrismaClient()

export default function Board({ board, posts }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

  
    const handlePasswordSubmit = (event) => {
      event.preventDefault();
      //비밀번호검증
      if (password === board.password) {
        setAuthenticated(true);
      }else {
        setError('비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
      }
    };
  
    return (
      <div className="p-10">
        {authenticated ? (
          <div>
            <h1 className="text-3xl mb-4">{board.title}</h1>
            {posts.map((post) => (
              <div key={post.id} className="mb-6">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <Link href={`/posts/${post.id}`}>
                  <span className="text-blue-500 cursor-pointer">읽어보기</span>
                </Link>
              </div>
            ))}
            <Link href={`/boards/${board.id}/new`}>
              <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                일기 작성하기
              </button>
            </Link>
          </div>
        ) : (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col max-w-md mx-auto">
            <h1 className="text-3xl mb-4">{board.title}</h1>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            />
             {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              확인
            </button>
          </form>
        )}
      </div>
    );
  }
  

export async function getServerSideProps({ params, req }) {

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