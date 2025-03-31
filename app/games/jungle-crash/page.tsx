"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  History,
  Users,
  Info,
  TreePalmIcon as PalmTree,
  Banana,
  Rocket,
  Timer,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function JungleCrashPage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [autoCashout, setAutoCashout] = useState<number>(2.0)
  const [gamePhase, setGamePhase] = useState<"waiting" | "in-progress" | "crashed">("waiting")
  const [multiplier, setMultiplier] = useState<number>(1.0)
  const [countdown, setCountdown] = useState<number>(5)
  const [activeBets, setActiveBets] = useState<boolean>(false)
  const [gameHistory, setGameHistory] = useState<number[]>([1.24, 3.57, 1.08, 8.42, 2.15, 1.92, 4.75, 1.01, 2.34, 5.67])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const multiplierSpeed = useRef<number>(1)
  const [showStats, setShowStats] = useState<boolean>(false)

  // Mock player bets
  const playerBets = [
    {
      id: 1,
      player: "JungleKing",
      avatar: "/avatar (1).svg?height=40&width=40",
      amount: 0.25,
      cashout: "2.5x",
      profit: "+0.375",
    },
    {
      id: 2,
      player: "TropicalQueen",
      avatar: "/avatar.svg?height=40&width=40",
      amount: 1.5,
      cashout: "1.8x",
      profit: "+1.2",
    },
    {
      id: 3,
      player: "IslandRaider",
      avatar: "/avatar.svg?height=40&width=40",
      amount: 0.5,
      cashout: "3.2x",
      profit: "+1.1",
    },
    {
      id: 4,
      player: "CoconutMaster",
      avatar: "/avatar.svg?height=40&width=40",
      amount: 0.75,
      cashout: "2.1x",
      profit: "+0.825",
    },
    {
      id: 5,
      player: "ParadisePro",
      avatar: "/avatar.svg?height=40&width=40",
      amount: 2.0,
      cashout: "1.5x",
      profit: "+1.0",
    },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 1287,
    totalBets: 45892,
    highestMultiplier: 248.65,
    averageMultiplier: 3.24,
    crashUnder2: "42%",
  }

  useEffect(() => {
    if (gamePhase === "waiting") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            startGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gamePhase])

  useEffect(() => {
    if (gamePhase === "in-progress") {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      const resizeCanvas = () => {
        const parent = canvas.parentElement
        if (parent) {
          canvas.width = parent.clientWidth
          canvas.height = parent.clientHeight
        }
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Start animation
      lastTimeRef.current = performance.now()
      multiplierSpeed.current = 1
      setMultiplier(1.0)

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current
        lastTimeRef.current = currentTime

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw jungle background elements
        drawJungleElements(ctx, canvas.width, canvas.height)

        // Update multiplier
        const multiplierIncrease = (deltaTime / 1000) * multiplierSpeed.current
        multiplierSpeed.current += deltaTime * 0.00001
        setMultiplier((prev) => {
          const newValue = prev + multiplierIncrease

          // Random chance to crash
          const crashChance = Math.random() * 100
          if ((newValue > 2 && crashChance < 0.1) || newValue > 20) {
            endGame()
            return newValue
          }

          return newValue
        })

        // Draw multiplier curve
        drawMultiplierCurve(ctx, canvas.width, canvas.height, multiplier)

        // Draw current multiplier
        drawMultiplierText(ctx, canvas.width, canvas.height, multiplier)

        if (gamePhase === "in-progress") {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gamePhase])

  const drawJungleElements = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(25, 35, 25, 0.8)")
    gradient.addColorStop(1, "rgba(35, 45, 35, 0.6)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw jungle vines
    ctx.strokeStyle = "rgba(50, 180, 50, 0.2)"
    ctx.lineWidth = 3

    // Vine 1
    ctx.beginPath()
    ctx.moveTo(width * 0.1, 0)
    ctx.bezierCurveTo(width * 0.2, height * 0.3, width * 0.1, height * 0.6, width * 0.15, height)
    ctx.stroke()

    // Vine 2
    ctx.beginPath()
    ctx.moveTo(width * 0.9, 0)
    ctx.bezierCurveTo(width * 0.8, height * 0.4, width * 0.9, height * 0.7, width * 0.85, height)
    ctx.stroke()

    // Draw some leaves
    const drawLeaf = (x: number, y: number, size: number, angle: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillStyle = "rgba(40, 160, 40, 0.2)"
      ctx.beginPath()
      ctx.ellipse(0, 0, size, size * 2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // Add some random leaves
    for (let i = 0; i < 10; i++) {
      drawLeaf(Math.random() * width, Math.random() * height, 5 + Math.random() * 10, Math.random() * Math.PI * 2)
    }
  }

  const drawMultiplierCurve = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    currentMultiplier: number,
  ) => {
    const points = []
    const startX = 50
    const endX = width - 50
    const startY = height - 50
    const curveHeight = height - 100

    // Generate points for the curve
    for (let i = 0; i <= 100; i++) {
      const progress = i / 100
      const x = startX + progress * (endX - startX)

      // Calculate y based on multiplier curve
      const multiplierAtPoint = 1 + progress * (currentMultiplier - 1)
      const normalizedMultiplier = Math.min(multiplierAtPoint / 10, 1) // Normalize to 0-1 range, capping at 10x
      const y = startY - normalizedMultiplier * curveHeight

      points.push({ x, y })
    }

    // Draw the curve
    ctx.strokeStyle = "rgba(0, 255, 100, 0.8)"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.stroke()

    // Draw glow effect
    ctx.strokeStyle = "rgba(0, 255, 100, 0.3)"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.stroke()

    // Draw rocket at the end of the curve
    const lastPoint = points[points.length - 1]
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.beginPath()
    ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw rocket trail
    ctx.fillStyle = "rgba(0, 255, 100, 0.5)"
    for (let i = Math.max(0, points.length - 20); i < points.length; i++) {
      const point = points[i]
      const size = ((i - (points.length - 20)) / 20) * 6
      if (size > 0) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawMultiplierText = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    currentMultiplier: number,
  ) => {
    ctx.fillStyle = "white"
    ctx.font = "bold 48px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const text = `${currentMultiplier.toFixed(2)}×`
    const x = width / 2
    const y = height / 3

    // Draw text shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillText(text, x + 2, y + 2)

    // Draw text
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.fillText(text, x, y)

    // Draw glow
    ctx.shadowColor = "rgba(0, 255, 100, 0.8)"
    ctx.shadowBlur = 10
    ctx.fillText(text, x, y)
    ctx.shadowBlur = 0
  }

  const startGame = () => {
    setGamePhase("in-progress")
  }

  const endGame = () => {
    cancelAnimationFrame(animationRef.current)
    setGamePhase("crashed")

    // Add current multiplier to history
    setGameHistory((prev) => [Number.parseFloat(multiplier.toFixed(2)), ...prev.slice(0, 9)])

    // Reset after 3 seconds
    setTimeout(() => {
      setGamePhase("waiting")
      setCountdown(5)
      setActiveBets(false)
    }, 3000)
  }

  const placeBet = () => {
    setActiveBets(true)
  }

  const cashOut = () => {
    setActiveBets(false)
    // In a real implementation, this would calculate winnings based on current multiplier
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value)
    }
  }

  const handleAutoCashoutChange = (value: number[]) => {
    setAutoCashout(value[0])
  }

  const getMultiplierColor = (value: number) => {
    if (value < 2) return "text-red-500"
    if (value < 5) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Jungle Crash</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Canvas */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow relative">
            <CardContent className="p-0 h-[400px] relative">
              {gamePhase === "waiting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Starting in {countdown}s</span>
                  </div>
                  <div className="text-lg text-gray-300">Place your bets now!</div>
                </div>
              )}

              {gamePhase === "crashed" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 z-10 animate-pulse">
                  <div className="text-5xl font-bold mb-4 text-white">CRASHED!</div>
                  <div className="text-3xl font-bold text-yellow-400">{multiplier.toFixed(2)}×</div>
                </div>
              )}

              <canvas ref={canvasRef} className="w-full h-full" />

              {/* Game Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1e1a0e] to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {gameHistory.map((value, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`${getMultiplierColor(value)} border-none text-sm font-medium`}
                    >
                      {value.toFixed(2)}×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Betting Controls */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
                    <Button variant="outline" size="icon" className="shrink-0">
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

                  <div className="pt-2">
                    {gamePhase === "waiting" ? (
                      <Button className="w-full bg-green-700 hover:bg-green-800 h-12 text-lg" onClick={placeBet}>
                        <Rocket className="h-5 w-5 mr-2" />
                        Place Bet
                      </Button>
                    ) : activeBets ? (
                      <Button
                        className="w-full bg-yellow-600 hover:bg-yellow-700 h-12 text-lg"
                        onClick={cashOut}
                        disabled={gamePhase === "crashed"}
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Cash Out ({(Number.parseFloat(betAmount) * multiplier).toFixed(2)})
                      </Button>
                    ) : (
                      <Button className="w-full bg-gray-700 hover:bg-gray-800 h-12 text-lg" disabled>
                        Waiting for next round
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center">
                    <PalmTree className="h-5 w-5 mr-2 text-green-500" />
                    Auto Cashout
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Multiplier</span>
                      <span className="font-medium">{autoCashout.toFixed(2)}×</span>
                    </div>

                    <Slider
                      value={[autoCashout]}
                      min={1.1}
                      max={10}
                      step={0.1}
                      onValueChange={handleAutoCashoutChange}
                      className="py-4"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      {[1.5, 2, 5].map((value) => (
                        <Button
                          key={value}
                          variant="outline"
                          size="sm"
                          onClick={() => setAutoCashout(value)}
                          className="h-8"
                        >
                          {value}×
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>Potential Profit</span>
                      <span className="text-green-500 font-medium">
                        +{(Number.parseFloat(betAmount || "0") * (autoCashout - 1)).toFixed(4)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Chance of Winning</span>
                      <span className="font-medium">
                        {Math.max(0, Math.min(99, Math.floor(100 / autoCashout))).toFixed(0)}%
                      </span>
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
                  <span className="text-sm text-gray-400">Highest Multiplier</span>
                  <span className="font-medium text-green-500">{gameStats.highestMultiplier}×</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Average Multiplier</span>
                  <span className="font-medium">{gameStats.averageMultiplier}×</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Crash Under 2×</span>
                  <span className="font-medium">{gameStats.crashUnder2}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <PalmTree className="h-4 w-4 mr-2 text-green-500" />
                How to Play
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>Place your bet before the round starts.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>Watch the multiplier increase from 1.00×.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>Cash out before the game crashes to win!</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>If you don't cash out before the crash, you lose your bet.</span>
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
                      <div className="text-sm text-gray-400">{bet.amount} BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{bet.cashout}</div>
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
              {gameHistory.map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    value < 2
                      ? "bg-red-900/30 text-red-500"
                      : value < 5
                        ? "bg-yellow-900/30 text-yellow-500"
                        : "bg-green-900/30 text-green-500"
                  }`}
                >
                  <span className="font-bold">{value.toFixed(2)}×</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

