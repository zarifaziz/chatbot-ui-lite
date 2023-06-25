import { Message, OpenAIModel } from "@/types";

export const OpenAIStream = async (messages: Message[]) => {
  const res = await fetch("https://5a77-2001-8003-23ae-f100-a887-a259-7ed2-a9a4.ngrok-free.app/agent_chat", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a helpful, friendly, assistant.`
        },
        ...messages
      ],
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  // Wait for the entire response to be received
  const data = await res.json();

  // Extract the text from the response
  const text = data.message.content;

  return text;
};
