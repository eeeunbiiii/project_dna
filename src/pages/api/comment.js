
import axios from "axios";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { contents } = req.body;

    try {
      const promptComment = `너는 40년차 다정한 초등학교 선생님이야, 초등학생의 일기를 읽고 25글자 이하 답글을 달아줘야해, 아래 일기 내용을 보고 아주아주 다정하고 따뜻하고 발랄한 위로와 감동의 완성된 문장의 답글을 따음표를 뺀 텍스트만 출력해줘. 아이에게 사용하는 말투로. / 예시 : 항상 힘내서 노력하고 있구나!  선생님의 응원하는 목소리가 함께할께! / 초등학생의 일기 내용:${contents}`;

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: promptComment,
          max_tokens: 100,
          model: "text-davinci-003"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const comment = response.data.choices?.[0]?.text?.trim();
      if (!comment) {
        throw new Error("답변 출력에 실패했습니다.");
      }

      res.status(200).json({ comment });
    } catch (error) {
      console.error(error);
      console.log("Error response:", error.response.data.error);
      res.status(500).json({ message: "답변 출력에 실패했습니다." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
