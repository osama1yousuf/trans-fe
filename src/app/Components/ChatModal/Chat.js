"use client";

import { useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import axiosInstance from "@/interceptor/axios_inteceptor";
import axios from "axios";

export function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (body) => {
    if (!body.trim()) return;

    const newMessage = {
      driverId:
        localStorage.getItem("userType") === "DRIVER"
          ? JSON.parse(localStorage.getItem("user"))?._id
          : null,
      adminId:
        localStorage.getItem("userType") === "SUPERADMIN"
          ? JSON.parse(localStorage.getItem("user"))?._id
          : null,
      body,
      title: "",
    };
    try {
      let res = await axios.post(
        `${process.env.BASE_URL}/driver/message`,
        newMessage
      );
      console.log("res", res);
      getMessages();
    } catch (error) {
      console.log("error white sending message");
    }
  };

  useEffect(() => {
    // Get messages initially
    getMessages();

    // Set up interval for polling
    const intervalId = setInterval(() => {
      getMessages();
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axiosInstance.get("/driver/message");
      if (data?.data) {
        setMessages((prevMessages) => {
          // Check if we have new messages to avoid unnecessary re-renders
          if (data.data.length !== messages.length) {
            return [...data.data];
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col relative max-h-[84vh] min-h-[84vh] sm:max-h-[82vh] sm:min-h-[82vh]">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
