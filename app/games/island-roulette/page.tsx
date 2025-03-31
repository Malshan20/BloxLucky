"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, History, Info, ChevronDown, ChevronUp, RefreshCw, Timer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function IslandRoulettePage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [selectedBets, setSelectedBets] = useState<{ [key: string]: number }>({})
  const [gamePhase, setGamePhase] = useState<"waiting" | "spinning" | "result">("waiting")
  const [countdown, setCountdown] = useState<number>(15)
  const [winningNumber, setWinningNumber] = useState<number | null>(null)
  const [previousResults, setPreviousResults] = useState<number[]>([7, 32, 19, 5, 21, 3, 14, 36, 0, 11])
  const [showStats, setShowStats] = useState<boolean>(false)
  const wheelRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)

  // Roulette numbers in order on the wheel
  const wheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
    7, 28, 12, 35, 3, 26,
  ]

  // Color mapping for numbers
  const getNumberColor = (num: number): string => {
    if (num === 0) return "green"
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    return redNumbers.includes(num) ? "red" : "black"
  }

  // Mock player bets
  const playerBets = [
    {
      id: 1,
      player: "IslandKing",
      avatar: "/avatar (3).svg?height=40&width=40",
      bet: "Red",
      amount: 0.25,
      profit: "+0.25",
    },
    {
      id: 2,
      player: "BeachQueen",
      avatar: "/avatar (3).svg?height=40&width=40",
      bet: "Even",
      amount: 1.5,
      profit: "+1.5",
    },
    {
      id: 3,
      player: "TropicalRaider",
      avatar: "/avatar (3).svg?height=40&width=40",
      bet: "1-12",
      amount: 0.5,
      profit: "+1.5",
    },
    {
      id: 4,
      player: "SandMaster",
      avatar: "/avatar (1).svg?height=40&width=40",
      bet: "19",
      amount: 0.75,
      profit: "+27.0",
    },
    {
      id: 5,
      player: "WavePro",
      avatar: "/avatar (1).svg?height=40&width=40",
      bet: "Black",
      amount: 2.0,
      profit: "+2.0",
    },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 1456,
    totalBets: 52341,
    mostCommonNumber: 17,
    redPercentage: "48.2%",
    blackPercentage: "48.6%",
    zeroPercentage: "3.2%",
  }

  // Bet types and payouts
  const betTypes = [
    { name: "Straight", description: "Bet on a single number", payout: "35:1" },
    { name: "Split", description: "Bet on 2 adjacent numbers", payout: "17:1" },
    { name: "Street", description: "Bet on 3 numbers in a row", payout: "11:1" },
    { name: "Corner", description: "Bet on 4 numbers in a square", payout: "8:1" },
    { name: "Six Line", description: "Bet on 6 numbers (2 rows)", payout: "5:1" },
    { name: "Dozen", description: "Bet on 12 numbers (1-12, 13-24, 25-36)", payout: "2:1" },
    { name: "Column", description: "Bet on a column of 12 numbers", payout: "2:1" },
    { name: "Red/Black", description: "Bet on all red or all black numbers", payout: "1:1" },
    { name: "Odd/Even", description: "Bet on all odd or all even numbers", payout: "1:1" },
    { name: "1-18/19-36", description: "Bet on first or second half of numbers", payout: "1:1" },
  ]

  useEffect(() => {
    if (gamePhase === "waiting") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            spinWheel()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gamePhase])

  const spinWheel = () => {
    setGamePhase("spinning")

    // Determine winning number
    const randomNumber = Math.floor(Math.random() * 37) // 0-36
    setWinningNumber(randomNumber)

    // Animate wheel
    if (wheelRef.current && ballRef.current) {
      // Calculate rotation based on winning number
      const numberIndex = wheelNumbers.indexOf(randomNumber)
      const rotationDegrees = numberIndex * (360 / 37) + 360 * 5 // 5 full rotations + position

      // Apply rotation animation to wheel
      wheelRef.current.style.transition = "transform 8s cubic-bezier(0.2, 0.8, 0.2, 1)"
      wheelRef.current.style.transform = `rotate(${rotationDegrees}deg)`

      // Apply counter-rotation to ball to keep it upright
      ballRef.current.style.transition = "transform 8s cubic-bezier(0.2, 0.8, 0.2, 1)"
      ballRef.current.style.transform = `rotate(${-rotationDegrees}deg)`
    }

    // Show result after animation
    setTimeout(() => {
      setGamePhase("result")
      setPreviousResults([randomNumber, ...previousResults.slice(0, 9)])

      // Reset after showing result
      setTimeout(() => {
        resetGame()
      }, 5000)
    }, 8000)
  }

  const resetGame = () => {
    setGamePhase("waiting")
    setCountdown(15)
    setSelectedBets({})
    setWinningNumber(null)

    // Reset wheel animation
    if (wheelRef.current && ballRef.current) {
      wheelRef.current.style.transition = "none"
      wheelRef.current.style.transform = "rotate(0deg)"
      ballRef.current.style.transition = "none"
      ballRef.current.style.transform = "rotate(0deg)"
    }
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value)
    }
  }

  const placeBet = (betType: string) => {
    const amount = Number.parseFloat(betAmount) || 0
    if (amount <= 0) return

    setSelectedBets((prev) => ({
      ...prev,
      [betType]: (prev[betType] || 0) + amount,
    }))
  }

  const clearBets = () => {
    setSelectedBets({})
  }

  const getTotalBetAmount = () => {
    return Object.values(selectedBets).reduce((sum, amount) => sum + amount, 0)
  }

  const getNumberColorClass = (num: number) => {
    const color = getNumberColor(num)
    if (color === "red") return "bg-red-600"
    if (color === "black") return "bg-black"
    return "bg-green-600"
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Island Roulette</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Roulette Wheel */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow relative">
            <CardContent className="p-0 h-[400px] relative">
              {gamePhase === "waiting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Betting closes in {countdown}s</span>
                  </div>
                  <div className="text-lg text-gray-300">Place your bets now!</div>
                </div>
              )}

              {gamePhase === "result" && winningNumber !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-5xl font-bold mb-4 text-white">RESULT</div>
                  <div
                    className={`text-3xl font-bold text-white h-16 w-16 rounded-full flex items-center justify-center ${getNumberColorClass(winningNumber)}`}
                  >
                    {winningNumber}
                  </div>
                </div>
              )}

              {/* Roulette Wheel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[300px] h-[300px]">
                  {/* Wheel background */}
                  <div
                    ref={wheelRef}
                    className="absolute inset-0 rounded-full border-4 border-[#4d3a25] bg-[#3a2a1a] overflow-hidden"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23228855' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
                    }}
                  >
                    {/* Wheel numbers */}
                    {wheelNumbers.map((num, index) => {
                      const angle = index * (360 / wheelNumbers.length)
                      const color = getNumberColor(num)
                      return (
                        <div
                          key={index}
                          className="absolute w-full h-full"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <div
                            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[150px] origin-bottom
                              ${color === "red" ? "bg-red-600" : color === "black" ? "bg-black" : "bg-green-600"}`}
                            style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
                          >
                            <span
                              className="absolute top-[10px] left-1/2 -translate-x-1/2 text-white font-bold text-sm"
                              style={{ transform: "rotate(180deg)" }}
                            >
                              {num}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Center of wheel */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[#4d3a25] z-10 flex items-center justify-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#5d4a35]"></div>
                  </div>

                  {/* Ball */}
                  <div
                    ref={ballRef}
                    className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full bg-white z-20 shadow-lg"
                  ></div>
                </div>
              </div>

              {/* Previous Results */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1e1a0e] to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {previousResults.map((num, index) => {
                    const color = getNumberColor(num)
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`border-none text-sm font-medium ${
                          color === "red" ? "bg-red-600" : color === "black" ? "bg-black" : "bg-green-600"
                        } text-white`}
                      >
                        {num}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Betting Controls */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Place Your Bets</h3>
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

                {/* Roulette Table */}
                <div className="bg-[#3a2a1a] rounded-lg p-4 border border-[#4d3a25]">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["1-12"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("1-12")}
                      disabled={gamePhase !== "waiting"}
                    >
                      1st 12
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["13-24"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("13-24")}
                      disabled={gamePhase !== "waiting"}
                    >
                      2nd 12
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["25-36"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("25-36")}
                      disabled={gamePhase !== "waiting"}
                    >
                      3rd 12
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["1-18"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("1-18")}
                      disabled={gamePhase !== "waiting"}
                    >
                      1-18
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["Even"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("Even")}
                      disabled={gamePhase !== "waiting"}
                    >
                      Even
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 bg-red-600 text-white ${selectedBets["Red"] ? "bg-red-700 border-white" : ""}`}
                      onClick={() => placeBet("Red")}
                      disabled={gamePhase !== "waiting"}
                    >
                      Red
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className={`h-12 bg-black text-white ${selectedBets["Black"] ? "bg-gray-900 border-white" : ""}`}
                      onClick={() => placeBet("Black")}
                      disabled={gamePhase !== "waiting"}
                    >
                      Black
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["Odd"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("Odd")}
                      disabled={gamePhase !== "waiting"}
                    >
                      Odd
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${selectedBets["19-36"] ? "bg-green-900/30 border-green-600" : ""}`}
                      onClick={() => placeBet("19-36")}
                      disabled={gamePhase !== "waiting"}
                    >
                      19-36
                    </Button>
                  </div>

                  {/* Number Grid */}
                  <div className="mt-4 grid grid-cols-12 gap-1">
                    <Button
                      variant="outline"
                      className={`h-10 bg-green-600 text-white ${selectedBets["0"] ? "bg-green-700 border-white" : ""}`}
                      onClick={() => placeBet("0")}
                      disabled={gamePhase !== "waiting"}
                    >
                      0
                    </Button>

                    {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        className={`h-10 ${
                          getNumberColor(num) === "red"
                            ? `bg-red-600 text-white ${selectedBets[num.toString()] ? "bg-red-700 border-white" : ""}`
                            : `bg-black text-white ${selectedBets[num.toString()] ? "bg-gray-900 border-white" : ""}`
                        }`}
                        onClick={() => placeBet(num.toString())}
                        disabled={gamePhase !== "waiting"}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="destructive"
                    onClick={clearBets}
                    disabled={gamePhase !== "waiting" || Object.keys(selectedBets).length === 0}
                  >
                    Clear Bets
                  </Button>

                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Total Bet Amount</div>
                    <div className="text-xl font-bold">{getTotalBetAmount().toFixed(2)}</div>
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
                  <span className="text-sm text-gray-400">Most Common Number</span>
                  <span className="font-medium">{gameStats.mostCommonNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Red Percentage</span>
                  <span className="font-medium text-red-500">{gameStats.redPercentage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Black Percentage</span>
                  <span className="font-medium">{gameStats.blackPercentage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Zero Percentage</span>
                  <span className="font-medium text-green-500">{gameStats.zeroPercentage}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2">Bet Types & Payouts</h4>
              <div className="space-y-2 text-sm">
                {betTypes.map((bet, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="font-medium">{bet.name}</span>
                      <span className="text-gray-400 text-xs ml-1">({bet.description})</span>
                    </div>
                    <span className="text-green-400">{bet.payout}</span>
                  </div>
                ))}
              </div>
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
                        {bet.bet} - {bet.amount} BTC
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-500">{bet.profit}</div>
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
              {previousResults.map((num, index) => {
                const color = getNumberColor(num)
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center p-2 rounded-md ${
                      color === "red"
                        ? "bg-red-900/30 text-red-500"
                        : color === "black"
                          ? "bg-gray-900/30 text-white"
                          : "bg-green-900/30 text-green-500"
                    }`}
                  >
                    <span className="font-bold">{num}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

