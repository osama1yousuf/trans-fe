"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import axiosInstance from "@/interceptor/axios_inteceptor";
import axios from "axios";
import { ChatHeader } from "./ChatHeader";

export function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  const fetchMessages = useCallback(async (currentOffset = 0, isPollingCall = false) => {
    if (isLoading && !isPollingCall) return;
    
    isPollingCall ? setIsPolling(true) : setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/driver/message?limit=${limit}&offset=${currentOffset}`
      );
      
      if (data?.data) {
        let finalMessageArray = [];
        if (isPollingCall) {
          setMessages(prev => {
            const newMessages = data.data.filter(
              newMsg => !prev.some(msg => msg._id === newMsg._id)
            );
            finalMessageArray = [...newMessages, ...prev];
            setHasMore(finalMessageArray.length < data.count);
            return finalMessageArray;
          });
        } else if (currentOffset === 0) {
          finalMessageArray = data.data;
          setHasMore(finalMessageArray.length < data.count);
          setMessages(finalMessageArray);
        } else {
          setMessages(prev => {
            finalMessageArray = [...data.data, ...prev];
            setHasMore(finalMessageArray.length < data.count);
            return finalMessageArray;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      isPollingCall ? setIsPolling(false) : setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchMessages(0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isLoading) fetchMessages(0, true);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isLoading, fetchMessages]);

  const loadMoreMessages = useCallback(async () => {
    if (isLoading || !hasMore) return;
    const newOffset = offset + limit;
    await fetchMessages(newOffset);
    setOffset(newOffset);
  }, [offset, isLoading, hasMore, fetchMessages]);

  const handleSendMessage = async (body) => {
    if (!body.trim()) return;

    try {
      await axios.post(`${process.env.BASE_URL}/driver/message`, {
        driverId: localStorage.getItem("userType") === "DRIVER"
          ? JSON.parse(localStorage.getItem("user"))?._id
          : null,
        adminId: localStorage.getItem("userType") === "SUPERADMIN"
          ? JSON.parse(localStorage.getItem("user"))?._id
          : null,
        body,
        title: "",
      });
      fetchMessages(0);
    } catch (error) {
      console.log("error while sending message");
    }
  };

  return (
    <div className="flex flex-col relative justify-between h-[93vh]">
      <ChatHeader />
      <MessageList 
        messages={messages}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMoreMessages}
      />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}