"use client"

import { useState } from "react"
import GameCard from "@/components/game-card"
import LiveBets from "@/components/live-bets"
import ChatPanel from "@/components/chat-panel"
import SummerEvents from "@/components/summer-events"
import JungleDecorations from "@/components/jungle-decorations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TreePalmIcon as PalmTree, BananaIcon as Coconut, Umbrella } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("games")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const games = [
    { id: 1, name: "JUNGLE CRASH", image: "/crash.png?height=400&width=200", gifImage: "/", hot: true },
    { id: 2, name: "ISLAND ROULETTE", image: "/ROULETTE.png?height=200&width=200", gifImage: "/island-roulette.gif", hot: true },
    { id: 3, name: "TROPICAL PLINKO", image: "/plinko.png?height=200&width=200", gifImage: "/tropical-plinio.gif", hot: false },
    { id: 4, name: "COCONUT FLIP", image: "/flip.png?height=200&width=200", gifImage: "/coconut-flip.gif", hot: true },
    { id: 5, name: "BEACH JACKPOT", image: "/b_jack.png?height=200&width=200", gifImage: "/beach-jackpot.gif", hot: true },
    { id: 6, name: "PARADISE JACKPOT", image: "/p_jack.png?height=200&width=200", gifImage: "/paradise-jackpot.gif", hot: false },
  ]

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <JungleDecorations />

      <div className="flex items-center justify-center mb-6">
        <PalmTree className="h-6 w-6 text-green-500 mr-2" />
        <h1 className="text-2xl font-bold text-center">Welcome to Tropical Paradise Casino</h1>
        <PalmTree className="h-6 w-6 text-green-500 ml-2" />
      </div>

      {isMobile ? (
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="games" className="flex items-center justify-center">
              <Coconut className="h-4 w-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="bets" className="flex items-center justify-center">
              <Umbrella className="h-4 w-4 mr-2" />
              Live Bets
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center justify-center">
              Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="games">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <SummerEvents />
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bets">
            <LiveBets />
          </TabsContent>
          <TabsContent value="chat">
            <ChatPanel />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <SummerEvents />
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            <LiveBets />
          </div>
          <div className="w-full lg:w-1/4">
            <ChatPanel />
          </div>
        </div>
      )}
    </div>
  )
}
