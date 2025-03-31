"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TreePalmIcon, Palmtree, Leaf, ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react"
import JungleDecorations from "@/components/jungle-decorations"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/profile")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/profile")
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh] relative">
      <JungleDecorations />

      <motion.div className="max-w-md mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
          <TreePalmIcon className="h-8 w-8 text-green-500 mr-2" />
          <h1 className="text-3xl font-bold text-center">BloxLucky</h1>
          <TreePalmIcon className="h-8 w-8 text-green-500 ml-2" />
        </motion.div>

        <Card className="border-[#3a2a1a] bg-[#2a1f14]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {activeTab === "login" ? "Welcome Back" : "Join BloxLucky"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login"
                ? "Login to access your account and continue your tropical adventure"
                : "Create an account to start your gaming journey in paradise"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-green-600">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-green-600">
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <motion.form
                  onSubmit={handleLogin}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-green-400 hover:text-green-300">
                      Forgot password?
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading} onClick={() => router.push('/profile')}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Logging in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Login <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              <TabsContent value="register">
                <motion.form
                  onSubmit={handleRegister}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="username" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="register-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="register-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="confirm-password" className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" /> Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="bg-[#3a2a1a] border-[#4d3a25]"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-green-400 hover:text-green-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-400 hover:text-green-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Create Account <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#4d3a25]"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#2a1f14] px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-[#4d3a25] hover:bg-[#3a2a1a]">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-[#4d3a25] hover:bg-[#3a2a1a]">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </CardFooter>
        </Card>

        <motion.p variants={itemVariants} className="text-center mt-6 text-sm text-muted-foreground">
          By using our service, you agree to our{" "}
          <Link href="/terms" className="text-green-400 hover:text-green-300 underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-green-400 hover:text-green-300 underline underline-offset-4">
            Privacy Policy
          </Link>
        </motion.p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
        <Leaf className="w-full h-full text-green-500" />
      </div>
      <div className="absolute top-10 right-0 w-24 h-24 opacity-20">
        <Palmtree className="w-full h-full text-green-500" />
      </div>
    </div>
  )
}

