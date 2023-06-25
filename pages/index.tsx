import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import { useUser } from '@auth0/nextjs-auth0/client';
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import LoginPage from "@/components/LogInPage";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user: authUser, error: authError, isLoading: authIsLoading } = useUser();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      // read chunks of data from the response body
      // decode each chunk and append it to the last message
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Alpine, the Pine-Mobile Customer Service assistant. I can help you with things like answering questions, providing information, and pointing you in the right direction. How can I help you?`
      }
    ]);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, you can redirect the user to the logout endpoint
    // provided by Auth0 using window.location.href

    window.location.href = "/api/auth/logout";
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Alpine, the Pine-Mobile Customer Service assistant. I can help you with things like answering questions, providing information, and pointing you in the right direction. How can I help you?`
      }
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Alpine Chatbot</title>
        <meta
          name="description"
          content="I'm Alpine, the Pine-Mobile Customer Service assistant. Ask me anything."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            {authError ? (
              <div>{authError.message}</div>
            ) : authUser ? (
              <>
                <Chat
                  messages={messages}
                  loading={loading}
                  onSend={handleSend}
                  onReset={handleReset}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <LoginPage />
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
