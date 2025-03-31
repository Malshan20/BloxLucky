"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, History, Info, ChevronDown, ChevronUp, RefreshCw, Timer, Palmtree, Banana } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TropicalPlinioPage() {
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [gamePhase, setGamePhase] = useState<"waiting" | "dropping" | "result">("waiting")
  const [countdown, setCountdown] = useState<number>(10)
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null)
  const [winningMultiplier, setWinningMultiplier] = useState<number | null>(null)
  const [previousResults, setPreviousResults] = useState<number[]>([1.5, 3, 0.2, 5, 0.5, 2, 0.1, 10, 0.3, 1])
  const [showStats, setShowStats] = useState<boolean>(false)
  const [activeBet, setActiveBet] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Multiplier options for the game
  const multiplierOptions = [0.1, 0.2, 0.3, 0.5, 1, 1.5, 2, 3, 5, 10]

  // Mock player bets
  const playerBets = [
    {
      id: 1,
      player: "TropicalKing",
      avatar: "/avatar (1).svg?height=40&width=40",
      multiplier: "2x",
      amount: 0.25,
      profit: "+0.25",
    },
    {
      id: 2,
      player: "IslandQueen",
      avatar: "/avatar (1).svg?height=40&width=40",
      multiplier: "5x",
      amount: 1.5,
      profit: "+6.0",
    },
    {
      id: 3,
      player: "BeachRaider",
      avatar: "/avatar (1).svg?height=40&width=40",
      multiplier: "0.5x",
      amount: 0.5,
      profit: "-0.25",
    },
    {
      id: 4,
      player: "CoconutMaster",
      avatar: "/avatar (1).svg?height=40&width=40",
      multiplier: "3x",
      amount: 0.75,
      profit: "+1.5",
    },
    {
      id: 5,
      player: "SandPro",
      avatar: "/avatar (1).svg?height=40&width=40",
      multiplier: "0.1x",
      amount: 2.0,
      profit: "-1.8",
    },
  ]

  // Game statistics
  const gameStats = {
    totalPlayers: 1892,
    totalBets: 67341,
    highestMultiplier: 50,
    averageMultiplier: 2.1,
    winPercentage: "42%",
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
    if (gamePhase === "dropping") {
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

      // Initialize plinko board
      const boardWidth = canvas.width
      const boardHeight = canvas.height
      const pegRadius = 6
      const pegSpacing = 40
      const pegRows = 8
      const pegCols = 15
      const pegOffsetX = (boardWidth - (pegCols - 1) * pegSpacing) / 2
      const pegOffsetY = 60

      // Draw pegs
      const drawPegs = () => {
        ctx.clearRect(0, 0, boardWidth, boardHeight)

        // Draw tropical background
        drawTropicalBackground(ctx, boardWidth, boardHeight)

        // Draw multiplier zones at bottom
        drawMultiplierZones(ctx, boardWidth, boardHeight)

        // Draw pegs
        ctx.fillStyle = "#f0c040"
        ctx.strokeStyle = "#805000"
        ctx.lineWidth = 2

        for (let row = 0; row < pegRows; row++) {
          const cols = row % 2 === 0 ? pegCols : pegCols - 1
          const offsetX = row % 2 === 0 ? pegOffsetX : pegOffsetX + pegSpacing / 2

          for (let col = 0; col < cols; col++) {
            const x = offsetX + col * pegSpacing
            const y = pegOffsetY + row * pegSpacing

            ctx.beginPath()
            ctx.arc(x, y, pegRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
          }
        }
      }

      // Draw tropical background
      const drawTropicalBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, "rgba(25, 35, 25, 0.3)")
        gradient.addColorStop(1, "rgba(35, 45, 35, 0.2)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Draw some palm leaves
        ctx.strokeStyle = "rgba(50, 180, 50, 0.2)"
        ctx.lineWidth = 3

        // Left palm leaf
        ctx.beginPath()
        ctx.moveTo(20, 20)
        ctx.bezierCurveTo(50, 40, 80, 30, 100, 10)
        ctx.stroke()

        // Right palm leaf
        ctx.beginPath()
        ctx.moveTo(width - 20, 20)
        ctx.bezierCurveTo(width - 50, 40, width - 80, 30, width - 100, 10)
        ctx.stroke()
      }

      // Draw multiplier zones
      const drawMultiplierZones = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const zoneHeight = 60
        const zoneWidth = width / multiplierOptions.length

        multiplierOptions.forEach((multiplier, index) => {
          const x = index * zoneWidth
          const y = height - zoneHeight

          // Determine color based on multiplier
          let color
          if (multiplier < 1)
            color = "rgba(220, 50, 50, 0.7)" // Red for < 1x
          else if (multiplier <= 2)
            color = "rgba(220, 220, 50, 0.7)" // Yellow for 1-2x
          else color = "rgba(50, 220, 50, 0.7)" // Green for > 2x

          // Draw zone
          ctx.fillStyle = color
          ctx.fillRect(x, y, zoneWidth, zoneHeight)

          // Draw multiplier text
          ctx.fillStyle = "white"
          ctx.font = "bold 16px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${multiplier}x`, x + zoneWidth / 2, y + zoneHeight / 2)
        })
      }

      // Animate ball drop
      const animateBallDrop = () => {
        // Determine winning multiplier
        const randomIndex = Math.floor(Math.random() * multiplierOptions.length)
        const winMultiplier = multiplierOptions[randomIndex]

        // Ball properties
        const ball = {
          x: boardWidth / 2,
          y: 10,
          radius: 10,
          velocityX: 0,
          velocityY: 0,
          gravity: 0.2,
          friction: 0.8,
          elasticity: 0.6,
          targetX: pegOffsetX + randomIndex * pegSpacing,
        }

        // Animation function
        const animate = () => {
          // Apply gravity
          ball.velocityY += ball.gravity

          // Apply slight bias towards target
          if (ball.y < pegOffsetY + pegRows * pegSpacing) {
            const bias = (ball.targetX - ball.x) * 0.001
            ball.velocityX += bias
          }

          // Update position
          ball.x += ball.velocityX
          ball.y += ball.velocityY

          // Check for collisions with pegs
          for (let row = 0; row < pegRows; row++) {
            const cols = row % 2 === 0 ? pegCols : pegCols - 1
            const offsetX = row % 2 === 0 ? pegOffsetX : pegOffsetX + pegSpacing / 2

            for (let col = 0; col < cols; col++) {
              const pegX = offsetX + col * pegSpacing
              const pegY = pegOffsetY + row * pegSpacing

              const dx = ball.x - pegX
              const dy = ball.y - pegY
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < ball.radius + pegRadius) {
                // Calculate collision response
                const angle = Math.atan2(dy, dx)
                const targetX = pegX + Math.cos(angle) * (ball.radius + pegRadius)
                const targetY = pegY + Math.sin(angle) * (ball.radius + pegRadius)
                const ax = (targetX - ball.x) * 0.1
                const ay = (targetY - ball.y) * 0.1

                ball.velocityX -= ax
                ball.velocityY -= ay

                // Add some randomness
                ball.velocityX += (Math.random() - 0.5) * 2

                // Apply elasticity
                ball.velocityX *= ball.elasticity
                ball.velocityY *= ball.elasticity
              }
            }
          }

          // Bounce off walls
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius
            ball.velocityX = -ball.velocityX * ball.friction
          } else if (ball.x + ball.radius > boardWidth) {
            ball.x = boardWidth - ball.radius
            ball.velocityX = -ball.velocityX * ball.friction
          }

          // Check if ball reached bottom
          if (ball.y > boardHeight - 60 && ball.velocityY > 0) {
            // Determine which multiplier zone the ball landed in
            const zoneIndex = Math.floor(ball.x / (boardWidth / multiplierOptions.length))
            const finalMultiplier = multiplierOptions[Math.min(zoneIndex, multiplierOptions.length - 1)]

            // Stop animation and show result
            setWinningMultiplier(finalMultiplier)
            setGamePhase("result")

            // Add to history
            setPreviousResults([finalMultiplier, ...previousResults.slice(0, 9)])

            return
          }

          // Draw everything
          drawPegs()

          // Draw ball
          ctx.fillStyle = "#ffffff"
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          // Continue animation
          animationRef.current = requestAnimationFrame(animate)
        }

        // Start animation
        animate()
      }

      // Initial draw
      drawPegs()

      // Start ball drop after a short delay
      setTimeout(() => {
        animateBallDrop()
      }, 500)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gamePhase, multiplierOptions, previousResults])

  const startGame = () => {
    setGamePhase("dropping")
  }

  const resetGame = () => {
    setGamePhase("waiting")
    setCountdown(10)
    setWinningMultiplier(null)
    setSelectedMultiplier(null)
    setActiveBet(false)
    cancelAnimationFrame(animationRef.current)
  }

  useEffect(() => {
    if (gamePhase === "result") {
      // Reset after showing result
      const timer = setTimeout(() => {
        resetGame()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [gamePhase])

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value)
    }
  }

  const placeBet = (multiplier: number) => {
    if (gamePhase !== "waiting") return

    setSelectedMultiplier(multiplier)
    setActiveBet(true)
  }

  const clearBet = () => {
    setSelectedMultiplier(null)
    setActiveBet(false)
  }

  const getMultiplierColor = (value: number) => {
    if (value < 1) return "text-red-500"
    if (value <= 2) return "text-yellow-500"
    return "text-green-500"
  }

  const getMultiplierBgColor = (value: number) => {
    if (value < 1) return "bg-red-900/30"
    if (value <= 2) return "bg-yellow-900/30"
    return "bg-green-900/30"
  }

  const calculatePotentialWin = () => {
    if (!selectedMultiplier) return 0
    return Number.parseFloat(betAmount) * selectedMultiplier
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Tropical Plinko</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game and Betting Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Canvas */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden tropical-shadow relative">
            <CardContent className="p-0 h-[500px] relative">
              {gamePhase === "waiting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-4xl font-bold mb-4 flex items-center">
                    <Timer className="h-8 w-8 mr-2 text-yellow-500" />
                    <span>Starting in {countdown}s</span>
                  </div>
                  <div className="text-lg text-gray-300">Place your bets now!</div>
                </div>
              )}

              {gamePhase === "result" && winningMultiplier !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1a0e]/80 z-10">
                  <div className="text-5xl font-bold mb-4 text-white">RESULT</div>
                  <div className={`text-3xl font-bold ${getMultiplierColor(winningMultiplier)}`}>
                    {winningMultiplier}×
                  </div>

                  {activeBet && selectedMultiplier !== null && (
                    <div className="mt-6 text-xl">
                      {selectedMultiplier === winningMultiplier ? (
                        <div className="text-green-500">
                          You won {(Number.parseFloat(betAmount) * winningMultiplier).toFixed(2)} BTC!
                        </div>
                      ) : (
                        <div className="text-red-500">You lost {betAmount} BTC</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <canvas ref={canvasRef} className="w-full h-full" />

              {/* Game Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1e1a0e] to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {previousResults.map((value, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`${getMultiplierColor(value)} border-none text-sm font-medium`}
                    >
                      {value.toFixed(1)}×
                    </Badge>
                  ))}
                </div>
              </div>
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
                  <h4 className="text-sm text-gray-400 mb-2">Select Multiplier</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {multiplierOptions.map((multiplier) => (
                      <Button
                        key={multiplier}
                        variant="outline"
                        className={`${
                          selectedMultiplier === multiplier
                            ? "bg-green-900/30 border-green-600"
                            : getMultiplierBgColor(multiplier)
                        } ${getMultiplierColor(multiplier)}`}
                        onClick={() => placeBet(multiplier)}
                        disabled={gamePhase !== "waiting"}
                      >
                        {multiplier}×
                      </Button>
                    ))}
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
                  <span className="text-sm text-gray-400">Highest Multiplier</span>
                  <span className="font-medium text-green-500">{gameStats.highestMultiplier}×</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Average Multiplier</span>
                  <span className="font-medium">{gameStats.averageMultiplier}×</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Win Percentage</span>
                  <span className="font-medium">{gameStats.winPercentage}</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <Palmtree className="h-4 w-4 mr-2 text-green-500" />
                How to Play
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>Choose your bet amount and select a multiplier.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>The ball will drop through the pegs and land on a multiplier.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>If the ball lands on your chosen multiplier, you win!</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-900/30 text-green-500 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>Your winnings are your bet amount multiplied by the multiplier.</span>
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
                        {bet.multiplier} - {bet.amount} BTC
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
                  className={`flex items-center justify-center p-2 rounded-md ${getMultiplierBgColor(value)} ${getMultiplierColor(value)}`}
                >
                  <span className="font-bold">{value.toFixed(1)}×</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

