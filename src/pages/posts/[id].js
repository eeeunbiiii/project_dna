import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

export default function Post({ post }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4 font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p><br></br>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoBack}>
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
    },
  };
}
