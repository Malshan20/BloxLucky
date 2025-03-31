"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Copy, Clock, RefreshCw, History } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("balance")
  const [copySuccess, setCopySuccess] = useState(false)

  // Mock wallet data
  const walletData = {
    balance: 1250.75,
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactions: [
      { id: 1, type: "deposit", amount: 500, status: "completed", date: "2023-06-15 14:32" },
      { id: 2, type: "withdraw", amount: 200, status: "completed", date: "2023-06-10 09:17" },
      { id: 3, type: "bet", amount: 50, status: "completed", date: "2023-06-08 21:45" },
      { id: 4, type: "win", amount: 125, status: "completed", date: "2023-06-08 21:46" },
      { id: 5, type: "deposit", amount: 1000, status: "completed", date: "2023-06-01 11:23" },
    ],
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletData.address)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />
      case "withdraw":
        return <ArrowUpFromLine className="h-4 w-4 text-red-500" />
      case "bet":
        return <RefreshCw className="h-4 w-4 text-yellow-500" />
      case "win":
        return <RefreshCw className="h-4 w-4 text-green-500" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "win":
        return "text-green-500"
      case "withdraw":
      case "bet":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Wallet</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <Wallet className="h-6 w-6 mr-2 text-green-500" />
                    Your Wallet
                  </CardTitle>
                  <CardDescription>Manage your funds</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Available Balance</div>
                  <div className="text-3xl font-bold text-green-500">{walletData.balance.toFixed(2)} BTC</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="balance" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="balance">Balance</TabsTrigger>
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>

                <TabsContent value="balance" className="space-y-4">
                  <div className="bg-[#1e1a0e] p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Your Wallet Address</div>
                    <div className="flex items-center">
                      <div className="bg-[#3a2a1a] p-3 rounded-lg flex-1 overflow-hidden text-sm">
                        <span className="truncate block">{walletData.address}</span>
                      </div>
                      <Button variant="outline" size="icon" className="ml-2 cursor-pointer" onClick={copyToClipboard}>
                        {copySuccess ? (
                          <span className="text-green-500 text-xs">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/wallet?tab=deposit" className="w-full">
                      <Button className="w-full bg-green-700 hover:bg-green-800 h-12 cursor-pointer">
                        <ArrowDownToLine className="h-5 w-5 mr-2" />
                        Deposit
                      </Button>
                    </Link>
                    <Link href="/wallet?tab=withdraw" className="w-full">
                      <Button variant="outline" className="w-full h-12 cursor-pointer">
                        <ArrowUpFromLine className="h-5 w-5 mr-2" />
                        Withdraw
                      </Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="deposit" className="space-y-4">
                  <div className="bg-[#1e1a0e] p-4 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-lg font-bold mb-1">Deposit Bitcoin</div>
                      <div className="text-sm text-gray-400">Send BTC to the address below</div>
                    </div>

                    <div className="bg-[#3a2a1a] p-4 rounded-lg mb-4">
                      <div className="text-center text-sm mb-2 text-gray-400">Your Deposit Address</div>
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-white p-4 rounded-lg inline-block">
                          {/* This would be a QR code in a real implementation */}
                          <div className="w-32 h-32 bg-[#3a2a1a] rounded-sm grid grid-cols-5 grid-rows-5 gap-1 p-2">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div
                                key={i}
                                className={`${Math.random() > 0.5 ? "bg-black" : "bg-transparent"} rounded-sm`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-[#241a10] p-3 rounded-lg flex-1 overflow-hidden text-sm">
                          <span className="truncate block">{walletData.address}</span>
                        </div>
                        <Button variant="outline" size="icon" className="ml-2 cursor-pointer" onClick={copyToClipboard}>
                          {copySuccess ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400">
                      <div className="flex items-start mb-2">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                        <span>Deposits are typically credited after 1 confirmation</span>
                      </div>
                      <div className="flex items-start">
                        <RefreshCw className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                        <span>Refresh the page after sending to check your balance</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="withdraw" className="space-y-4">
                  <div className="bg-[#1e1a0e] p-4 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-lg font-bold mb-1">Withdraw Bitcoin</div>
                      <div className="text-sm text-gray-400">Enter the address and amount to withdraw</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Bitcoin Address</label>
                        <Input placeholder="Enter BTC address" className="bg-[#3a2a1a] border-[#4d3a25]" />
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Amount (BTC)</label>
                        <div className="flex space-x-2">
                          <Input type="number" placeholder="0.00" className="bg-[#3a2a1a] border-[#4d3a25]" />
                          <Button variant="outline" size="sm" className="whitespace-nowrap cursor-pointer">
                            MAX
                          </Button>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Available: {walletData.balance.toFixed(8)} BTC</div>
                      </div>

                      <Button className="w-full bg-green-700 hover:bg-green-800 cursor-pointer">
                        <ArrowUpFromLine className="h-5 w-5 mr-2" />
                        Withdraw
                      </Button>

                      <div className="text-xs text-gray-400">
                        Network fee: 0.0001 BTC. Minimum withdrawal: 0.001 BTC.
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Transaction History
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="divide-y divide-[#3a2a1a]">
                {walletData.transactions.map((tx) => (
                  <div key={tx.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#3a2a1a] flex items-center justify-center mr-3">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-xs text-gray-400">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${getTransactionColor(tx.type)}`}>
                        {tx.type === "deposit" || tx.type === "win" ? "+" : "-"}
                        {tx.amount.toFixed(2)} BTC
                      </div>
                      <div className="text-xs">
                        <Badge variant="outline" className="bg-green-900/20 text-green-500 border-none">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="border-t border-[#3a2a1a] pt-4">
              <Button variant="outline" className="w-full cursor-pointer">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle>Wallet Stats</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-[#1e1a0e] p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Total Deposits</div>
                <div className="text-xl font-bold text-green-500">1,500.00 BTC</div>
              </div>

              <div className="bg-[#1e1a0e] p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Total Withdrawals</div>
                <div className="text-xl font-bold text-red-500">200.00 BTC</div>
              </div>

              <div className="bg-[#1e1a0e] p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Net Profit/Loss</div>
                <div className="text-xl font-bold text-yellow-500">-49.25 BTC</div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">
                If you have any questions about deposits, withdrawals, or your wallet, our support team is here to help.
              </p>

            <Link href="/contact" className="w-full cursor-pointer">
              <Button variant="outline" className="w-full cursor-pointer">
                Contact Support
              </Button>
            </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
