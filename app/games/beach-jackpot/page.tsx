"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Info, ChevronDown, ChevronUp, RefreshCw, Timer, Umbrella, Shell, Waves } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BeachJackpotPage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [gamePhase, setGamePhase] = useState<"waiting" | "spinning" | "result">("waiting")
  const [countdown, setCountdown] = useState<number>(5)
  const [reels, setReels] = useState<Array<Array<string>>>([
    ["🌴", "🍹", "🐚", "🏄", "🌊", "🍍", "🦀", "🐠"],
    ["🌴", "🍹", "🐚", "🏄", "🌊", "🍍", "🦀", "🐠"],
    ["🌴", "🍹", "🐚", "🏄", "🌊", "🍍", "🦀", "🐠"],
  ])
  const [spinningReels, setSpinningReels] = useState<Array<Array<string>>>([[], [], []])
  const [reelPositions, setReelPositions] = useState<number[]>([0, 0, 0])
  const [winAmount, setWinAmount] = useState<number>(0)
  const [previousWins, setPreviousWins] = useState<number[]>([0, 0.5, 2, 0, 1, 0, 5, 0, 0.2, 0])
  const [showStats, setShowStats] = useState<boolean>(false)
  const [activeBet, setActiveBet] = useState<boolean>(false)
  const [autoSpin, setAutoSpin] = useState<boolean>(false)
  const [autoSpinCount, setAutoSpinCount] = useState<number>(0)
  const reelsRef = useRef<HTMLDivElement>(null)

  // Symbol values
  const symbolValues: Record<string, number> = {
    "🌴": 5, // Palm tree - highest value
    "🍹": 3, // Cocktail
    "🐚": 2, // Shell
    "🏄": 2, // Surfer
    "🌊": 1, // Wave
    "🍍": 1, // Pineapple
    "🦀": 0.5, // Crab
    "🐠": 0.5, // Fish - lowest value
  }

  // Mock player bets
  const playerBets = [
    { id: 1, player: "BeachKing", avatar: "/avatar (1).svg?height=40&width=40", amount: 0.25, win: "+1.25" },
    { id: 2, player: "SandQueen", avatar: "/avatar (1).svg?height=40&width=40", amount: 1.5, win: "+0.0" },
    { id: 3, player: "WaveRider", avatar: "/avatar (1).svg?height=40&width=40", amount: 0.5, win: "+2.5" },
    { id: 4, player: "ShellMaster", avatar: "/avatar (1).svg?height=40&width=40", amount: 0.75, win: "+0.0" },
    { id: 5, player: "SurfPro", avatar: "/avatar (1).svg?height=40&width=40", amount: 2.0, win: "+10.0" },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 3245,
    totalBets: 98341,
    biggestWin: "250x",
    hitFrequency: "32%",
    jackpotFrequency: "0.05%",
  }

  // Paytable
  const paytable = [
    { symbols: "🌴🌴🌴", multiplier: "50x", description: "Palm Tree Jackpot" },
    { symbols: "🍹🍹🍹", multiplier: "25x", description: "Cocktail Party" },
    { symbols: "🐚🐚🐚", multiplier: "15x", description: "Shell Collection" },
    { symbols: "🏄🏄🏄", multiplier: "15x", description: "Surfer's Paradise" },
    { symbols: "🌊🌊🌊", multiplier: "10x", description: "Wave Runner" },
    { symbols: "🍍🍍🍍", multiplier: "10x", description: "Pineapple Punch" },
    { symbols: "🦀🦀🦀", multiplier: "5x", description: "Crab Catch" },
    { symbols: "🐠🐠🐠", multiplier: "5x", description: "Fish School" },
    { symbols: "Any 3 same", multiplier: "Varies", description: "Three of a Kind" },
    { symbols: "🌴🌴Any", multiplier: "2x", description: "Palm Pair" },
    { symbols: "🍹🍹Any", multiplier: "1.5x", description: "Cocktail Pair" },
  ]

  useEffect(() => {
    if (gamePhase === "waiting") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            if (activeBet || autoSpin) {
              spinReels()
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
  }, [gamePhase, activeBet, autoSpin])

  useEffect(() => {
    // Handle auto spin
    if (autoSpin && gamePhase === "result" && autoSpinCount > 0) {
      const timer = setTimeout(() => {
        setAutoSpinCount((prev) => prev - 1)
        resetGame()
      }, 2000)
      return () => clearTimeout(timer)
    } else if (autoSpinCount === 0 && autoSpin) {
      setAutoSpin(false)
    }
  }, [gamePhase, autoSpin, autoSpinCount])

  const generateRandomSymbols = (count: number): string[] => {
    const allSymbols = Object.keys(symbolValues)
    const result: string[] = []

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * allSymbols.length)
      result.push(allSymbols[randomIndex])
    }

    return result
  }

  const spinReels = () => {
    setGamePhase("spinning")

    // Generate longer reels for animation
    const extendedReels = [generateRandomSymbols(20), generateRandomSymbols(20), generateRandomSymbols(20)]

    setSpinningReels(extendedReels)

    // Determine final positions (last 3 symbols will be visible)
    const finalPositions = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]

    // Set final symbols
    const finalReels = [
      [reels[0][finalPositions[0]], reels[0][(finalPositions[0] + 1) % 8], reels[0][(finalPositions[0] + 2) % 8]],
      [reels[1][finalPositions[1]], reels[1][(finalPositions[1] + 1) % 8], reels[1][(finalPositions[1] + 2) % 8]],
      [reels[2][finalPositions[2]], reels[2][(finalPositions[2] + 1) % 8], reels[2][(finalPositions[2] + 2) % 8]],
    ]

    // Animate reels
    let reelDelay = 0

    for (let i = 0; i < 3; i++) {
      reelDelay += 500 // Stagger the reel stops

      setTimeout(() => {
        // Update reel position
        setReelPositions((prev) => {
          const newPositions = [...prev]
          newPositions[i] = finalPositions[i]
          return newPositions
        })

        // If last reel, check for wins
        if (i === 2) {
          setTimeout(() => {
            const win = calculateWin(finalReels)
            setWinAmount(win)
            setGamePhase("result")

            // Add to history if there was a win
            if (win > 0) {
              setPreviousWins([win, ...previousWins.slice(0, 9)])
            }
          }, 500)
        }
      }, reelDelay)
    }
  }

  const calculateWin = (finalReels: string[][]): number => {
    const bet = Number.parseFloat(betAmount) || 0.01
    let winAmount = 0

    // Check middle row for 3 of a kind
    const middleRow = [finalReels[0][1], finalReels[1][1], finalReels[2][1]]

    if (middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2]) {
      // 3 of a kind
      const symbol = middleRow[0]
      const value = symbolValues[symbol] || 1
      winAmount = bet * value * 5 // 5x multiplier for 3 of a kind
    }
    // Check for pairs of high value symbols
    else if (middleRow[0] === middleRow[1] && (middleRow[0] === "🌴" || middleRow[0] === "🍹")) {
      const symbol = middleRow[0]
      const multiplier = symbol === "🌴" ? 2 : 1.5
      winAmount = bet * multiplier
    } else if (middleRow[1] === middleRow[2] && (middleRow[1] === "🌴" || middleRow[1] === "🍹")) {
      const symbol = middleRow[1]
      const multiplier = symbol === "🌴" ? 2 : 1.5
      winAmount = bet * multiplier
    }

    return winAmount
  }

  const resetGame = () => {
    setGamePhase("waiting")
    setCountdown(5)
    setWinAmount(0)
    setActiveBet(true)

    // Generate new symbols for each reel
    const newReels = [generateRandomSymbols(8), generateRandomSymbols(8), generateRandomSymbols(8)]

    setReels(newReels)
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value)
    }
  }

  const placeBet = () => {
    if (gamePhase !== "waiting") return
    setActiveBet(true)
  }

  const startAutoSpin = (spins: number) => {
    setAutoSpinCount(spins)
    setAutoSpin(true)
    setActiveBet(true)

    if (gamePhase === "result" || gamePhase === "waiting") {
      resetGame()
    }
  }

  const stopAutoSpin = () => {
    setAutoSpin(false)
    setAutoSpinCount(0)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Beach Jackpot</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slot Machine Display */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow relative">
            <CardContent className="p-0 h-[400px] relative">
              {gamePhase === "waiting" && !activeBet && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Place your bet!</span>
                  </div>
                  <div className="text-lg text-gray-300">Spin the reels to win!</div>
                </div>
              )}

              {gamePhase === "waiting" && activeBet && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Starting in {countdown}s</span>
                  </div>
                  <div className="text-lg text-gray-300">Get ready to spin!</div>
                </div>
              )}

              {gamePhase === "result" && winAmount > 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-5xl font-bold mb-4 text-yellow-400">WIN!</div>
                  <div className="text-3xl font-bold text-green-500">+{winAmount.toFixed(2)} BTC</div>
                </div>
              )}

              {/* Slot Machine */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[600px] h-[300px] bg-[#3a2a1a] rounded-lg border-4 border-[#4d3a25] overflow-hidden">
                  {/* Beach background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-yellow-600/30"></div>
                    <div className="absolute top-0 left-0 right-0 h-2/3 bg-blue-500/20"></div>
                  </div>

                  {/* Reels container */}
                  <div ref={reelsRef} className="absolute inset-0 flex justify-center items-center p-4">
                    <div className="grid grid-cols-3 gap-4 w-full h-full">
                      {/* Reel 1 */}
                      <div className="bg-[#241a10] rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-6xl">
                          {gamePhase === "spinning" ? (
                            <div className="animate-spin-slow-1">
                              {spinningReels[0].map((symbol, index) => (
                                <div key={index} className="h-[100px] flex items-center justify-center">
                                  {symbol}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[0][(reelPositions[0] + 0) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center border-y-2 border-yellow-500/50">
                                {reels[0][(reelPositions[0] + 1) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[0][(reelPositions[0] + 2) % 8]}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Reel 2 */}
                      <div className="bg-[#241a10] rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-6xl">
                          {gamePhase === "spinning" ? (
                            <div className="animate-spin-slow-2">
                              {spinningReels[1].map((symbol, index) => (
                                <div key={index} className="h-[100px] flex items-center justify-center">
                                  {symbol}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[1][(reelPositions[1] + 0) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center border-y-2 border-yellow-500/50">
                                {reels[1][(reelPositions[1] + 1) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[1][(reelPositions[1] + 2) % 8]}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Reel 3 */}
                      <div className="bg-[#241a10] rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-6xl">
                          {gamePhase === "spinning" ? (
                            <div className="animate-spin-slow-3">
                              {spinningReels[2].map((symbol, index) => (
                                <div key={index} className="h-[100px] flex items-center justify-center">
                                  {symbol}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[2][(reelPositions[2] + 0) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center border-y-2 border-yellow-500/50">
                                {reels[2][(reelPositions[2] + 1) % 8]}
                              </div>
                              <div className="h-[100px] flex items-center justify-center">
                                {reels[2][(reelPositions[2] + 2) % 8]}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Win line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-2 border-dashed border-yellow-500/50 z-10"></div>
                </div>
              </div>

              {/* Tropical Background Elements */}
              <div className="absolute top-10 left-10 text-blue-500/20">
                <Waves size={60} />
              </div>
              <div className="absolute bottom-10 right-10 text-yellow-500/20">
                <Umbrella size={60} />
              </div>

              {/* Previous Wins */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1e1a0e] to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {previousWins.map((win, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`border-none text-sm font-medium ${
                        win > 0 ? "bg-green-900/30 text-green-500" : "bg-red-900/30 text-red-500"
                      }`}
                    >
                      {win > 0 ? `+${win.toFixed(2)}` : "0.00"}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add CSS for reel animations */}
              <style jsx global>{`
                @keyframes spin-slow-1 {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-2000px); }
                }
                
                @keyframes spin-slow-2 {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-2000px); }
                }
                
                @keyframes spin-slow-3 {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-2000px); }
                }
                
                .animate-spin-slow-1 {
                  animation: spin-slow-1 3s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-2 {
                  animation: spin-slow-2 3.5s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-3 {
                  animation: spin-slow-3 4s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
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
                    <Shell className="h-5 w-5 mr-2 text-yellow-500" />
                    Place Your Bet
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount((Number.parseFloat(betAmount) / 2).toString())}
                      className="h-8 px-2 text-xs"
                      disabled={gamePhase !== "waiting" || autoSpin}
                    >
                      ½
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount((Number.parseFloat(betAmount) * 2).toString())}
                      className="h-8 px-2 text-xs"
                      disabled={gamePhase !== "waiting" || autoSpin}
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
                    disabled={gamePhase !== "waiting" || autoSpin}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setBetAmount("0.01")}
                    disabled={gamePhase !== "waiting" || autoSpin}
                  >
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
                      disabled={gamePhase !== "waiting" || autoSpin}
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="default"
                    className="h-16 bg-green-700 hover:bg-green-800"
                    onClick={placeBet}
                    disabled={gamePhase !== "waiting" || autoSpin}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold">SPIN</span>
                      <span className="text-xs">{betAmount} BTC</span>
                    </div>
                  </Button>

                  {!autoSpin ? (
                    <Button
                      variant="outline"
                      className="h-16"
                      onClick={() => startAutoSpin(10)}
                      disabled={gamePhase === "spinning"}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">AUTO SPIN</span>
                        <span className="text-xs">10 Spins</span>
                      </div>
                    </Button>
                  ) : (
                    <Button variant="destructive" className="h-16" onClick={stopAutoSpin}>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">STOP AUTO</span>
                        <span className="text-xs">{autoSpinCount} Spins Left</span>
                      </div>
                    </Button>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Last Win</div>
                    <div className={`text-xl font-bold ${winAmount > 0 ? "text-green-500" : "text-gray-500"}`}>
                      {winAmount > 0 ? `+${winAmount.toFixed(2)}` : "0.00"} BTC
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Max Win</div>
                    <div className="text-xl font-bold text-yellow-500">
                      {(Number.parseFloat(betAmount) * 50).toFixed(2)} BTC
                    </div>
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
                  <span className="text-sm text-gray-400">Biggest Win</span>
                  <span className="font-medium text-green-500">{gameStats.biggestWin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Hit Frequency</span>
                  <span className="font-medium">{gameStats.hitFrequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Jackpot Frequency</span>
                  <span className="font-medium text-yellow-500">{gameStats.jackpotFrequency}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <Umbrella className="h-4 w-4 mr-2 text-yellow-500" />
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
                  <span>Click SPIN to start the game.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>Match 3 symbols on the middle line to win!</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>Different symbol combinations have different payouts.</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Paytable */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <div className="p-4 border-b border-[#3a2a1a]">
              <h3 className="font-bold flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Paytable
              </h3>
            </div>

            <div className="divide-y divide-[#3a2a1a]">
              {paytable.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.description}</div>
                    <div className="text-sm text-gray-400">{item.symbols}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 font-medium">{item.multiplier}</div>
                  </div>
                </div>
              ))}
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
                      <div className="text-sm text-gray-400">{bet.amount} BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm ${bet.win.startsWith("+") && bet.win !== "+0.0" ? "text-green-500" : "text-red-500"}`}
                    >
                      {bet.win === "+0.0" ? "-" + bet.amount : bet.win}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

