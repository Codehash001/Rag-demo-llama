"use client";

import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./ui/chat";
import { initialMessages } from "./ui/chat/chat-message";

export default function ChatSection() {

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({
    initialMessages,
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    body: {
      filename: decodeURIComponent(window.location.pathname.split('/').pop() ?? "")
    },
    onError: (error) => {
      const message = JSON.parse(error.message);
      alert(message.detail);
    },
  });

  return (
    <div className="space-y-4 w-full flex flex-col justify-evenly h-full p-4">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={true}
      />
    </div>
  );
}
