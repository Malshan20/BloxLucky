"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  CheckCircle2,
  ArrowLeft,
  Palmtree,
  Umbrella,
  Shell,
  SunMedium,
  User,
  Gamepad2,
  MessageSquare,
  Settings,
  Copy,
} from "lucide-react"

export default function InventoryPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("item")
  const [copySuccess, setCopySuccess] = useState(false)

  // Get item details from URL params or use defaults
  const itemId = searchParams.get("id") || "1"
  const itemName = searchParams.get("name") || "Golden Palm Avatar"
  const itemPrice = Number.parseFloat(searchParams.get("price") || "0.05")
  const itemImage = searchParams.get("image") || "/placeholder.svg?height=200&width=200"
  const itemCategory = searchParams.get("category") || "avatars"

  // Generate a random item code
  const itemCode = `ITEM-${Math.floor(100000 + Math.random() * 900000)}`

  const copyItemCode = () => {
    navigator.clipboard.writeText(itemCode)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Mock inventory items (would come from API in real app)
  const inventoryItems = [
    {
      id: itemId,
      name: itemName,
      image: itemImage,
      category: itemCategory,
      purchaseDate: new Date().toLocaleDateString(),
      status: "Active",
      isNew: true,
    },
    {
      id: "2",
      name: "VIP Status",
      image: "/placeholder.svg?height=200&width=200",
      category: "vip",
      purchaseDate: "03/15/2023",
      status: "Active",
      isNew: false,
    },
    {
      id: "3",
      name: "Tropical Chat Emotes",
      image: "/placeholder.svg?height=200&width=200",
      category: "emotes",
      purchaseDate: "02/20/2023",
      status: "Active",
      isNew: false,
    },
  ]

  // Instructions based on item category
  const getInstructions = (category: string) => {
    switch (category) {
      case "avatars":
        return [
          "Go to your profile settings",
          "Select 'Avatar' from the menu",
          "Choose this avatar from your available options",
          "Click 'Save' to apply the changes",
        ]
      case "vip":
        return [
          "Your VIP status is already active",
          "Enjoy exclusive benefits across the platform",
          "Access VIP-only games and promotions",
          "Contact VIP support for personalized assistance",
        ]
      case "emotes":
        return [
          "Open any chat window in the platform",
          "Click the emoji icon in the chat input",
          "Select the 'My Emotes' tab",
          "Choose from your purchased emotes",
        ]
      case "game-items":
        return [
          "Launch the specific game this item is for",
          "Go to game settings or customization",
          "Select this item from your available options",
          "Apply and enjoy your custom game item",
        ]
      case "profile":
        return [
          "Go to your profile settings",
          "Select 'Profile Customization'",
          "Choose this item from your available options",
          "Click 'Save' to apply the changes",
        ]
      default:
        return [
          "Go to your profile settings",
          "Find the appropriate section for this item type",
          "Select this item from your available options",
          "Save your changes",
        ]
    }
  }

  const instructions = getInstructions(itemCategory)

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
        <span className="text-white font-medium">My Inventory</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Inventory</h1>
        <p className="text-gray-300">Access and manage all your purchased items</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-green-500" />
                My Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=100&width=100" alt="User Avatar" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">TropicalPlayer</h3>
                  <p className="text-sm text-gray-400">Member since Jan 2023</p>
                  <Badge className="mt-1 bg-yellow-700">VIP Member</Badge>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Inventory
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  My Games
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-green-900/50 to-yellow-900/50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">Need Help?</h3>
              </div>
            </div>

            <CardContent className="pt-4">
              <p className="text-sm text-gray-300 mb-4">
                Having trouble with your items? Our support team is here to help.
              </p>

              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <Tabs defaultValue="item" className="w-full" onValueChange={setActiveTab}>
              <CardHeader>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="item">Current Item</TabsTrigger>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="item" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#1e1a0e] p-6 rounded-lg mb-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative h-48 w-48 rounded-lg overflow-hidden mx-auto md:mx-0">
                          <Image src={itemImage || "/placeholder.svg"} alt={itemName} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h2 className="text-2xl font-bold">{itemName}</h2>
                              <p className="text-gray-400 capitalize">{itemCategory.replace("-", " ")}</p>
                            </div>
                            <Badge className="bg-green-700">Active</Badge>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Purchase Date:</span>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Price:</span>
                              <span className="text-green-500">{itemPrice.toFixed(2)} BTC</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Item Code:</span>
                              <div className="flex items-center">
                                <span className="mr-2">{itemCode}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyItemCode}>
                                  {copySuccess ? (
                                    <span className="text-green-500 text-xs">Copied!</span>
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Button className="w-full md:w-auto bg-green-700 hover:bg-green-800">Use Item Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1e1a0e] p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        How to Use This Item
                      </h3>

                      <div className="space-y-4">
                        {instructions.map((instruction, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-green-500 text-xs">{index + 1}</span>
                            </div>
                            <p className="text-sm">{instruction}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                        <p className="text-sm text-yellow-300">
                          <strong>Note:</strong> Some items may require a game restart to take effect. If you don't see
                          your item immediately, try refreshing or restarting the application.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="all" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {inventoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`bg-[#1e1a0e] p-4 rounded-lg flex items-center ${item.isNew ? "ring-2 ring-green-500/50" : ""}`}
                      >
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-xs text-gray-400 capitalize">{item.category.replace("-", " ")}</p>
                            </div>
                            <Badge className={item.isNew ? "bg-green-700" : "bg-[#3a2a1a]"}>
                              {item.isNew ? "New" : item.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Purchased: {item.purchaseDate}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2"
                          onClick={() => {
                            // In a real app, this would navigate to the item details
                            setActiveTab("item")
                          }}
                        >
                          View
                        </Button>
                      </div>
                    ))}

                    <div className="text-center pt-4">
                      <Link href="/marketplace">
                        <Button variant="outline">Browse Marketplace</Button>
                      </Link>
                    </div>
                  </motion.div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
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

