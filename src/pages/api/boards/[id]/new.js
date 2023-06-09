import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query
    const { title, content } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        boardId: parseInt(id),
      },
    })
    res.json(post)
  } else {
    res.send('Method not allowed.')
  }
}