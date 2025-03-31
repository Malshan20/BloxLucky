"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
    CheckCircle2,
    Download,
    ShoppingCart,
    ArrowRight,
    Copy,
    Palmtree,
    Umbrella,
    Shell,
    SunMedium,
} from "lucide-react"

export default function ThankYouPage() {
    const searchParams = useSearchParams()
    const [copySuccess, setCopySuccess] = useState(false)

    // Get product details from URL params
    const productId = searchParams.get("id") || "1"
    const productName = searchParams.get("name") || "Golden Palm Avatar"
    const productPrice = Number.parseFloat(searchParams.get("price") || "0.05")
    const productImage = searchParams.get("image") || "/placeholder.svg?height=200&width=200"

    // Generate a random order number
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    const orderDate = new Date().toLocaleDateString()
    const orderTime = new Date().toLocaleTimeString()

    const copyOrderNumber = () => {
        navigator.clipboard.writeText(orderNumber)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-green-500 to-yellow-500"></div>

                    <CardHeader className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="mx-auto mb-4"
                        >
                            <div className="h-20 w-20 rounded-full bg-green-900/30 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-12 w-12 text-green-500" />
                            </div>
                        </motion.div>

                        <CardTitle className="text-3xl">Thank You for Your Purchase!</CardTitle>
                        <CardDescription className="text-lg">Your order has been successfully processed</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#1e1a0e] p-6 rounded-lg"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <div className="text-sm text-gray-400">Order Number</div>
                                    <div className="flex items-center">
                                        <div className="font-bold text-xl">{orderNumber}</div>
                                        <Button variant="ghost" size="icon" className="ml-2 h-6 w-6" onClick={copyOrderNumber}>
                                            {copySuccess ? (
                                                <span className="text-green-500 text-xs">Copied!</span>
                                            ) : (
                                                <Copy className="h-3 w-3" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                    <div className="text-sm text-gray-400">Date & Time</div>
                                    <div>
                                        {orderDate} at {orderTime}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#3a2a1a] pt-4 mt-4">
                                <div className="flex items-center space-x-4">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                        <Image
                                            src={productImage || "/placeholder.svg"}
                                            alt={productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">{productName}</h3>
                                        <p className="text-sm text-gray-400">Digital Item</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-green-500 font-bold">{productPrice.toFixed(2)} BTC</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#3a2a1a] pt-4 mt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>{productPrice.toFixed(2)} BTC</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Processing Fee</span>
                                    <span>{(productPrice * 0.02).toFixed(2)} BTC</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span className="text-green-500">{(productPrice * 1.02).toFixed(2)} BTC</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-[#1e1a0e] p-6 rounded-lg"
                        >
                            <h3 className="font-bold text-lg mb-3">What's Next?</h3>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                                        <span className="text-green-500 text-xs">1</span>
                                    </div>
                                    <div>
                                        <p className="text-sm">Your purchased item has been added to your account and is ready to use.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                                        <span className="text-green-500 text-xs">2</span>
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            You can access your item from your inventory or profile, depending on the item type.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                                        <span className="text-green-500 text-xs">3</span>
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            A confirmation email with your purchase details has been sent to your registered email address.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                <Link href={`/orders?id=${orderNumber}&image=${productImage}`}>
                                    <Button variant="outline" className="w-full">
                                        View Order History
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 border-t border-[#3a2a1a] pt-6">
                        <Link href="/marketplace" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Continue Shopping
                            </Button>
                        </Link>
                        <Link href="/" className="w-full sm:w-auto">
                            <Button className="w-full bg-[#3a2a1a] hover:bg-[#4d3a25]">
                                Return to Home
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center mt-6 text-gray-400 text-sm"
                >
                    Need help with your order?{" "}
                    <Link href="/contact" className="text-green-500 hover:underline">
                        Contact Support
                    </Link>
                </motion.div>
            </motion.div>

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

