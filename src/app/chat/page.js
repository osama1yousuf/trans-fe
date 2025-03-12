"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/interceptor/axios_inteceptor";
import { X } from "lucide-react";
import Image from "next/image";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
import { Chat } from "@/app/Components/ChatModal/Chat";
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
  return <Chat />;
}
