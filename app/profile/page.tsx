"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Calendar, Clock, Users, Award, Gift, Zap, ChevronRight, Edit, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import JungleDecorations from "@/components/jungle-decorations"

export default function ProfilePage() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(78)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mock user data
  const userData = {
    username: "TropicalGamer",
    level: 42,
    joinDate: "May 2023",
    playTime: "423 hours",
    friends: 87,
    vipStatus: "Gold",
    balance: "$2,450.75",
    totalWins: 1243,
    winRate: "68%",
    achievements: [
      {
        id: 1,
        name: "Jungle Master",
        description: "Win 100 games of Jungle Crash",
        completed: true,
        date: "2023-08-15",
      },
      {
        id: 2,
        name: "Big Spender",
        description: "Make a deposit of $1000 or more",
        completed: true,
        date: "2023-07-22",
      },
      { id: 3, name: "Lucky Streak", description: "Win 10 games in a row", completed: true, date: "2023-09-05" },
      { id: 4, name: "Social Butterfly", description: "Add 50 friends", completed: true, date: "2023-10-12" },
      { id: 5, name: "High Roller", description: "Place a bet of $500 or more", completed: true, date: "2023-11-03" },
      { id: 6, name: "Coconut Collector", description: "Collect 1000 coconuts", completed: false, progress: 78 },
    ],
    recentActivity: [
      { id: 1, type: "win", game: "Jungle Crash", amount: "+$245.50", date: "2 hours ago" },
      { id: 2, type: "deposit", amount: "+$500.00", date: "Yesterday" },
      { id: 3, type: "purchase", item: "Tropical Avatar Pack", amount: "-$25.00", date: "3 days ago" },
      { id: 4, type: "win", game: "Island Roulette", amount: "+$120.75", date: "5 days ago" },
      { id: 5, type: "loss", game: "Coconut Flip", amount: "-$50.00", date: "1 week ago" },
    ],
    inventory: [
      { id: 1, name: "Exotic Parrot Avatar", rarity: "Legendary", acquired: "2023-10-15" },
      { id: 2, name: "Golden Coconut", rarity: "Epic", acquired: "2023-09-22" },
      { id: 3, name: "Tropical Username Color", rarity: "Rare", acquired: "2023-08-30" },
      { id: 4, name: "VIP Badge", rarity: "Exclusive", acquired: "2023-07-18" },
    ],
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900/20 to-blue-900/20 pb-20">
      <JungleDecorations />

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-primary/20 shadow-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <Avatar className="h-32 w-32 border-4 border-primary shadow-glow">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={userData.username} />
              <AvatarFallback className="bg-primary text-4xl">
                {userData.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Button size="sm" variant="outline" className="rounded-full h-10 w-10 p-0 bg-background/80">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </Button>
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <h1 className="text-3xl font-bold text-primary-foreground mb-1">{userData.username}</h1>
              <p className="text-muted-foreground mb-4">
                Level {userData.level} • {userData.vipStatus} VIP
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Joined {userData.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">{userData.playTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">{userData.friends} Friends</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm">{userData.totalWins} Wins</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              <Button className="gap-2">
                <Gift className="h-4 w-4" />
                Send Gift
              </Button>
              <Link href="/settings">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button variant="secondary" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-black/30 rounded-lg p-4 border border-primary/20 min-w-[200px]"
          >
            <h3 className="text-lg font-semibold mb-2 text-primary">Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium">{userData.balance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate:</span>
                <span className="font-medium">{userData.winRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Wins:</span>
                <span className="font-medium">{userData.totalWins}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest actions and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-primary/10 hover:bg-black/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {activity.type === "win" && <Trophy className="h-5 w-5 text-green-500" />}
                          {activity.type === "loss" && <Trophy className="h-5 w-5 text-red-500" />}
                          {activity.type === "deposit" && <Zap className="h-5 w-5 text-blue-500" />}
                          {activity.type === "purchase" && <Gift className="h-5 w-5 text-purple-500" />}

                          <div>
                            {activity.type === "win" && <p className="font-medium">Won on {activity.game}</p>}
                            {activity.type === "loss" && <p className="font-medium">Lost on {activity.game}</p>}
                            {activity.type === "deposit" && <p className="font-medium">Made a deposit</p>}
                            {activity.type === "purchase" && <p className="font-medium">Purchased {activity.item}</p>}
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <div
                          className={`font-semibold ${activity.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {activity.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Your gaming accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={`p-4 rounded-lg border ${achievement.completed ? "bg-primary/10 border-primary/30" : "bg-black/20 border-primary/10"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-full p-2 ${achievement.completed ? "bg-primary/20" : "bg-black/30"}`}
                          >
                            <Award
                              className={`h-6 w-6 ${achievement.completed ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{achievement.name}</h3>
                              {achievement.completed && (
                                <Badge variant="outline" className="bg-primary/20 text-primary-foreground">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>

                            {achievement.completed && achievement.date ? (
                              <p className="text-xs text-muted-foreground mt-2">
                                Completed on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            ) : (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <progress value={achievement.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Your Inventory
                  </CardTitle>
                  <CardDescription>Items and collectibles you own</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userData.inventory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="bg-black/30 rounded-lg border border-primary/20 overflow-hidden group hover:border-primary/50 transition-all"
                      >
                        <div className="aspect-square relative bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                          <Gift className="h-16 w-16 text-primary/70 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <Badge
                              variant="outline"
                              className={`
                                ${item.rarity === "Legendary" ? "bg-yellow-500/20 text-yellow-500" : ""}
                                ${item.rarity === "Epic" ? "bg-purple-500/20 text-purple-500" : ""}
                                ${item.rarity === "Rare" ? "bg-blue-500/20 text-blue-500" : ""}
                                ${item.rarity === "Exclusive" ? "bg-red-500/20 text-red-500" : ""}
                              `}
                            >
                              {item.rarity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.acquired).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Friends
                  </CardTitle>
                  <CardDescription>Your gaming buddies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-primary/10 hover:bg-black/30 transition-colors"
                      >
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=Friend${index + 1}`} />
                          <AvatarFallback>F{index + 1}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">Friend {index + 1}</h3>
                            {index % 3 === 0 && (
                              <Badge className="ml-2 bg-green-500/20 text-green-500 text-xs">Online</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">Level {Math.floor(Math.random() * 50) + 10}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="gap-2">
                      <Users className="h-4 w-4" />
                      View All Friends
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

