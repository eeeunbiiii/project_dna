import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const { title } = body
    const board = await prisma.board.create({
      data: {
        title,
      },
    })
    res.json(board)
  } else {
    res.send('Method not allowed.')
  }
}