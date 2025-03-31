"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  History,
  Info,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Timer,
  Palmtree,
  Banana,
  FlipHorizontal,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CoconutFlipPage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [gamePhase, setGamePhase] = useState<"waiting" | "flipping" | "result">("waiting")
  const [countdown, setCountdown] = useState<number>(5)
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(null)
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const [previousResults, setPreviousResults] = useState<Array<"heads" | "tails">>([
    "heads",
    "tails",
    "heads",
    "heads",
    "tails",
    "heads",
    "tails",
    "tails",
    "heads",
    "tails",
  ])
  const [showStats, setShowStats] = useState<boolean>(false)
  const [activeBet, setActiveBet] = useState<boolean>(false)
  const coinRef = useRef<HTMLDivElement>(null)

  // Mock player bets
  const playerBets = [
    {
      id: 1,
      player: "CoconutKing",
      avatar: "/avatar (2).svg?height=40&width=40",
      side: "Heads",
      amount: 0.25,
      profit: "+0.25",
    },
    {
      id: 2,
      player: "FlipQueen",
      avatar: "/avatar (2).svg?height=40&width=40",
      side: "Tails",
      amount: 1.5,
      profit: "+1.5",
    },
    {
      id: 3,
      player: "IslandRaider",
      avatar: "/avatar (2).svg?height=40&width=40",
      side: "Heads",
      amount: 0.5,
      profit: "-0.5",
    },
    {
      id: 4,
      player: "BeachMaster",
      avatar: "/avatar (2).svg?height=40&width=40",
      side: "Tails",
      amount: 0.75,
      profit: "-0.75",
    },
    {
      id: 5,
      player: "TropicalPro",
      avatar: "/avatar (2).svg?height=40&width=40",
      side: "Heads",
      amount: 2.0,
      profit: "+2.0",
    },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 2156,
    totalBets: 78341,
    headsPercentage: "49.8%",
    tailsPercentage: "50.2%",
    longestStreak: "7 Heads",
  }

  useEffect(() => {
    if (gamePhase === "waiting") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            if (activeBet) {
              flipCoin()
            } else {
              resetGame()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gamePhase, activeBet])

  const flipCoin = () => {
    setGamePhase("flipping")

    // Determine result
    const flipResult: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails"

    // Animate coin flip
    if (coinRef.current) {
      coinRef.current.style.animation = "none"
      // Trigger reflow
      void coinRef.current.offsetWidth

      // Apply animation
      const flips = 5 + Math.floor(Math.random() * 5) // 5-10 flips
      const rotateY = flipResult === "heads" ? 0 : 180
      coinRef.current.style.animation = `flip-coin 3s ease-out forwards`
      coinRef.current.style.transform = `rotateY(${flips * 360 + rotateY}deg)`
    }

    // Show result after animation
    setTimeout(() => {
      setResult(flipResult)
      setGamePhase("result")
      setPreviousResults([flipResult, ...previousResults.slice(0, 9)])

      // Reset after showing result
      setTimeout(() => {
        resetGame()
      }, 3000)
    }, 3000)
  }

  const resetGame = () => {
    setGamePhase("waiting")
    setCountdown(5)
    setResult(null)
    setSelectedSide(null)
    setActiveBet(false)

    // Reset coin animation
    if (coinRef.current) {
      coinRef.current.style.animation = "none"
      coinRef.current.style.transform = "rotateY(0)"
    }
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value)
    }
  }

  const placeBet = (side: "heads" | "tails") => {
    if (gamePhase !== "waiting") return

    setSelectedSide(side)
    setActiveBet(true)
  }

  const clearBet = () => {
    setSelectedSide(null)
    setActiveBet(false)
  }

  const calculatePotentialWin = () => {
    return Number.parseFloat(betAmount) * 2
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Coconut Flip</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Display */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow relative">
            <CardContent className="p-0 h-[400px] relative">
              {gamePhase === "waiting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Starting in {countdown}s</span>
                  </div>
                  <div className="text-lg text-gray-300">Choose heads or tails!</div>
                </div>
              )}

              {gamePhase === "result" && result !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-5xl font-bold mb-4 text-white">RESULT</div>
                  <div className="text-3xl font-bold text-yellow-400 capitalize">{result}</div>

                  {activeBet && selectedSide !== null && (
                    <div className="mt-6 text-xl">
                      {selectedSide === result ? (
                        <div className="text-green-500">
                          You won {(Number.parseFloat(betAmount) * 2).toFixed(2)} BTC!
                        </div>
                      ) : (
                        <div className="text-red-500">You lost {betAmount} BTC</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Coin Flip Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[200px] h-[200px] perspective-1000">
                  <div
                    ref={coinRef}
                    className="absolute inset-0 transform-style-3d"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s ease-out",
                    }}
                  >
                    {/* Heads Side */}
                    <div
                      className="absolute inset-0 backface-hidden bg-yellow-500 rounded-full flex items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <div className="text-[#2a1f14] text-4xl font-bold">H</div>
                    </div>

                    {/* Tails Side */}
                    <div
                      className="absolute inset-0 backface-hidden bg-yellow-600 rounded-full flex items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <div className="text-[#2a1f14] text-4xl font-bold">T</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tropical Background Elements */}
              <div className="absolute top-10 left-10 text-green-500/20">
                <Palmtree size={60} />
              </div>
              <div className="absolute bottom-10 right-10 text-green-500/20">
                <Palmtree size={60} />
              </div>

              {/* Previous Results */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1e1a0e] to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {previousResults.map((value, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`border-none text-sm font-medium ${
                        value === "heads" ? "bg-yellow-900/30 text-yellow-500" : "bg-yellow-700/30 text-yellow-400"
                      }`}
                    >
                      {value === "heads" ? "H" : "T"}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add CSS for coin flip animation */}
              <style jsx global>{`
                @keyframes flip-coin {
                  0% { transform: rotateY(0); }
                  100% { transform: rotateY(1800deg); }
                }
                
                .perspective-1000 {
                  perspective: 1000px;
                }
                
                .transform-style-3d {
                  transform-style: preserve-3d;
                }
                
                .backface-hidden {
                  backface-visibility: hidden;
                }
              `}</style>
            </CardContent>
          </Card>

          {/* Betting Controls */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center">
                    <Banana className="h-5 w-5 mr-2 text-yellow-500" />
                    Place Your Bet
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount((Number.parseFloat(betAmount) / 2).toString())}
                      className="h-8 px-2 text-xs"
                    >
                      ½
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount((Number.parseFloat(betAmount) * 2).toString())}
                      className="h-8 px-2 text-xs"
                    >
                      2×
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={betAmount}
                    onChange={handleBetAmountChange}
                    className="bg-[#3a2a1a] border-[#4d3a25]"
                  />
                  <Button variant="outline" size="icon" className="shrink-0" onClick={() => setBetAmount("0.01")}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[0.01, 0.1, 1, 5].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount(amount.toString())}
                      className="h-8"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Choose Side</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className={`h-20 ${
                        selectedSide === "heads" ? "bg-yellow-900/30 border-yellow-600" : "bg-yellow-900/10"
                      }`}
                      onClick={() => placeBet("heads")}
                      disabled={gamePhase !== "waiting"}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mb-1">
                          <span className="text-[#2a1f14] font-bold">H</span>
                        </div>
                        <span>Heads</span>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className={`h-20 ${
                        selectedSide === "tails" ? "bg-yellow-900/30 border-yellow-600" : "bg-yellow-900/10"
                      }`}
                      onClick={() => placeBet("tails")}
                      disabled={gamePhase !== "waiting"}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mb-1">
                          <span className="text-[#2a1f14] font-bold">T</span>
                        </div>
                        <span>Tails</span>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="destructive" onClick={clearBet} disabled={!activeBet || gamePhase !== "waiting"}>
                    Clear Bet
                  </Button>

                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Potential Win</div>
                    <div className="text-xl font-bold text-green-500">{calculatePotentialWin().toFixed(2)} BTC</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Game Info */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
            <div className="p-4 border-b border-[#3a2a1a] flex items-center justify-between">
              <h3 className="font-bold flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Game Info
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowStats(!showStats)} className="h-8 w-8 p-0">
                {showStats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {showStats && (
              <div className="p-4 space-y-3 bg-[#241a10]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Players</span>
                  <span className="font-medium">{gameStats.totalPlayers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Bets</span>
                  <span className="font-medium">{gameStats.totalBets.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Heads Percentage</span>
                  <span className="font-medium text-yellow-500">{gameStats.headsPercentage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tails Percentage</span>
                  <span className="font-medium text-yellow-400">{gameStats.tailsPercentage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Longest Streak</span>
                  <span className="font-medium">{gameStats.longestStreak}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <FlipHorizontal className="h-4 w-4 mr-2 text-yellow-500" />
                How to Play
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>Choose your bet amount.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>Select Heads or Tails.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>The coconut will flip and land on either Heads or Tails.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>If it lands on your chosen side, you win 2x your bet!</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Live Bets */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <div className="p-4 border-b border-[#3a2a1a]">
              <h3 className="font-bold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Live Bets
              </h3>
            </div>

            <div className="divide-y divide-[#3a2a1a]">
              {playerBets.map((bet) => (
                <div key={bet.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image src={bet.avatar || "/placeholder.svg"} alt={bet.player} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{bet.player}</div>
                      <div className="text-sm text-gray-400">
                        {bet.side} - {bet.amount} BTC
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${bet.profit.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {bet.profit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Game History */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <div className="p-4 border-b border-[#3a2a1a]">
              <h3 className="font-bold flex items-center">
                <History className="h-5 w-5 mr-2" />
                Game History
              </h3>
            </div>

            <div className="p-4 grid grid-cols-5 gap-2">
              {previousResults.map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    value === "heads" ? "bg-yellow-900/30 text-yellow-500" : "bg-yellow-700/30 text-yellow-400"
                  }`}
                >
                  <span className="font-bold">{value === "heads" ? "H" : "T"}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

