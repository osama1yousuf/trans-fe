"use client";

import { MessageBubble } from "./MessageBubble";
import { DateSeparator } from "./DateSeparator";
import { useEffect, useRef, useState } from "react";

// Helper function to format dates
const formatMessageDate = (timestamp) => {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time part for comparison
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth() + 1, messageDate.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate());

  if (messageDay.getTime() === todayDay.getTime()) {
    return "Today";
  } else if (messageDay.getTime() === yesterdayDay.getTime()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

// Group messages by date
const groupMessagesByDate = (messages) => {
  const groups = {};

  messages?.forEach((message, i) => {
    const date = new Date(message.createdAt || message.timestamp || new Date());
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
  });

  // Sort groups by date (oldest first at top, newest last at bottom)
  return Object.entries(groups)
    .sort(([dateKeyA], [dateKeyB]) => {
      return new Date(dateKeyA).getTime() - new Date(dateKeyB).getTime();
    })
    .map(([dateKey, messages]) => ({
      date: formatMessageDate(dateKey),
      // Sort messages within each group by timestamp (oldest first)
      messages: messages.sort((a, b) => {
        const timeA = new Date(a.createdAt || a.timestamp || 0).getTime();
        const timeB = new Date(b.createdAt || b.timestamp || 0).getTime();
        return timeA - timeB;
      }),
    }));
};

export function MessageList({ messages, isLoading, hasMore, onLoadMore }) {
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const scrollPositionRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 && !initialLoadDone) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setInitialLoadDone(true);
    }
  }, [messages.length, initialLoadDone]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      scrollPositionRef.current = {
        height: container.scrollHeight,
        top: container.scrollTop
      };

      if (container.scrollTop < 200 && !isLoading && hasMore) {
        onLoadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !scrollPositionRef.current) return;

    const heightDiff = container.scrollHeight - scrollPositionRef.current.height;

    container.scrollTop = scrollPositionRef.current.top + heightDiff;

    scrollPositionRef.current = null;
  }, [messages.length]);

  const messageGroups = groupMessagesByDate(messages);
  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-repeat">
      {isLoading && (
        <div className="flex justify-center py-2 absolute left-[50%] z-50 top-[17%]">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
      )}

      {!hasMore && messages.length > 0 && (
        <div className="text-center text-gray-500 text-sm py-2">
          No more messages
        </div>
      )}

      <div className="space-y-2 flex flex-col">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <DateSeparator date={group.date} />
            {group.messages.map((message) => (
              <MessageBubble
                key={message._id || `msg-${groupIndex}-${message.index}`}
                message={message}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}