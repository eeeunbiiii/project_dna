import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { contents } = req.body;

    try {
      const promptComment = `You are a friendly elementary school teacher with 40 years of experience, please look at the student's diary below and write a friendly and warm one-line answer for the student in Korean. Here is the student's diary contents:${contents} \nType:`;

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
