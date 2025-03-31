"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Shield,
    Search,
    ChevronDown,
    ChevronUp,
    Palmtree,
    Umbrella,
    Shell,
    SunMedium,
    ArrowRight,
    Info,
    Lock,
    Database,
    Share2,
    Cookie,
    UserCheck,
    Clock,
    Mail,
    Globe,
    RefreshCw,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function PrivacyPolicyPage() {
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

    // Privacy Policy sections
    const sections = [
        {
            id: "introduction",
            title: "1. Introduction",
            icon: <Info className="h-6 w-6 text-green-500" />,
            content: `This Privacy Policy explains how BloxLucky ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you visit our website or use our services.

We are committed to protecting your privacy and ensuring the security of your personal information. By accessing or using our services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.

Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.`,
        },
        {
            id: "collection",
            title: "2. Information We Collect",
            icon: <Database className="h-6 w-6 text-green-500" />,
            content: `We collect several types of information from and about users of our services, including:

Personal Information:
- Contact information (such as name, email address, and phone number)
- Account information (such as username and password)
- Financial information (such as payment method details and transaction history)
- Identity verification information (such as date of birth and identification documents)
- Profile information (such as profile picture and preferences)

Non-Personal Information:
- Device information (such as IP address, browser type, and operating system)
- Usage data (such as pages visited, time spent on the site, and clicks)
- Location data (such as general geographic location based on IP address)
- Cookies and similar technologies (as described in our Cookie Policy)

We collect this information:
- Directly from you when you provide it to us
- Automatically as you navigate through the site
- From third parties, such as business partners and identity verification services`,
        },
        {
            id: "use",
            title: "3. How We Use Your Information",
            icon: <UserCheck className="h-6 w-6 text-green-500" />,
            content: `We use the information we collect about you for various purposes, including:

- To provide, maintain, and improve our services
- To process transactions and send related information
- To create and manage your account
- To verify your identity and prevent fraud
- To personalize your experience and deliver content relevant to your interests
- To communicate with you about your account, our services, promotions, and other news
- To monitor and analyze usage patterns and trends
- To comply with legal and regulatory requirements
- To enforce our terms, conditions, and policies
- To protect the rights, property, or safety of BloxLucky, our users, or others

We process your personal information based on:
- Your consent
- The necessity to perform our contractual obligations
- Our legitimate interests
- Compliance with legal obligations`,
        },
        {
            id: "sharing",
            title: "4. Information Sharing and Disclosure",
            icon: <Share2 className="h-6 w-6 text-green-500" />,
            content: `We may share your information with the following parties:

- Service providers who perform services on our behalf (such as payment processors, hosting providers, and analytics providers)
- Business partners with whom we jointly offer products or services
- Affiliated companies within our corporate family
- Legal authorities when required by law or to protect our rights
- Other parties in connection with a corporate transaction, such as a merger, sale of assets, or bankruptcy

We do not sell your personal information to third parties.

When we share your information with third parties, we take steps to ensure that they use appropriate safeguards to protect your information and comply with applicable data protection laws.`,
        },
        {
            id: "security",
            title: "5. Data Security",
            icon: <Lock className="h-6 w-6 text-green-500" />,
            content: `We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:

- Encryption of sensitive information
- Secure socket layer (SSL) technology
- Regular security assessments and audits
- Access controls and authentication procedures
- Employee training on data protection

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

In the event of a data breach that affects your personal information, we will notify you in accordance with applicable laws.`,
        },
        {
            id: "cookies",
            title: "6. Cookies and Similar Technologies",
            icon: <Cookie className="h-6 w-6 text-green-500" />,
            content: `We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our services. Cookies are small text files that are stored on your device when you visit a website.

We use the following types of cookies:

- Essential cookies: These are necessary for the operation of our services
- Analytical/performance cookies: These help us understand how visitors interact with our services
- Functionality cookies: These enable us to personalize our content for you
- Targeting cookies: These record your visit to our services, the pages you have visited, and the links you have followed

You can control cookies through your browser settings. However, if you block certain cookies, you may not be able to use all the features of our services.

For more detailed information about the cookies we use, please refer to our Cookie Policy.`,
        },
        {
            id: "rights",
            title: "7. Your Rights and Choices",
            icon: <UserCheck className="h-6 w-6 text-green-500" />,
            content: `Depending on your location, you may have certain rights regarding your personal information, including:

- The right to access and receive a copy of your personal information
- The right to rectify or update your personal information
- The right to delete your personal information
- The right to restrict or object to the processing of your personal information
- The right to data portability
- The right to withdraw your consent
- The right to lodge a complaint with a supervisory authority

To exercise these rights, please contact us using the information provided in the "Contact Us" section.

We may need to verify your identity before responding to your request. We will respond to your request within the timeframe required by applicable law.`,
        },
        {
            id: "retention",
            title: "8. Data Retention",
            icon: <Clock className="h-6 w-6 text-green-500" />,
            content: `We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including to satisfy legal, accounting, or reporting requirements.

To determine the appropriate retention period, we consider:
- The amount, nature, and sensitivity of the personal information
- The potential risk of harm from unauthorized use or disclosure
- The purposes for which we process the information
- Whether we can achieve those purposes through other means
- Legal, regulatory, and contractual requirements

When we no longer need your personal information, we will securely delete or anonymize it. In some circumstances, we may anonymize your personal information so that it can no longer be associated with you, in which case we may use such information without further notice to you.`,
        },
        {
            id: "international",
            title: "9. International Data Transfers",
            icon: <Globe className="h-6 w-6 text-green-500" />,
            content: `We may transfer your personal information to countries other than the one in which you reside. These countries may have data protection laws that are different from those in your country.

When we transfer your personal information to other countries, we take appropriate safeguards to ensure that your information receives an adequate level of protection, including:

- Using standard contractual clauses approved by relevant authorities
- Ensuring that recipients are bound by data protection laws providing adequate protection
- Obtaining your consent for the transfer

By using our services, you consent to the transfer of your information to countries outside your country of residence, including the United States, which may have different data protection rules than those in your country.`,
        },
        {
            id: "children",
            title: "10. Children's Privacy",
            icon: <UserCheck className="h-6 w-6 text-green-500" />,
            content: `Our services are not intended for individuals under the age of 18, or the age of legal majority in your jurisdiction, whichever is higher. We do not knowingly collect personal information from children.

If we learn that we have collected personal information from a child, we will take steps to delete that information as quickly as possible.

If you believe that we might have any information from or about a child, please contact us using the information provided in the "Contact Us" section.`,
        },
        {
            id: "changes",
            title: "11. Changes to This Privacy Policy",
            icon: <RefreshCw className="h-6 w-6 text-green-500" />,
            content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated Privacy Policy will be effective when it is posted on this page.

We will notify you of any material changes by posting a notice on our website or by sending you an email. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.

Your continued use of our services after the effective date of the updated Privacy Policy constitutes your acceptance of the changes.`,
        },
        {
            id: "contact",
            title: "12. Contact Us",
            icon: <Mail className="h-6 w-6 text-green-500" />,
            content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:

Email: privacy@bloxlucky.com
Address: Tropical Island Paradise, Palm Beach Boulevard, Suite 101

Our Data Protection Officer can be reached at dpo@bloxlucky.com.

We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.`,
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
                <span className="text-white font-medium">Privacy Policy</span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden mb-12"
            >
                <div className="h-48 md:h-64 bg-gradient-to-r from-green-900/80 to-blue-900/80 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="flex items-center mb-4">
                            <Shield className="h-10 w-10 text-blue-400 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
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
                                    placeholder="Search privacy policy..."
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
                                    <Link href="/terms">
                                        <Button variant="outline" className="w-full justify-start">
                                            Terms of Service
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="outline" className="w-full justify-start">
                                            About BloxLucky
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="w-full justify-start">
                                        Contact Support
                                    </Button>
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
                                    <div className="flex items-center space-x-2 text-blue-500 mb-4">
                                        <Lock className="h-5 w-5" />
                                        <p className="text-sm">
                                            Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect
                                            your personal information.
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
                                                <div className="flex items-center">
                                                    {section.icon}
                                                    <h2 className="text-2xl font-bold ml-2">{section.title}</h2>
                                                </div>
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
                                    <h3 className="text-xl font-bold mb-4">Have Questions About Your Privacy?</h3>
                                    <p className="text-gray-300 mb-6">
                                        If you have any questions or concerns about our Privacy Policy or how we handle your data, please
                                        don't hesitate to contact our privacy team.
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

