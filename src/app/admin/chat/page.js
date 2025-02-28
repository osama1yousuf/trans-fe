"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { X } from "lucide-react";
import Image from "next/image";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
export default function ChatAreaPage() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Removed scrollToBottom dependency
  useEffect(() => {
    // Get messages initially
    getMessages();

    // Set up interval for polling
    const intervalId = setInterval(() => {
      getMessages();
    }, 8000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axiosInstance.get("/driver/message");
      if (data?.data) {
        setMessages((prevMessages) => {
          // Check if we have new messages to avoid unnecessary re-renders
          if (
            data.data.length > 0 &&
            (!prevMessages.length ||
              data.data[data.data.length - 1]?.id !==
                prevMessages[prevMessages.length - 1]?.id)
          ) {
            return [...prevMessages, ...data.data];
          }
          return prevMessages;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[85vh]">
      <div className="overflow-y-auto p-4 flex justify-end flex-col space-y-4 min-h-[85vh]">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-2 items-center`}>
            <Avatar.Root className="AvatarRoot inline-flex items-center justify-center align-middle overflow-hidden select-none">
              
              {message?.driver?.image ? (
                <Avatar.Image
                  className="AvatarImage cursor-pointer w-8 h-8 rounded-full object-cover"
                  src={message?.driver?.image}
                  alt={`Avatar for ${message?.driver?.firstName || "User"}`}
                />
              ) : (
                <Avatar.Fallback
                  className="AvatarImage cursor-pointer w-8 h-8 rounded-full object-cover text-xs text-center flex items-center justify-center  bg-gray-200"
                  delayMs={600}
                >
                  N/A
                </Avatar.Fallback>
              )}
            </Avatar.Root>

            <div
              className={`rounded-lg p-4 w-fit text-sm 
                     bg-secondary text-secondary-foreground
                `}
            >
              {message?.body} at {new Date(message.time).toLocaleTimeString()} {new Date(message.time).toLocaleDateString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </div>
          </form> */}
    </div>
  );
}
