"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    FileText,
    Search,
    ChevronDown,
    ChevronUp,
    Palmtree,
    Umbrella,
    Shell,
    SunMedium,
    ArrowRight,
    Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function TermsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        introduction: true,
    })

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
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

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }))
    }

    // Terms of Service sections
    const sections = [
        {
            id: "introduction",
            title: "1. Introduction",
            content: ` 
By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. Please read these Terms carefully before using our platform.

BloxLucky provides an online gaming platform that allows users to play various casino-style games. These Terms constitute a legally binding agreement between you and BloxLucky regarding your use of the Services.`,
        },
        {
            id: "eligibility",
            title: "2. Eligibility",
            content: `To use the Services, you must be at least 18 years old, or the age of legal majority in your jurisdiction, whichever is higher. By using the Services, you represent and warrant that you meet these eligibility requirements.

You must also ensure that your use of the Services is in compliance with all laws, rules, and regulations applicable to you. The Services are not available to persons whose participation may be prohibited under applicable laws or regulations.

BloxLucky reserves the right to refuse access to the Services to any person for any reason, including but not limited to, violation of these Terms or applicable laws.`,
        },
        {
            id: "account",
            title: "3. Account Registration and Security",
            content: `To access certain features of the Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself.

You are responsible for maintaining the confidentiality of your account credentials, including your password, and for all activities that occur under your account. You agree to notify BloxLucky immediately of any unauthorized use of your account or any other breach of security.

BloxLucky reserves the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, false, or misleading, or if you fail to comply with these Terms.

You may not transfer your account to any other person without our prior written consent. BloxLucky will not be liable for any loss or damage arising from your failure to comply with these obligations.`,
        },
        {
            id: "conduct",
            title: "4. User Conduct",
            content: `You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services:

- In any way that violates any applicable federal, state, local, or international law or regulation
- To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services
- To exploit the Services for any unauthorized commercial purpose
- To attempt to gain unauthorized access to any portion of the Services or any other systems or networks connected to the Services
- To use any automated means or interface not provided by us to access the Services or to extract data
- To attempt to circumvent any content filtering techniques we employ
- To develop or use any third-party applications that interact with the Services without our prior written consent
- To engage in any activity that could disable, overburden, damage, or impair the Services

BloxLucky reserves the right to monitor your use of the Services to ensure compliance with these Terms.`,
        },
        {
            id: "games",
            title: "5. Games and Betting",
            content: `BloxLucky offers various games that may involve virtual betting with real or virtual currency. By participating in these games, you acknowledge and agree to the following:

- All games are subject to their specific rules, which are incorporated into these Terms by reference
- BloxLucky uses a random number generator (RNG) to determine the outcome of games, ensuring fair and random results
- BloxLucky reserves the right to modify game rules, odds, and payouts at any time without prior notice
- You are responsible for understanding the rules and odds of each game before participating
- BloxLucky is not responsible for any losses incurred while playing games on our platform
- In the event of a system malfunction or error, BloxLucky reserves the right to void any affected bets or games

You acknowledge that gambling involves risk and should be considered entertainment only. BloxLucky promotes responsible gaming and provides tools to help users manage their gaming activities.`,
        },
        {
            id: "deposits",
            title: "6. Deposits and Withdrawals",
            content: `BloxLucky accepts various payment methods for deposits and withdrawals. By making a deposit or withdrawal, you agree to the following:

- You will only use payment methods that are legally owned by you
- All information provided in connection with your deposit or withdrawal is accurate and complete
- You will not use the Services for money laundering or any illegal activities
- Deposits and withdrawals are subject to processing times, which may vary depending on the payment method
- Minimum and maximum deposit and withdrawal amounts may apply
- BloxLucky reserves the right to verify your identity before processing any withdrawal
- BloxLucky may charge fees for deposits and withdrawals, which will be clearly disclosed
- In case of suspected fraud or violation of these Terms, BloxLucky reserves the right to withhold withdrawals pending investigation

For more information about payment methods, processing times, and fees, please refer to our Payment Policy.`,
        },
        {
            id: "bonuses",
            title: "7. Bonuses and Promotions",
            content: `BloxLucky may offer bonuses and promotions from time to time. By accepting a bonus or participating in a promotion, you agree to the following:

- All bonuses and promotions are subject to their specific terms and conditions, which are incorporated into these Terms by reference
- BloxLucky reserves the right to modify or cancel any bonus or promotion at any time without prior notice
- Bonuses may be subject to wagering requirements before they can be withdrawn
- BloxLucky reserves the right to revoke bonuses if we believe they have been obtained or used fraudulently
- Only one account per person is eligible for bonuses and promotions
- BloxLucky reserves the right to restrict eligibility for bonuses and promotions at its sole discretion

For more information about current bonuses and promotions, please refer to our Promotions page.`,
        },
        {
            id: "intellectual",
            title: "8. Intellectual Property",
            content: `All content included in or made available through the Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of BloxLucky or its licensors and is protected by international copyright, trademark, and other intellectual property laws.

BloxLucky grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Services for their intended purposes. This license does not include:

- Any resale or commercial use of the Services or their contents
- Any collection and use of any product listings, descriptions, or prices
- Any derivative use of the Services or their contents
- Any downloading or copying of account information for the benefit of another merchant
- Any use of data mining, robots, or similar data gathering and extraction tools

You may not reproduce, duplicate, copy, sell, resell, or otherwise exploit any portion of the Services without express written consent from BloxLucky.`,
        },
        {
            id: "liability",
            title: "9. Limitation of Liability",
            content: `To the fullest extent permitted by applicable law, BloxLucky and its affiliates, officers, directors, employees, agents, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from:

- Your access to or use of or inability to access or use the Services
- Any conduct or content of any third party on the Services
- Any content obtained from the Services
- Unauthorized access, use, or alteration of your transmissions or content
- The failure of the Services to operate or provide specific information, even if we have been advised of the possibility of such damages

In no event shall BloxLucky's total liability to you for all claims arising from or relating to the Services exceed the amount paid by you to BloxLucky during the six (6) months immediately preceding the event giving rise to such liability.

Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.`,
        },
        {
            id: "termination",
            title: "10. Termination",
            content: `BloxLucky reserves the right to terminate or suspend your account and access to the Services at any time, without prior notice or liability, for any reason, including but not limited to, your breach of these Terms.

Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.

All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
        },
        {
            id: "governing",
            title: "11. Governing Law",
            content: `These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.

Any dispute arising from or relating to these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts located within [Jurisdiction].

You agree to submit to the personal jurisdiction of such courts for the purpose of litigating all such claims or disputes.`,
        },
        {
            id: "changes",
            title: "12. Changes to Terms",
            content: `BloxLucky reserves the right to modify or replace these Terms at any time at its sole discretion. The most current version of these Terms will be posted on our website with the "Last Updated" date at the top.

Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Services.

We encourage you to review these Terms periodically for any changes. Changes to these Terms are effective when they are posted on this page.`,
        },
        {
            id: "miscellaneous",
            title: "13. Miscellaneous",
            content: `These Terms constitute the entire agreement between you and BloxLucky regarding the Services and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the Services.

If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.

The failure of BloxLucky to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.

BloxLucky may assign or transfer these Terms, in whole or in part, without restriction. You may not assign or transfer any rights or obligations under these Terms without the prior written consent of BloxLucky.`,
        },
    ]

    // Filter sections based on search term
    const filteredSections = sections.filter(
        (section) =>
            section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center mb-6">
                <Link href="/" className="text-gray-400 hover:text-white mr-2">
                    Home
                </Link>
                <span className="text-gray-600 mx-2">/</span>
                <span className="text-white font-medium">Terms of Service</span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden mb-12"
            >
                <div className="h-48 md:h-64 bg-gradient-to-r from-green-900/80 to-yellow-900/80 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="flex items-center mb-4">
                            <FileText className="h-10 w-10 text-yellow-400 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
                        </div>
                        <p className="text-xl text-gray-200 max-w-2xl">Last Updated: March 31, 2024</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow sticky top-20">
                        <CardContent className="p-4">
                            <div className="relative mb-4">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search terms..."
                                    className="bg-[#3a2a1a] border-[#4d3a25] pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                                {sections.map((section) => (
                                    <Button
                                        key={section.id}
                                        variant="ghost"
                                        className="w-full justify-start text-left"
                                        onClick={() => {
                                            const element = document.getElementById(section.id)
                                            if (element) {
                                                element.scrollIntoView({ behavior: "smooth" })
                                                toggleSection(section.id)
                                            }
                                        }}
                                    >
                                        <span className="truncate">{section.title}</span>
                                    </Button>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#3a2a1a]">
                                <div className="flex flex-col space-y-2">
                                    <Link href="/privacy">
                                        <Button variant="outline" className="w-full justify-start">
                                            Privacy Policy
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="outline" className="w-full justify-start">
                                            About BloxLucky
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" className="w-full justify-start">
                                            Contact Support
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                        <CardContent className="p-6">
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                                <motion.div variants={itemVariants} className="mb-8">
                                    <div className="flex items-center space-x-2 text-yellow-500 mb-4">
                                        <Info className="h-5 w-5" />
                                        <p className="text-sm">
                                            Please read these Terms of Service carefully before using our platform. By accessing or using
                                            BloxLucky, you agree to be bound by these terms.
                                        </p>
                                    </div>
                                </motion.div>

                                {filteredSections.length > 0 ? (
                                    filteredSections.map((section) => (
                                        <motion.div
                                            key={section.id}
                                            variants={itemVariants}
                                            id={section.id}
                                            className="pb-6 border-b border-[#3a2a1a] last:border-b-0"
                                        >
                                            <div
                                                className="flex justify-between items-center cursor-pointer mb-4"
                                                onClick={() => toggleSection(section.id)}
                                            >
                                                <h2 className="text-2xl font-bold">{section.title}</h2>
                                                {expandedSections[section.id] ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>

                                            {expandedSections[section.id] && (
                                                <div className="text-gray-300 space-y-4 whitespace-pre-line">{section.content}</div>
                                            )}
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div variants={itemVariants} className="text-center py-8">
                                        <p className="text-gray-400 mb-4">No results found for "{searchTerm}"</p>
                                        <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-8"
                    >
                        <Card className="bg-[#2a1f14] border-[#3a2a1a] tropical-shadow">
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-4">Have Questions About Our Terms?</h3>
                                    <p className="text-gray-300 mb-6">
                                        If you have any questions or concerns about our Terms of Service, please don't hesitate to contact
                                        our support team.
                                    </p>
                                    <Link href="https://discord.gg/vP4AybYtcz" target="_blank" >
                                        <Button className="cursor-pointer">
                                            Discord
                                            <img src="/discord.svg" alt="Discord Icon" className="ml-2 h-4 w-4" />
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
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

            <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #3a2a1a;
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4d3a25;
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #5d4a35;
        }
      `}</style>
        </div>
    )
}

