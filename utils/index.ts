import { Message, OpenAIModel } from "@/types";

export const OpenAIStream = async (messages: Message[]) => {
  const res = await fetch("http://localhost:8000/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: `You are a helpful, friendly, assistant.`
        },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.0,
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  // Wait for the entire response to be received
  const data = await res.json();

  // Extract the text from the response
  const text = data.choices[0].message.content;

  return text;
};
