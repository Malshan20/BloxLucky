"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Palmtree,
  Umbrella,
  Shell,
  SunMedium,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 5000)
    }, 1500)
  }

  // Common questions for FAQ
  const faqs = [
    {
      question: "How do I verify my account?",
      answer:
        "To verify your account, go to your profile settings and upload the required documents. Verification usually takes 24-48 hours.",
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals are processed within 24 hours. Once processed, the time it takes to reach your account depends on the payment method.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your personal and financial information. Your privacy and security are our top priorities.",
    },
    {
      question: "How do I claim bonuses?",
      answer:
        "Bonuses can be claimed in the promotions section of your account. Some bonuses require a code, which you can enter during deposit.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white mr-2">
          Home
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white font-medium">Contact Us</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
        <p className="text-gray-300">
          We're here to help with any questions or concerns you may have. Reach out to our friendly support team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                Send Us a Message
              </CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>

            <CardContent>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/20 border border-green-600 rounded-lg p-6 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll respond to your inquiry shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-400">
                        Your Name
                      </label>
                      <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="bg-[#3a2a1a] border-[#4d3a25] focus:border-green-500 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-gray-400">
                        Email Address
                      </label>
                      <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className="bg-[#3a2a1a] border-[#4d3a25] focus:border-green-500 transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm text-gray-400">
                      Subject
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="What is your message about?"
                        required
                        className="bg-[#3a2a1a] border-[#4d3a25] focus:border-green-500 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400">
                      Message
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        required
                        rows={6}
                        className="bg-[#3a2a1a] border-[#4d3a25] focus:border-green-500 transition-all duration-300 resize-none"
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-green-700 hover:bg-green-800 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="bg-[#1e1a0e] rounded-lg p-4"
                    >
                      <h3 className="font-bold mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-300">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-sm text-gray-300">support@bloxlucky.com</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Discord</h3>
                  <p className="text-sm text-gray-300">
                    <a href="https://discord.gg/fc3Wudky" className="text-blue-400 hover:underline">@https://discord.gg/fc3Wudky</a>
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <Facebook className="h-5 w-5 text-blue-400" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <Twitter className="h-5 w-5 text-sky-400" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <Instagram className="h-5 w-5 text-pink-400" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <img src="/discord.svg" alt="Discord" className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
                </CardContent>
                
          </Card>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
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
      </motion.div>
    </div>
  )
}

