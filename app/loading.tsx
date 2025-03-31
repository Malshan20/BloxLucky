"use client"

import { useEffect, useState } from "react"
import { Palmtree, Dice5, Shell, SunMedium } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 5
      })
    }, 150)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-[#1e1a0e] flex flex-col items-center justify-center z-50 jungle-pattern">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-green-500/20 animate-pulse">
        <Palmtree size={60} />
      </div>
      <div className="absolute bottom-10 right-10 text-green-500/20 animate-pulse">
        <Palmtree size={40} />
      </div>
      <div className="absolute top-1/4 right-1/4 text-yellow-500/20 animate-pulse">
        <SunMedium size={50} />
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-yellow-500/20 animate-pulse">
        <Shell size={40} />
      </div>

      {/* Main loading content */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-[#3a2a1a] opacity-25"></div>
        <div
          className="absolute inset-0 rounded-full border-4 border-t-green-500 border-r-yellow-500 border-b-green-500 border-l-yellow-500"
          style={{
            animation: "spin 1.5s linear infinite",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Dice5 className="h-12 w-12 text-yellow-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="text-green-500 mr-2">RO</span>
        <span className="text-yellow-500">LUCK</span>
      </h2>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-[#3a2a1a] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-400 text-sm">Loading paradise...</p>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

