import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query
    const { title, content, password } = req.body

    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
    })

    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }

    if (board.password !== password) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        boardId: parseInt(id),
      },
    })

    res.json(post)
  } else {
    res.status(405).send('Method not allowed.')
  }
}
