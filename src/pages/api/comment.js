import { PrismaClient } from '@prisma/client';
import axios from "axios";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { contents } = req.body;
    const { boardId } = req.body;
    const { postId } = req.body;

    
    try {
      //const comment = "test comment~";
      
      const post = await prisma.post.findFirst({ //post 위치
        where: {
          id: postId,
          boardId: boardId,
        },
      });
  
      if (!post) {
        throw new Error("포스트가 없습니다.");
      }

      if (post.comment === null) {
          const promptComment = `너는 40년차 다정한 초등학교 선생님이야, 초등학생의 일기를 읽고 25글자 이하 답글을 달아줘야해, 아래 일기 내용을 보고 아주아주 다정하고 따뜻하고 발랄한 위로와 감동의 완성된 문장의 답글을 따음표를 뺀 텍스트만 출력해줘. 아이에게 사용하는 말투로. / 예시 : 항상 힘내서 노력하고 있구나!  선생님의 응원하는 목소리가 함께할께! / 초등학생의 일기 내용:${contents}`;

          const response = await axios.post( //api요청
          "https://api.openai.com/v1/completions",
          {
            prompt: promptComment,
            max_tokens: 150,
            model: "text-davinci-003"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        );

        const comment = response.data.choices?.[0]?.text?.trim(); //comment 상수로 받기
        if (!comment) {
          throw new Error("답변 출력에 실패했습니다.");
        }
        const updateComment = await prisma.post.update({ //데베 업데이트
          where: { id: postId },
          data: {
            comment: comment,
          },
        });
        console.log(updateComment);
        res.status(200).json({ comment });
      } else { //comment가 이미 존재하면
        console.log("The comment field has a value:", post.comment);
        res.status(200).json({ comment: post.comment }); //db comment 전달
      }



    } catch (error) {
      console.error(error);
      console.log("Error response:", error?.response?.data?.error);
      res.status(500).json({ message: "답변 출력에 실패했습니다." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
