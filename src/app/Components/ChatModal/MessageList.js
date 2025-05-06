"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { DateSeparator } from "./DateSeparator";

// Helper function to format dates
const formatMessageDate = (timestamp) => {
  const messageDate = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  // Reset time part for comparison
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate())
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())

  if (messageDay.getTime() === todayDay.getTime()) {
    return "Today"
  } else if (messageDay.getTime() === yesterdayDay.getTime()) {
    return "Yesterday"
  } else {
    return messageDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

// Group messages by date
const groupMessagesByDate = (messages) => {
  const groups = {}

  messages.forEach((message) => {
    const date = new Date(message.createdAt || message.timestamp || new Date())
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    if (!groups[dateKey]) {
      groups[dateKey] = []
    }

    groups[dateKey].push(message)
  })

  // Sort groups by date (oldest first at top, newest last at bottom)
  return Object.entries(groups)
    .sort(([dateKeyA], [dateKeyB]) => {
      return new Date(dateKeyA).getTime() - new Date(dateKeyB).getTime()
    })
    .map(([dateKey, messages]) => ({
      date: formatMessageDate(dateKey),
      // Sort messages within each group by timestamp (oldest first)
      messages: messages.sort((a, b) => {
        const timeA = new Date(a.createdAt || a.timestamp || 0).getTime()
        const timeB = new Date(b.createdAt || b.timestamp || 0).getTime()
        return timeA - timeB
      }),
    }))
}

export function MessageList({ messages }) {
  const messagesEndRef = useRef(null);
  const messageGroups = groupMessagesByDate(messages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-repeat">
      <div className="space-y-2 flex flex-col">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <DateSeparator date={group.date} />
            {group.messages.map((message) => (
              <MessageBubble key={message._id || `msg-${groupIndex}-${message.index}`} message={message} />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
