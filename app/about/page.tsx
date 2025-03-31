"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Building2,
    Trophy,
    Target,
    Shield,
    Users,
    Globe,
    Award,
    Clock,
    CheckCircle,
    Palmtree,
    Umbrella,
    Shell,
    SunMedium,
    ArrowRight,
} from "lucide-react"

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState("story")

    // Animation variants
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }


    // Milestones
    const milestones = [
        {
            year: "2020",
            title: "BloxLucky Founded",
            description: "BloxLucky was established with a vision to create a revolutionary gaming platform.",
        },
        {
            year: "2021",
            title: "Platform Launch",
            description:
                "Successfully launched our platform with 10 original games and attracted 50,000 users in the first month.",
        },
        {
            year: "2022",
            title: "Expansion",
            description: "Expanded our game library to 50+ titles and introduced cryptocurrency payments.",
        },
        {
            year: "2023",
            title: "Global Reach",
            description: "Reached 1 million registered users across 100+ countries worldwide.",
        },
        {
            year: "2024",
            title: "Innovation Award",
            description: "Received the 'Most Innovative Gaming Platform' award at the International Gaming Summit.",
        },
    ]

    // Values
    const values = [
        {
            icon: <Shield className="h-8 w-8 text-green-500" />,
            title: "Security",
            description:
                "We prioritize the security of our players' data and funds with state-of-the-art encryption and protection measures.",
        },
        {
            icon: <CheckCircle className="h-8 w-8 text-green-500" />,
            title: "Fairness",
            description: "All our games are provably fair, ensuring transparent and unbiased outcomes for every player.",
        },
        {
            icon: <Users className="h-8 w-8 text-green-500" />,
            title: "Community",
            description: "We foster a vibrant community where players can connect, compete, and celebrate together.",
        },
        {
            icon: <Trophy className="h-8 w-8 text-green-500" />,
            title: "Excellence",
            description: "We strive for excellence in everything we do, from game design to customer support.",
        },
        {
            icon: <Target className="h-8 w-8 text-green-500" />,
            title: "Innovation",
            description:
                "We continuously innovate to provide cutting-edge gaming experiences that excite and engage our players.",
        },
        {
            icon: <Globe className="h-8 w-8 text-green-500" />,
            title: "Accessibility",
            description:
                "We believe in making our platform accessible to everyone, regardless of their background or experience level.",
        },
    ]

    // Licenses and certifications
    const licenses = [
        {
            name: "Gaming Authority License",
            description: "Licensed and regulated by the International Gaming Authority",
            icon: <Award className="h-6 w-6 text-yellow-500" />,
        },
        {
            name: "SSL Encryption",
            description: "256-bit SSL encryption for secure data transmission",
            icon: <Shield className="h-6 w-6 text-green-500" />,
        },
        {
            name: "Fair Gaming Certified",
            description: "Games certified for fairness by Gaming Laboratories International",
            icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
        },
        {
            name: "Responsible Gaming Partner",
            description: "Partnered with Responsible Gaming Association",
            icon: <Users className="h-6 w-6 text-purple-500" />,
        },
    ]

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center mb-6">
                <Link href="/" className="text-gray-400 hover:text-white mr-2">
                    Home
                </Link>
                <span className="text-gray-600 mx-2">/</span>
                <span className="text-white font-medium">About BloxLucky</span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden mb-12"
            >
                <div className="h-64 md:h-80 bg-gradient-to-r from-green-900/80 to-yellow-900/80 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="flex items-center mb-4">
                            <Building2 className="h-10 w-10 text-yellow-400 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-white">About BloxLucky</h1>
                        </div>
                        <p className="text-xl text-gray-200 max-w-2xl mb-6">
                            The story behind the world's most exciting tropical gaming paradise
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                <Button
                    variant={activeTab === "story" ? "default" : "outline"}
                    onClick={() => setActiveTab("story")}
                    className="whitespace-nowrap"
                >
                    Our Story
                </Button>
                <Button
                    variant={activeTab === "mission" ? "default" : "outline"}
                    onClick={() => setActiveTab("mission")}
                    className="whitespace-nowrap"
                >
                    Mission & Values
                </Button>

                <Button
                    variant={activeTab === "milestones" ? "default" : "outline"}
                    onClick={() => setActiveTab("milestones")}
                    className="whitespace-nowrap"
                >
                    Milestones
                </Button>
                <Button
                    variant={activeTab === "licenses" ? "default" : "outline"}
                    onClick={() => setActiveTab("licenses")}
                    className="whitespace-nowrap"
                >
                    Licenses & Security
                </Button>
            </div>

            {/* Our Story Section */}
            {activeTab === "story" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                            <p className="text-gray-300 mb-4">
                                BloxLucky was born from a simple idea: to create a gaming platform that combines the excitement of
                                casino games with the beauty of a tropical paradise. Founded in 2020 by a team of gaming enthusiasts and
                                industry veterans, we set out to revolutionize the online gaming experience.
                            </p>
                            <p className="text-gray-300 mb-4">
                                What started as a small startup with just a handful of games has grown into a thriving platform with
                                millions of users worldwide. Our journey has been defined by innovation, community, and a relentless
                                pursuit of excellence.
                            </p>
                            <p className="text-gray-300">
                                Today, BloxLucky stands as a testament to our commitment to creating a gaming paradise where players can
                                escape, compete, and win in a secure and vibrant environment.
                            </p>
                        </div>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <Image src="/office.jpg?height=400&width=600" alt="BloxLucky Office" fill className="object-cover" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                                            <Trophy className="h-8 w-8 text-green-500" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2">Innovative Games</h4>
                                        <p className="text-gray-300">
                                            Our unique games are designed to provide an unmatched gaming experience with exciting features and
                                            rewards.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                                            <Shield className="h-8 w-8 text-green-500" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2">Secure Platform</h4>
                                        <p className="text-gray-300">
                                            We employ advanced security measures to ensure your data and funds are always protected.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                                            <Users className="h-8 w-8 text-green-500" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2">Vibrant Community</h4>
                                        <p className="text-gray-300">
                                            Join thousands of players in our tropical gaming paradise and be part of a thriving community.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}

            {/* Mission & Values Section */}
            {activeTab === "mission" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.div variants={itemVariants}>
                        <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                            <CardContent className="p-6">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                        To create the world's most exciting and secure gaming platform where players can enjoy fair games,
                                        build connections, and experience the thrill of winning in a tropical paradise.
                                    </p>
                                </div>

                                <div className="relative py-8">
                                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500/50 via-yellow-500/50 to-green-500/50"></div>
                                    <div className="flex items-center justify-center mb-8">
                                        <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center z-10">
                                            <Target className="h-8 w-8 text-green-500" />
                                        </div>
                                    </div>
                                    <p className="text-center text-gray-300 max-w-2xl mx-auto">
                                        We believe that gaming should be more than just entertainment—it should be an experience that brings
                                        joy, excitement, and opportunities to players around the world. Our vision is to redefine online
                                        gaming by combining cutting-edge technology with tropical-themed aesthetics to create a unique and
                                        immersive environment.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, index) => (
                                <Card key={index} className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow h-full">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-16 w-16 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                                                {value.icon}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                            <p className="text-gray-300">{value.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}



            {/* Milestones Section */}
            {activeTab === "milestones" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Since our founding, we've achieved significant milestones that have shaped our growth and success. Here's
                            a look at our journey so far.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-yellow-500/50 to-green-500/50"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative">
                                    <div className={`flex items-center mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 z-10 flex items-center justify-center">
                                            <Clock className="h-4 w-4 text-white" />
                                        </div>

                                        <div
                                            className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-8 md:text-right md:pr-8" : "md:ml-8 md:pl-8"} md:w-1/2`}
                                        >
                                            <Badge className="mb-2 bg-green-700">{milestone.year}</Badge>
                                            <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                                            <p className="text-gray-300">{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-12 text-center">
                        <h3 className="text-2xl font-bold mb-4">And We're Just Getting Started...</h3>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                            Our journey continues as we expand our offerings, enhance our platform, and bring even more exciting
                            features to our players around the world.
                        </p>
                        <Button  onClick={() => window.location.href = '/'}>
                            Join Our Adventure
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            {/* Licenses & Security Section */}
            {activeTab === "licenses" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Licenses & Security</h2>
                            <p className="text-gray-300 mb-4">
                                At BloxLucky, we take our responsibility to provide a safe, secure, and fair gaming environment very
                                seriously. We operate under strict regulatory oversight and employ industry-leading security measures to
                                protect our players.
                            </p>
                            <p className="text-gray-300 mb-4">
                                Our platform is licensed and regulated by the International Gaming Authority, ensuring that we adhere to
                                the highest standards of fairness, security, and responsible gaming practices.
                            </p>
                            <p className="text-gray-300">
                                We use advanced encryption technology to protect your personal and financial information, and our games
                                are regularly audited by independent testing agencies to ensure fair outcomes for all players.
                            </p>
                        </div>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <Image
                                src="/security.jpg?height=400&width=600"
                                alt="Security Infrastructure"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold mb-6">Our Certifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {licenses.map((license, index) => (
                                <Card key={index} className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-[#3a2a1a] flex items-center justify-center mr-4">
                                                {license.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold">{license.name}</h4>
                                                <p className="text-gray-300 text-sm">{license.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold mb-4">Responsible Gaming</h3>
                                <p className="text-gray-300 mb-4">
                                    We are committed to promoting responsible gaming practices. We provide tools and resources to help our
                                    players maintain control over their gaming activities, including:
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">Deposit limits to help manage spending</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">Self-exclusion options for those who need a break</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">Reality checks to track time spent gaming</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">Access to professional support resources</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-16 mb-8"
            >
                <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow overflow-hidden">
                    <div className="relative">
                        <div className="h-64 bg-gradient-to-r from-green-900/80 to-yellow-900/80">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <h2 className="text-3xl font-bold mb-4 text-white">Join Our Tropical Gaming Paradise</h2>
                                <p className="text-xl text-gray-200 max-w-2xl mb-6">
                                    Experience the excitement of BloxLucky's innovative games, secure platform, and vibrant community
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={"/"} className="cursor-pointer">
                                        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8" >
                                            Play Now
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
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