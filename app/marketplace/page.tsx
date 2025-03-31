"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Store, Search, Filter, Star, ShoppingCart, Palmtree, Umbrella, Shell, SunMedium } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Mock marketplace items
  const items = [
    {
      id: 1,
      name: "Golden Palm Avatar",
      description: "Exclusive golden palm tree avatar for your profile",
      price: 0.05,
      category: "avatars",
      image: "/golden_palm.jpg?height=200&width=200",
      featured: true,
    },
    {
      id: 2,
      name: "Exclusive Roulette Table",
      description: "Custom roulette table design for your games",
      price: 0.15,
      category: "vip",
      image: "/Exclusive Roulette Table.jpg?height=200&width=200",
      featured: true,
    },
    {
      id: 3,
      name: "Tropical Chat Emotes",
      description: "Pack of 10 tropical themed chat emotes",
      price: 0.02,
      category: "emotes",
      image: "/chat-emotes.jpg?height=200&width=200",
      featured: false,
    },
    {
      id: 4,
      name: "Diamond Card Pack",
      description: "Exclusive card back design for card games",
      price: 0.1,
      category: "game-items",
      image: "/Diamond Card Back.jpg?height=200&width=200",
      featured: false,
    },
    {
      id: 5,
      name: "Paradise Profile Banner",
      description: "Show off your tropical style with this profile banner",
      price: 0.03,
      category: "profile",
      image: "/Paradise Profile Banner.jpg?height=200&width=200",
      featured: false,
    },
    {
      id: 6,
      name: "Lucky Dice Skin",
      description: "Custom skin for dice in dice games",
      price: 0.04,
      category: "game-items",
      image: "/Lucky Dice Skin.jpg?height=200&width=200",
      featured: true,
    },
    
  ]

  const filteredItems =
    activeTab === "all"
      ? items
      : activeTab === "featured"
        ? items.filter((item) => item.featured)
        : items.filter((item) => item.category === activeTab)

  const handleBuyNow = (item: { id: any; name: any; description?: string; price: any; category?: string; image: any; featured?: boolean }) => {
    router.push(
      `/buy?id=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&image=${encodeURIComponent(item.image)}`,
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Marketplace</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search items..." className="bg-[#3a2a1a] border-[#4d3a25] pl-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Categories</h3>
                <Filter className="h-4 w-4 text-gray-400" />
              </div>

              <div className="space-y-2">
                <Button
                  variant={activeTab === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("all")}
                >
                  All Items
                </Button>
                <Button
                  variant={activeTab === "featured" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("featured")}
                >
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Featured
                </Button>
                <Button
                  variant={activeTab === "avatars" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("avatars")}
                >
                  Avatars
                </Button>
                <Button
                  variant={activeTab === "game-items" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("game-items")}
                >
                  Game Items
                </Button>
                <Button
                  variant={activeTab === "vip" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("vip")}
                >
                  VIP
                </Button>
                <Button
                  variant={activeTab === "emotes" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("emotes")}
                >
                  Emotes
                </Button>
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow mb-6">
            <CardContent className="p-4">
              <h1 className="text-2xl font-bold flex items-center mb-2">
                <Store className="h-6 w-6 mr-2 text-green-500" />
                Tropical Paradise Marketplace
              </h1>
              <p className="text-gray-300">
                Enhance your gaming experience with exclusive items, avatars, and VIP perks
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden group relative tropical-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-600 text-xs font-bold px-2 py-1 rounded text-white">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 font-bold">{item.price} BTC</span>
                      <Badge className="capitalize bg-[#3a2a1a]">{item.category.replace("-", " ")}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#3a2a1a] p-4">
                  <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => handleBuyNow(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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

