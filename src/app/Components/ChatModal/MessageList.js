"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-repeat">
      <div className="space-y-2 flex flex-col">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
