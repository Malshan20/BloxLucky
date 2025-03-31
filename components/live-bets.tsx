"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export default function LiveBets() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for live bets
  const bets = [
    {
      id: 1,
      game: "Crash",
      img: "/dollar-note.svg", // Ensure the image path is correct
      player: "CryptoKing",
      amount: 0.5,
      multiplier: "2.5x",
      profit: 1.25,
      timestamp: "10 seconds ago",
    },
    {
      id: 2,
      game: "Roulette",
      img: "/casino.svg", // Added img property for consistency
      player: "LuckyWinner",
      amount: 1.0,
      multiplier: "3.0x",
      profit: 3.0,
      timestamp: "30 seconds ago",
    },
    {
      id: 3,
      game: "Crash",
      img: "/dollar-note.svg", // Added img property for consistency
      player: "GamblePro",
      amount: 0.25,
      multiplier: "1.5x",
      profit: 0.375,
      timestamp: "1 minute ago",
    },
    {
      id: 4,
      game: "Plinio",
      img: "/bet.svg", // Added img property for consistency
      player: "CoinMaster",
      amount: 0.75,
      multiplier: "2.0x",
      profit: 1.5,
      timestamp: "2 minutes ago",
    },
    {
      id: 5,
      game: "Jackpot",
      img: "/jackpot.svg", // Added img property for consistency
      player: "BitLord",
      amount: 5.0,
      multiplier: "10.0x",
      profit: 50.0,
      timestamp: "3 minutes ago",
    },
    {
      id: 6,
      game: "Crash",
      img: "/dollar-note.svg", // Added img property for consistency
      player: "CryptoQueen",
      amount: 0.3,
      multiplier: "1.8x",
      profit: 0.54,
      timestamp: "5 minutes ago",
    },
    {
      id: 7,
      game: "Roulette",
      img: "/casino.svg", // Added img property for consistency
      player: "TokenKing",
      amount: 0.6,
      multiplier: "2.2x",
      profit: 1.32,
      timestamp: "7 minutes ago",
    },
    {
      id: 8,
      game: "Coinflip",
      img: "/pool-balls.svg", // Added img property for consistency
      player: "BlockchainBaron",
      amount: 1.2,
      multiplier: "2.0x",
      profit: 2.4,
      timestamp: "10 minutes ago",
    },
  ]

  return (
    <div className="bg-[#2a1f14] rounded-lg border border-[#3a2a1a] overflow-hidden tropical-shadow">
      <Tabs defaultValue="all" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-5 h-9">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="highrollers">Highrollers</TabsTrigger>
            <TabsTrigger value="race">Race</TabsTrigger>
            <TabsTrigger value="multiplier">Multiplier</TabsTrigger>
            <TabsTrigger value="payout">Payout</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#3a2a1a]">
                  <TableHead className="w-[100px]">Game</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bets.map((bet) => (
                  <TableRow key={bet.id} className="border-[#3a2a1a]">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="relative h-6 w-6 mr-2">
                          <Image
                            src={bet.img}
                            alt={bet.game}
                            width={24} // Specify width
                            height={24} // Specify height
                            className="object-contain rounded-full"
                          />
                        </div>
                        {bet.game}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="relative h-6 w-6 mr-2">
                          <Image
                            src="/avatar.svg?height=24&width=24"
                            alt="Avatar"
                            width={24} // Specify width
                            height={24} // Specify height
                            className="object-contain rounded-full"
                          />
                        </div>
                        {bet.player}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="relative h-4 w-4 mr-1">
                          <Image
                            src="/bitcoin.svg?height=16&width=16"
                            alt="BTC"
                            width={16} // Specify width
                            height={16} // Specify height
                            className="object-contain"
                          />
                        </div>
                        {bet.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>{bet.multiplier}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-green-400">
                        <div className="relative h-4 w-4 mr-1">
                          <Image
                            src="/bitcoin.svg?height=16&width=16"
                            alt="BTC"
                            width={16} // Specify width
                            height={16} // Specify height
                            className="object-contain"
                          />
                        </div>
                        {bet.profit.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-400 text-sm">{bet.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Other tabs would have similar content but filtered */}
        <TabsContent value="highrollers">
          <div className="p-4 text-center text-gray-400">Highrollers bets will appear here</div>
        </TabsContent>
        <TabsContent value="race">
          <div className="p-4 text-center text-gray-400">Race bets will appear here</div>
        </TabsContent>
        <TabsContent value="multiplier">
          <div className="p-4 text-center text-gray-400">Highest multipliers will appear here</div>
        </TabsContent>
        <TabsContent value="payout">
          <div className="p-4 text-center text-gray-400">Highest payouts will appear here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
