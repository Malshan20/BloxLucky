import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const paymentMethods = [
    { name: "Visa", image: "/visa (1).svg?height=30&width=48" },
    { name: "Mastercard", image: "/mastercard.svg?height=30&width=48" },
    { name: "Bitcoin", image: "/bitcoin.svg?height=30&width=30" },
    { name: "Ethereum", image: "/ethereum.svg?height=30&width=30" },
    { name: "USDT", image: "/usdt.png?height=30&width=30" },
  ]

  return (
    <footer className="bg-[#1e1a0e] border-t border-[#3a2a1a] py-6 beach-gradient relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative h-8 w-8 mr-2">
              <Image src="/favicon.png?height=32&width=32" alt="BLOXLUCKY Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-white">BLOXLUCKY</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="relative h-8 w-12">
                <Image src={method.image || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-400">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About BLOXLUCKY
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-400">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://discord.gg/vP4AybYtcz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="mailto:support@bloxlucky.com" className="text-gray-300 hover:text-white">
                  support@bloxlucky.com
                </Link>
              </li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-400">Popular Games</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/games/jungle-crash" className="text-gray-300 hover:text-white">
                  Crash
                </Link>
              </li>
              <li>
                <Link href="/games/island-roulette" className="text-gray-300 hover:text-white">
                  Roulette
                </Link>
              </li>
              <li>
                <Link href="/games/beach-jackpot" className="text-gray-300 hover:text-white">
                 Beach Jackpot
                </Link>
              </li>
              <li>
                <Link href="/games/coconut-flip" className="text-gray-300 hover:text-white">
                  Coinflip
                </Link>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 border-t border-[#3a2a1a] pt-6">
          <p>© {new Date().getFullYear()} BLOXLUCKY. All rights reserved.</p>
          <p className="mt-2">Gambling can be addictive. Please play responsibly. 18+ only.</p>
        </div>
      </div>
    </footer>
  )
}

