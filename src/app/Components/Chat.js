"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircleCodeIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ChatArea() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [chatType, setChatType] = useState({
    isUser: false,
    userTpye: null,
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      // Here you would typically send the message to your backend or AI service
      // For this example, we'll just echo the message back
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `You said: ${input}`, isUser: false },
        ]);
      }, 500);
    }
  };
  useEffect(() => {
    let isToken = localStorage.getItem("token");
    console.log("test", isToken);
    if (isToken) {
      let curUserType = localStorage.getItem("userType");
      setChatType({
        ...chatType,
        isUser: isToken && true,
        userTpye: curUserType,
      });
    }
  }, [pathname]);
  return (
    <>
      {chatType.isUser && (
        <div className="fixed bottom-4 right-4 z-50">
          {isOpen ? (
            <div className="bg-white shadow-lg rounded-lg w-80 flex flex-col h-96">
              <div className="bg-[#811630] text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
                <h3 className="font-bold">Chat</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {chatType.userTpye === "SUPERADMIN" ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`rounded-lg p-2 max-w-[70%] ${
                            message.isUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button type="submit">Send</Button>
                    </div>
                  </form> */}
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <h2>In Process</h2>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full bg-[#811630] w-14 h-14 flex items-center justify-center"
            >
              <MessageCircleCodeIcon className="w-8 h-8" />
            </Button>
          )}
        </div>
      )}
    </>
  );
}
