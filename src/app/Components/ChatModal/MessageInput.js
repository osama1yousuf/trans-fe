"use client"

import { useState,  } from "react"
import { Paperclip, Mic, Send, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className="p-3 bg-gray-50 border-t sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Smile size={20} />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Paperclip size={20} />
        </Button> */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 rounded-full bg-white"
        />
        <Button
          type={message.trim() ? "submit" : "button"}
          variant="ghost"
          size="icon"
          className={message.trim() ? "text-emerald-600" : "text-gray-500"}
        >
          {message.trim() && <Send size={20} /> }
        </Button>
      </form>
    </div>
  )
}

