"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, MessageCircle, Wallet, Menu, Store } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    message: "You received 100 coins!",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    message: "Your daily bonus is ready to claim",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    message: "New game added: Try your luck!",
    time: "3 hours ago",
    read: false,
  },
]

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <header className="bg-[#1e1a0e] border-b border-[#3a2a1a] sticky top-0 z-50 tropical-shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-6">
              <div className="relative h-8 w-8 mr-2">
                <Image src="/favicon.png?height=32&width=32" alt="BLOXLUCKY Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">BLOXLUCKY</span>
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/" className="text-white hover:text-gray-300 cursor-pointer">
                  Home
                </Link>

                <Link href="/contact" className="text-white hover:text-gray-300 cursor-pointer">
                  Contact
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isMobile ? (
              <>
                <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative cursor-pointer">
                      <Bell className="h-5 w-5 cursor-pointer" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-[#1e1a0e] border-[#3a2a1a]" align="end">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader className="pb-2 border-b border-[#3a2a1a]">
                        <CardTitle className="text-white flex justify-between items-center">
                          <span>Notifications</span>
                          {unreadCount > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
                              onClick={markAllAsRead}
                            >
                              Mark all as read
                            </Button>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div>
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-3 border-b border-[#3a2a1a] last:border-0 hover:bg-[#2a2415] cursor-pointer ${!notification.read ? "bg-[#2a2415]/50" : ""}`}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start gap-2">
                                  <div className="flex-1">
                                    <p className="text-sm text-white">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                  </div>
                                  {!notification.read && (
                                    <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-400">
                            <p>No notifications</p>
                          </div>
                        )}
                      </CardContent>
                      {notifications.length > 0 && (
                        <CardFooter className="border-t border-[#3a2a1a] p-2">
                          <Link
                            href="/notifications"
                            className="text-xs text-blue-400 hover:text-blue-300 w-full text-center cursor-pointer"
                          >
                            View all notifications
                          </Link>
                        </CardFooter>
                      )}
                    </Card>
                  </PopoverContent>
                </Popover>

                <Link href="/wallet">
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Wallet className="h-5 w-5 cursor-pointer" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Store className="h-5 w-5 cursor-pointer" />
                  </Button>
                </Link>
                <Link href="/auth" className="w-full">
                  <Button variant="outline" className="w-full cursor-pointer">
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0a0e1a] border-gray-800">
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col space-y-4 py-4">
                      <Link href="/" className="text-white hover:text-gray-300 cursor-pointer">
                        Home
                      </Link>
                      <Link href="/contact" className="text-white hover:text-gray-300 cursor-pointer">
                        Contact
                      </Link>
                    </div>
                    <div className="mt-auto flex flex-col space-y-4">
                      <Link href="/auth" className="w-full">
                        <Button variant="outline" className="w-full cursor-pointer">
                          Login
                        </Button>
                      </Link>
                      <Link href="/wallet" className="w-full">
                        <Button variant="ghost" className="w-full flex items-center cursor-pointer">
                          <Wallet className="h-5 w-5 mr-2" />
                          Wallet
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full flex items-center cursor-pointer">
                        <Bell className="h-5 w-5 mr-2" />
                        Notifications
                        {unreadCount > 0 && <span className="h-2 w-2 bg-red-500 rounded-full"></span>}
                      </Button>
                      <Link href="/marketplace" className="w-full">
                        <Button variant="ghost" className="w-full flex items-center cursor-pointer">
                          <Store className="h-5 w-5 mr-2" />
                          Marketplace
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}