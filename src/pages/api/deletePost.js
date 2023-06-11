import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { postId } = req.body;

    try {
      await prisma.post.delete({
        where: {
          id: parseInt(postId),
        },
      });

      res.status(200).json({ message: '게시물이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
      res.status(500).json({ message: '게시물 삭제 중 오류가 발생했습니다.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메서드입니다.' });
  }
}
