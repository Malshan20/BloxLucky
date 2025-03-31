import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Poppins, Russo_One } from "next/font/google"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "BloxLucky - Online Casino Gaming",
  description: "Play casino games and win big with BloxLucky",
  icons: {
    icon: "/favicon.png",
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} ${russoOne.className} text-green-300 min-h-screen flex flex-col jungle-pattern relative leaf-overlay palm-leaf-bottom`} style={{backgroundImage: "url('/blox.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
      </body>
    </html>
  )
}