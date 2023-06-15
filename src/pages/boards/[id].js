import Link from 'next/link'
import {  PrismaClient } from '@prisma/client'
import { useState } from 'react'

const prisma = new PrismaClient();

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
    
    const handleDelete = async (postId) => {
        try {
            await fetch('/api/deletePost', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ postId }),
            });
            // 변경 사항 반영 페이지 새로 고침
            window.location.reload();
          } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
          }
      };
    
    return (
      <div className="p-10">
        {authenticated ? (
          <div>
            <Link href={`/`}>
                  <span>
                    Diary n Answer<br></br>_________________________________________________________________<br></br><br></br>
                  </span>
                </Link>
            <h1 className="text-3xl mb-4">📒 {board.title}</h1>
            {posts.map((post) => (
              <div key={post.id} className="mb-6">
                <h2 className="text-xl font-bold">📄 {post.title}</h2>
                <Link href={`/posts/${post.id}`}>
                  <span className="text-blue-500 cursor-pointer">확인하기</span>
                </Link>
            <button
                className="ml-4 text-red-500 cursor-pointer"
                onClick={() => handleDelete(post.id)}>
                지우기
            </button>
              </div>
            ))}
            <Link href={`/boards/${board.id}/new`}>
              <button className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              일기 작성하기 💭
              </button>
            </Link>
          </div>
        ) : (
          
            <form onSubmit={handlePasswordSubmit} className="flex flex-col max-w-md mx-auto">
            <Link href={`/`}>
                  <span>
                    Diary n Answer<br></br>_________________________________________________________________<br></br><br></br>
                  </span>
                </Link>
            <h1 className="text-3xl mb-4">📒 {board.title}</h1>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            />
             {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              확인
            </button>
          </form>
        )}
      </div>
    );
  }
  

export async function getServerSideProps({ params }) {

  const { id } = params
  
  try{
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
      await prisma.$disconnect();
    
      return {
        props: {
          board: JSON.parse(JSON.stringify(board)),
          posts: JSON.parse(JSON.stringify(posts)),
        },
      }
  } catch (error) {
    console.error('데이터 가져오는데 에러 발생 : ', error);
    return{
        props: {
            board: {},
            posts: [],
        },
    };
    } 
}