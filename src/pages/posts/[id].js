import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export default function Post({ post, boardId, postId }) {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
          setLoading(true);
           const response = await fetch('/api/comment', {
           method: 'POST',
           body: JSON.stringify({ contents: post.content, boardId, postId }),
          headers: { 'Content-Type': 'application/json' },
       });
          
       const data = await response.json();
      
       setComment(data.comment);
       console.log(data.comment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [post.content]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4 font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
      <br></br>

      {loading ? (
        <p>로딩중 입니다 ...</p>
      ) : (
        <p className="text-blue-500">선생님의 한마디 : {comment}</p>
      )}
      <br></br>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGoBack}
      >
        일기장으로 돌아가기
      </button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      boardId: post.boardId,
      postId: post.id,
    },
  };
}
