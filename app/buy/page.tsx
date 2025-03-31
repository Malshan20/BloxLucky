"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CreditCard,
  Bitcoin,
  ShoppingCart,
  Lock,
  Shield,
  ArrowLeft,
  Palmtree,
  Umbrella,
  Shell,
  SunMedium,
} from "lucide-react"

export default function BuyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formState, setFormState] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    walletAddress: "",
  })

  // Get product details from URL params
  const productId = searchParams.get("id") || "1"
  const productName = searchParams.get("name") || "Golden Palm Avatar"
  const productPrice = Number.parseFloat(searchParams.get("price") || "0.05")
  const productImage = searchParams.get("image") || "/placeholder.svg?height=200&width=200"

  // Calculate totals
  const subtotal = productPrice
  const fees = productPrice * 0.02 // 2% fee
  const total = subtotal + fees

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, saveCard: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/buy/thank-you?id=${productId}&name=${encodeURIComponent(productName)}&price=${productPrice}&image=${encodeURIComponent(productImage)}`)
    }, 2000)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatCardNumber(value)
    setFormState((prev) => ({ ...prev, cardNumber: formattedValue }))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/marketplace" className="text-gray-400 hover:text-white mr-2">
          <div className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </div>
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Checkout</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-gray-300">You're just a few steps away from getting your item!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-green-500" />
                Payment Details
              </CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card" className="flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="flex items-center justify-center">
                      <Bitcoin className="h-4 w-4 mr-2" />
                      Cryptocurrency
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formState.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="bg-[#3a2a1a] border-[#4d3a25] pl-10"
                          required={paymentMethod === "card"}
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formState.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-[#3a2a1a] border-[#4d3a25]"
                        required={paymentMethod === "card"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formState.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="bg-[#3a2a1a] border-[#4d3a25]"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formState.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          className="bg-[#3a2a1a] border-[#4d3a25]"
                          required={paymentMethod === "card"}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="saveCard" checked={formState.saveCard} onCheckedChange={handleCheckboxChange} />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save card for future purchases
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Your Wallet Address</Label>
                      <Input
                        id="walletAddress"
                        name="walletAddress"
                        value={formState.walletAddress}
                        onChange={handleInputChange}
                        placeholder="Enter your wallet address"
                        className="bg-[#3a2a1a] border-[#4d3a25]"
                        required={paymentMethod === "crypto"}
                      />
                    </div>

                    <div className="bg-[#1e1a0e] p-4 rounded-lg">
                      <div className="text-center mb-4">
                        <div className="text-sm font-bold mb-1">Send {total.toFixed(8)} BTC to:</div>
                      </div>

                      <div className="bg-[#3a2a1a] p-4 rounded-lg mb-4">
                        <div className="text-center text-sm mb-2 text-gray-400">Payment Address</div>
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

                        <div className="bg-[#241a10] p-3 rounded-lg overflow-hidden text-sm text-center">
                          <span className="block truncate">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-400 text-center">
                        The item will be delivered to your account once the payment is confirmed.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span>{subtotal.toFixed(2)} BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Processing Fee</span>
                    <span>{fees.toFixed(2)} BTC</span>
                  </div>
                  <div className="border-t border-[#3a2a1a] pt-4 flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-500">{total.toFixed(2)} BTC</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 h-12" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Purchase
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image src={productImage || "/placeholder.svg"} alt={productName} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{productName}</h3>
                  <p className="text-sm text-gray-400">Digital Item</p>
                  <p className="text-green-500 font-bold mt-1">{productPrice.toFixed(2)} BTC</p>
                </div>
              </div>

              <div className="bg-[#1e1a0e] p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">You're purchasing:</div>
                <div className="font-medium">{productName}</div>
                <div className="text-xs text-gray-400 mt-2">
                  This item will be available in your account immediately after purchase.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Shield className="h-10 w-10 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-300">
                    All transactions are secure and encrypted. Your payment information is never stored on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-green-900/50 to-yellow-900/50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">Need Help?</h3>
              </div>
            </div>

            <CardContent className="pt-4">
              <p className="text-sm text-gray-300 mb-4">
                If you have any questions about your purchase, our support team is here to help.
              </p>

              <Link href="/contact" className="w-full">
              <Button variant="outline" className="w-full cursor-pointer">
                Contact Support
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-20 right-10 text-green-500/10 animate-pulse hidden lg:block">
        <Palmtree size={40} />
      </div>
      <div className="fixed bottom-20 left-10 text-green-500/10 animate-pulse hidden lg:block">
        <Umbrella size={30} />
      </div>
      <div className="fixed top-1/3 left-5 text-yellow-500/10 animate-pulse hidden lg:block">
        <Shell size={24} />
      </div>
      <div className="fixed bottom-1/4 right-5 text-yellow-500/10 animate-pulse hidden lg:block">
        <SunMedium size={40} />
      </div>
    </div>
  )
}

