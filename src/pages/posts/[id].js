import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Post({ post }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  }
}