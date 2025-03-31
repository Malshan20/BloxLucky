"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import Image from "next/image"

interface Message {
  id: number
  user: string
  avatar: string
  content: string
  timestamp: Date
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "CryptoKing",
      avatar: "/avatar (1).svg?height=40&width=40",
      content: "Just won 5 BTC on Crash! 🚀",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: 2,
      user: "LuckyWinner",
      avatar: "/avatar (2).svg?height=40&width=40",
      content: "Anyone playing Roulette?",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: 3,
      user: "GamblePro",
      avatar: "/avatar (3).svg?height=40&width=40",
      content: "This site is awesome! Love the games.",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: 4,
      user: "BitLord",
      avatar: "/avatar.svg?height=40&width=40",
      content: "Just deposited some ETH, ready to play!",
      timestamp: new Date(Date.now() - 240000),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      user: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-[#2a1f14] rounded-lg border border-[#3a2a1a] h-[500px] flex flex-col tropical-shadow">
      <div className="p-3 border-b border-[#3a2a1a] flex items-center justify-between">
        <h3 className="font-bold">Live Chat</h3>
        <span className="text-xs text-gray-400">42 online</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
              <Image src={message.avatar || "/placeholder.svg"} alt={message.user} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{message.user}</span>
                <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-[#3a2a1a]">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="bg-[#3a2a1a] border-[#4d3a25]"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

