"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useRouter } from "next/navigation"

interface GameCardProps {
  game: {
    id: number
    name: string
    image: string
    hot?: boolean
  }
}

export default function GameCard({ game }: GameCardProps) {
  const router = useRouter()

  const handlePlayClick = () => {
    // Map game names to their respective routes
    const gameRoutes: Record<string, string> = {
      "JUNGLE CRASH": "/games/jungle-crash",
      "ISLAND ROULETTE": "/games/island-roulette",
      "TROPICAL PLINKO": "/games/tropical-plinko",
      "COCONUT FLIP": "/games/coconut-flip",
      "BEACH JACKPOT": "/games/beach-jackpot",
      "PARADISE JACKPOT": "/games/paradise-jackpot",
    }

    // Navigate to the game route if it exists
    if (gameRoutes[game.name]) {
      router.push(gameRoutes[game.name])
    } else {
      // For any other games not in our mapping
      console.log(`Playing ${game.name}`)
    }
  }

  return (
    <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden group relative tropical-shadow">
    <CardContent className="p-0">
      <div className=" h-40 w-full">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 h-40 w-full cursor-pointer"
        />
        {/* Removed gif hover image */}
        {/* Moved text and button here, in front of images */}
        <div className="absolute inset-0 p-3 flex items-end justify-between">
          <h3 className="font-bold text-white">{game.name}</h3>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 rounded-full p-0 cursor-pointer" 
            onClick={handlePlayClick}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        {game.hot && (
          <div className="absolute top-2 right-2 bg-green-600 text-xs font-bold px-2 py-1 rounded text-white">
            HOT
          </div>
        )}
      </div>
    </CardContent>
  </Card>
  )
}
