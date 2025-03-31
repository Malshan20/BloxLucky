"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Info, ChevronDown, ChevronUp, RefreshCw, Timer, Palmtree, Shell, SunMedium } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ParadiseJackpotPage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [gamePhase, setGamePhase] = useState<"waiting" | "spinning" | "result">("waiting")
  const [countdown, setCountdown] = useState<number>(5)
  const [reels, setReels] = useState<Array<Array<string>>>([
    ["🌴", "🍹", "🐚", "🏝️", "🌊", "🍍", "💎", "🌺"],
    ["🌴", "🍹", "🐚", "🏝️", "🌊", "🍍", "💎", "🌺"],
    ["🌴", "🍹", "🐚", "🏝️", "🌊", "🍍", "💎", "🌺"],
    ["🌴", "🍹", "🐚", "🏝️", "🌊", "🍍", "💎", "🌺"],
    ["🌴", "🍹", "🐚", "🏝️", "🌊", "🍍", "💎", "🌺"],
  ])
  const [spinningReels, setSpinningReels] = useState<Array<Array<string>>>([[], [], [], [], []])
  const [reelPositions, setReelPositions] = useState<number[]>([0, 0, 0, 0, 0])
  const [winAmount, setWinAmount] = useState<number>(0)
  const [jackpotWon, setJackpotWon] = useState<boolean>(false)
  const [jackpotAmount, setJackpotAmount] = useState<number>(12345.67)
  const [previousWins, setPreviousWins] = useState<number[]>([0, 0.5, 2, 0, 1, 0, 5, 0, 0.2, 0])
  const [showStats, setShowStats] = useState<boolean>(false)
  const [activeBet, setActiveBet] = useState<boolean>(false)
  const [autoSpin, setAutoSpin] = useState<boolean>(false)
  const [autoSpinCount, setAutoSpinCount] = useState<number>(0)
  const [selectedLines, setSelectedLines] = useState<number>(10)
  const reelsRef = useRef<HTMLDivElement>(null)

  // Symbol values
  const symbolValues: Record<string, number> = {
    "💎": 10, // Diamond - highest value
    "🌴": 5, // Palm tree
    "🏝️": 4, // Island
    "🌺": 3, // Flower
    "🍹": 2, // Cocktail
    "🍍": 2, // Pineapple
    "🐚": 1, // Shell
    "🌊": 1, // Wave - lowest value
  }

  // Paylines (5x3 grid, 0-indexed)
  const paylines = [
    // Horizontal lines
    [1, 1, 1, 1, 1], // Middle row
    [0, 0, 0, 0, 0], // Top row
    [2, 2, 2, 2, 2], // Bottom row
    // V-shapes
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    // Zigzag
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    // Diagonal
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    // Custom
    [1, 0, 1, 0, 1],
  ]

  // Mock player bets
  const playerBets = [
    { id: 1, player: "ParadiseKing", avatar: "/avatar (2).svg?height=40&width=40", amount: 0.25, win: "+12.5" },
    { id: 2, player: "IslandQueen", avatar: "/avatar (1).svg?height=40&width=40", amount: 1.5, win: "+0.0" },
    { id: 3, player: "JackpotHunter", avatar: "/avatar (3).svg?height=40&width=40", amount: 0.5, win: "+2.5" },
    { id: 4, player: "DiamondMaster", avatar: "/avatar (2).svg?height=40&width=40", amount: 0.75, win: "+0.0" },
    { id: 5, player: "TropicalPro", avatar: "/avatar (1).svg?height=40&width=40", amount: 5.0, win: "+1250.0" },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 5678,
    totalBets: 123456,
    biggestWin: "5000x",
    jackpotHits: 12,
    averageReturn: "96.5%",
  }

  // Paytable
  const paytable = [
    { symbols: "💎💎💎💎💎", multiplier: "Jackpot", description: "Diamond Jackpot" },
    { symbols: "🌴🌴🌴🌴🌴", multiplier: "500x", description: "Paradise Line" },
    { symbols: "🏝️🏝️🏝️🏝️🏝️", multiplier: "250x", description: "Island Escape" },
    { symbols: "🌺🌺🌺🌺🌺", multiplier: "100x", description: "Flower Power" },
    { symbols: "🍹🍹🍹🍹🍹", multiplier: "50x", description: "Cocktail Party" },
    { symbols: "🍍🍍🍍🍍🍍", multiplier: "50x", description: "Pineapple Express" },
    { symbols: "🐚🐚🐚🐚🐚", multiplier: "25x", description: "Shell Collection" },
    { symbols: "🌊🌊🌊🌊🌊", multiplier: "25x", description: "Wave Runner" },
    { symbols: "Any 5 same", multiplier: "Varies", description: "Five of a Kind" },
    { symbols: "Any 4 same", multiplier: "5-50x", description: "Four of a Kind" },
    { symbols: "Any 3 same", multiplier: "2-10x", description: "Three of a Kind" },
  ]

  useEffect(() => {
    // Simulate jackpot increasing over time
    const jackpotTimer = setInterval(() => {
      setJackpotAmount((prev) => prev + 0.01)
    }, 1000)

    return () => clearInterval(jackpotTimer)
  }, [])

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
    setJackpotWon(false)

    // Generate longer reels for animation
    const extendedReels = [
      generateRandomSymbols(20),
      generateRandomSymbols(20),
      generateRandomSymbols(20),
      generateRandomSymbols(20),
      generateRandomSymbols(20),
    ]

    setSpinningReels(extendedReels)

    // Determine final positions (last 3 symbols will be visible)
    const finalPositions = [
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8),
    ]

    // Set final symbols
    const finalReels = [
      [reels[0][finalPositions[0]], reels[0][(finalPositions[0] + 1) % 8], reels[0][(finalPositions[0] + 2) % 8]],
      [reels[1][finalPositions[1]], reels[1][(finalPositions[1] + 1) % 8], reels[1][(finalPositions[1] + 2) % 8]],
      [reels[2][finalPositions[2]], reels[2][(finalPositions[2] + 1) % 8], reels[2][(finalPositions[2] + 2) % 8]],
      [reels[3][finalPositions[3]], reels[3][(finalPositions[3] + 1) % 8], reels[3][(finalPositions[3] + 2) % 8]],
      [reels[4][finalPositions[4]], reels[4][(finalPositions[4] + 1) % 8], reels[4][(finalPositions[4] + 2) % 8]],
    ]

    // Animate reels
    let reelDelay = 0

    for (let i = 0; i < 5; i++) {
      reelDelay += 400 // Stagger the reel stops

      setTimeout(() => {
        // Update reel position
        setReelPositions((prev) => {
          const newPositions = [...prev]
          newPositions[i] = finalPositions[i]
          return newPositions
        })

        // If last reel, check for wins
        if (i === 4) {
          setTimeout(() => {
            const { win, jackpot } = calculateWin(finalReels)
            setWinAmount(win)
            setJackpotWon(jackpot)

            if (jackpot) {
              // Player won the jackpot!
              setWinAmount(jackpotAmount)
            }

            setGamePhase("result")

            // Add to history if there was a win
            if (win > 0 || jackpot) {
              setPreviousWins([jackpot ? jackpotAmount : win, ...previousWins.slice(0, 9)])
            }
          }, 500)
        }
      }, reelDelay)
    }
  }

  const calculateWin = (finalReels: string[][]): { win: number; jackpot: boolean } => {
    const bet = Number.parseFloat(betAmount) || 0.01
    const lineBet = bet / selectedLines
    let totalWin = 0
    let jackpotWon = false

    // Check each active payline
    for (let i = 0; i < selectedLines; i++) {
      const payline = paylines[i]
      const symbols: string[] = []

      // Get symbols on this payline
      for (let j = 0; j < 5; j++) {
        symbols.push(finalReels[j][payline[j]])
      }

      // Check for 5 diamonds (jackpot)
      if (symbols.every((s) => s === "💎")) {
        jackpotWon = true
        continue // Skip normal win calculation for jackpot
      }

      // Check for 5 of a kind
      if (symbols.every((s) => s === symbols[0])) {
        const symbol = symbols[0]
        const value = symbolValues[symbol] || 1
        totalWin += lineBet * value * 25 // 25x multiplier for 5 of a kind
        continue
      }

      // Check for 4 of a kind
      const firstFour = symbols.slice(0, 4)
      if (firstFour.every((s) => s === firstFour[0])) {
        const symbol = firstFour[0]
        const value = symbolValues[symbol] || 1
        totalWin += lineBet * value * 5 // 5x multiplier for 4 of a kind
        continue
      }

      // Check for 3 of a kind
      const firstThree = symbols.slice(0, 3)
      if (firstThree.every((s) => s === firstThree[0])) {
        const symbol = firstThree[0]
        const value = symbolValues[symbol] || 1
        totalWin += lineBet * value * 2 // 2x multiplier for 3 of a kind
      }
    }

    return { win: totalWin, jackpot: jackpotWon }
  }

  const resetGame = () => {
    setGamePhase("waiting")
    setCountdown(5)
    setWinAmount(0)
    setJackpotWon(false)
    setActiveBet(true)

    // Generate new symbols for each reel
    const newReels = [
      generateRandomSymbols(8),
      generateRandomSymbols(8),
      generateRandomSymbols(8),
      generateRandomSymbols(8),
      generateRandomSymbols(8),
    ]

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

  const setLines = (lines: number) => {
    setSelectedLines(lines)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Paradise Jackpot</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Jackpot Display */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-yellow-500 mb-1">PARADISE JACKPOT</h2>
                <div className="text-3xl font-bold text-green-500">{jackpotAmount.toFixed(2)} BTC</div>
              </div>
            </CardContent>
          </Card>

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

              {gamePhase === "result" && (winAmount > 0 || jackpotWon) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  {jackpotWon ? (
                    <>
                      <div className="text-5xl font-bold mb-4 text-yellow-400 animate-pulse">JACKPOT!</div>
                      <div className="text-3xl font-bold text-green-500">+{jackpotAmount.toFixed(2)} BTC</div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold mb-4 text-yellow-400">WIN!</div>
                      <div className="text-3xl font-bold text-green-500">+{winAmount.toFixed(2)} BTC</div>
                    </>
                  )}
                </div>
              )}

              {/* Slot Machine */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[600px] h-[300px] bg-[#3a2a1a] rounded-lg border-4 border-[#4d3a25] overflow-hidden">
                  {/* Paradise background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-yellow-600/30"></div>
                    <div className="absolute top-0 left-0 right-0 h-2/3 bg-blue-500/20"></div>
                  </div>

                  {/* Reels container */}
                  <div ref={reelsRef} className="absolute inset-0 flex justify-center items-center p-4">
                    <div className="grid grid-cols-5 gap-2 w-full h-full">
                      {Array.from({ length: 5 }).map((_, reelIndex) => (
                        <div key={reelIndex} className="bg-[#241a10] rounded-lg overflow-hidden relative">
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-5xl">
                            {gamePhase === "spinning" ? (
                              <div className={`animate-spin-slow-${reelIndex + 1}`}>
                                {spinningReels[reelIndex].map((symbol, index) => (
                                  <div key={index} className="h-[100px] flex items-center justify-center">
                                    {symbol}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <>
                                <div className="h-[100px] flex items-center justify-center">
                                  {reels[reelIndex][(reelPositions[reelIndex] + 0) % 8]}
                                </div>
                                <div className="h-[100px] flex items-center justify-center">
                                  {reels[reelIndex][(reelPositions[reelIndex] + 1) % 8]}
                                </div>
                                <div className="h-[100px] flex items-center justify-center">
                                  {reels[reelIndex][(reelPositions[reelIndex] + 2) % 8]}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payline indicators */}
                  {selectedLines > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                  {selectedLines > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                  {selectedLines > 1 && (
                    <>
                      <div className="absolute left-0 top-[25%] -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="absolute right-0 top-[25%] -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-500"></div>
                    </>
                  )}
                  {selectedLines > 2 && (
                    <>
                      <div className="absolute left-0 top-[75%] -translate-y-1/2 w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="absolute right-0 top-[75%] -translate-y-1/2 w-2 h-2 rounded-full bg-red-500"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Tropical Background Elements */}
              <div className="absolute top-10 left-10 text-blue-500/20">
                <SunMedium size={60} />
              </div>
              <div className="absolute bottom-10 right-10 text-green-500/20">
                <Palmtree size={60} />
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
                
                @keyframes spin-slow-4 {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-2000px); }
                }
                
                @keyframes spin-slow-5 {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-2000px); }
                }
                
                .animate-spin-slow-1 {
                  animation: spin-slow-1 2.5s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-2 {
                  animation: spin-slow-2 3s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-3 {
                  animation: spin-slow-3 3.5s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-4 {
                  animation: spin-slow-4 4s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
                }
                
                .animate-spin-slow-5 {
                  animation: spin-slow-5 4.5s cubic-bezier(0.3, 0.1, 0.3, 1) forwards;
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

                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Paylines</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 3, 5, 7, 10].map((lines) => (
                      <Button
                        key={lines}
                        variant={selectedLines === lines ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLines(lines)}
                        className={selectedLines === lines ? "bg-green-700 hover:bg-green-800" : ""}
                        disabled={gamePhase !== "waiting" || autoSpin}
                      >
                        {lines}
                      </Button>
                    ))}
                  </div>
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
                    <div className="text-sm text-gray-400 mb-1">Total Bet</div>
                    <div className="text-xl font-bold text-yellow-500">
                      {Number.parseFloat(betAmount).toFixed(2)} BTC
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
                  <span className="text-sm text-gray-400">Jackpot Hits</span>
                  <span className="font-medium text-yellow-500">{gameStats.jackpotHits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Average Return</span>
                  <span className="font-medium">{gameStats.averageReturn}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <SunMedium className="h-4 w-4 mr-2 text-yellow-500" />
                How to Play
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>Choose your bet amount and number of paylines.</span>
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
                  <span>Match symbols on active paylines to win!</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-900/30 text-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>Get 5 diamonds to win the progressive jackpot!</span>
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
                    <div
                      className={`font-medium ${item.multiplier === "Jackpot" ? "text-yellow-400" : "text-green-500"}`}
                    >
                      {item.multiplier}
                    </div>
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

