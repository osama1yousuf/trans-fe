"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ChatArea() {
  const router = useRouter();
  const pathname = usePathname();
  const [chatType, setChatType] = useState({
    isUser: false,
    userTpye: null,
  });

  // Scroll to bottom function


  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      const curUserType = localStorage.getItem("userType");
      setChatType({
        ...chatType,
        isUser: isToken && true,
        userTpye: curUserType,
      });
    }
  }, [pathname]); // Removed setChatType dependency


  return (
    <>
      {chatType.isUser && chatType.userTpye === "SUPERADMIN" && (
        <div className="fixed bottom-4 right-4 z-50">
          {/* {isOpen ? (
            <div className="bg-white shadow-lg rounded-lg w-80 flex flex-col h-96">
              <div className="bg-[#811630] text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
                <h3 className="font-bold">Chat</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {chatType.userTpye === "SUPERADMIN" ? (
                <>
                  <div className="overflow-y-auto p-4 space-y-4 flex-1">
                    {messages.map((message, index) => (
                      <div key={index} className={``}>
                        <div
                          className={`rounded-lg p-2 text-sm 
                               bg-secondary text-secondary-foreground
                          `}
                        >
                          {message?.body}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button type="submit">Send</Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <h2>In Process</h2>
                </div>
              )}
            </div>
          ) : ( */}
          <Button
            onClick={() => {
              router.push("/admin/chat");
            }}
            className="rounded-full bg-[#811630] w-14 h-14 flex items-center justify-center"
          >
            <MessageCircleCodeIcon className="w-8 h-8" />
          </Button>
          {/* )} */}
        </div>
      )}
    </>
  );
}
