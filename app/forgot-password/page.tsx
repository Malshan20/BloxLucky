"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 jungle-pattern relative">
      <div className="leaf-overlay palm-leaf-bottom w-full h-full absolute"></div>

      <motion.div
        className="w-full max-w-md bg-card rounded-lg shadow-lg p-8 relative z-10 border border-border"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {!isSubmitted ? (
          <>
            <motion.div variants={itemVariants} className="mb-6">
              <Link
                href="/auth"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-2xl font-bold text-center mb-2">
              Forgot Your Password?
            </motion.h1>

            <motion.p variants={itemVariants} className="text-muted-foreground text-center mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </motion.p>

            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-[#3a2a1a] border-[#4d3a25]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm"
                >
                  {error}
                </motion.p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </motion.form>
          </>
        ) : (
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Check Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground">If you don't see it, please check your spam folder.</p>
            <div className="pt-4">
              <Button asChild variant="outline" className="mt-2">
                <Link href="/auth" >Return to Login</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <Link href="/contact" className="text-primary hover:underline cursor-pointer">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

