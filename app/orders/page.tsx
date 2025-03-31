"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ArrowLeft,
  Palmtree,
  Umbrella,
  Shell,
  SunMedium,
  Search,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Get highlighted order ID from URL params (if any)
  const highlightedOrderId = searchParams.get("id") || null

  // If an order ID is provided in the URL, expand it by default
  useState(() => {
    if (highlightedOrderId) {
      setExpandedOrder(highlightedOrderId)
    }
  })

  // Mock orders data (would come from API in real app)
  const orders = [
    {
      id: highlightedOrderId || "ORD-123456",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      total: 0.05,
      status: "Completed",
      items: [
        {
          id: "1",
          name: "Golden Palm Avatar",
          price: 0.05,
          image: "/golden_palm.jpg?height=200&width=200",
          category: "avatars",
        },
      ],
    },
    {
      id: "ORD-345678",
      date: "02/20/2023",
      time: "09:15:47",
      total: 0.12,
      status: "Completed",
      items: [
        {
          id: "2",
          name: "Tropical Chat Emotes",
          price: 0.02,
          image: "/chat-emotes.jpg?height=200&width=200",
          category: "emotes",
        },
        {
          id: "3",
          name: "Diamond Card Back",
          price: 0.1,
          image: "/Diamond Card Back.jpg?height=200&width=200",
          category: "game-items",
        },
      ],
    },
    {
      id: "ORD-901234",
      date: "01/05/2023",
      time: "18:22:33",
      total: 0.03,
      status: "Completed",
      items: [
        {
          id: "5",
          name: "Paradise Profile Banner",
          price: 0.03,
          image: "/Paradise Profile Banner.jpg?height=200&width=200",
          category: "profile",
        },
      ],
    },
  ]

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesStatus && matchesSearch
  })

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-700"
      case "processing":
        return "bg-yellow-700"
      case "cancelled":
        return "bg-red-700"
      default:
        return "bg-[#3a2a1a]"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          <div className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </div>
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Order History</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-gray-300">View and manage your past purchases</p>
      </motion.div>

      <div className="space-y-6">
        {/* Filters */}
        <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  className="bg-[#3a2a1a] border-[#4d3a25] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="w-40">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-[#3a2a1a] border-[#4d3a25]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Date Range</span>
                </Button>

                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden
                    ${order.id === highlightedOrderId ? "ring-2 ring-green-500" : ""}`}
                >
                  <CardHeader className="p-4 cursor-pointer" onClick={() => toggleOrderExpand(order.id)}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {expandedOrder === order.id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <CardDescription>
                            {order.date} at {order.time}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center mt-2 sm:mt-0">
                        <Badge className={`mr-4 ${getStatusColor(order.status)}`}>{order.status}</Badge>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Total</div>
                          <div className="font-bold text-green-500">{order.total.toFixed(2)} BTC</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedOrder === order.id && (
                    <CardContent className="border-t border-[#3a2a1a] p-4">
                      <div className="space-y-4">
                        <h3 className="font-bold text-sm text-gray-400">ORDER ITEMS</h3>

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-400 capitalize">
                                  {item.category.replace("-", " ")}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{item.price.toFixed(2)} BTC</div>
                                <Link
                                  href={`/inventory?id=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&image=${encodeURIComponent(item.image)}&category=${item.category}`}
                                >
                                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Access Item
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-[#3a2a1a] pt-4 flex flex-col sm:flex-row justify-between">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-400 w-32">Payment Method:</span>
                              <span>Cryptocurrency</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 w-32">Transaction ID:</span>
                              <span className="truncate max-w-[200px]">txid_8f7d6e5c4b3a2z1y</span>
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-0">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Receipt
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400 mb-4">No orders found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterStatus("all")
                    setSearchTerm("")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-[#3a2a1a]">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="fixed top-20 right-10 text-green-500/10 animate-pulse hidden lg:block">
        <Palmtree size={40} />
      </div>
      <div className="fixed bottom-20 left-10 text-green-500/10 animate-pulse hidden lg:block">
        <Umbrella size={30} />
      </div>
      <div className="fixed top-1/3 left-5 text-yellow-500/10 animate-pulse hidden lg:block">
        <Shell size={24} />
      </div>
      <div className="fixed bottom-1/4 right-5 text-yellow-500/10 animate-pulse hidden lg:block">
        <SunMedium size={40} />
      </div>
    </div>
  )
}

