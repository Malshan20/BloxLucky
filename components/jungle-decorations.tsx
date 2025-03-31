import { Palmtree, Fish, Waves, Cloud, SunMedium } from "lucide-react"

export default function JungleDecorations() {
  return (
    <>
      {/* Floating elements that appear throughout the site */}
      <div className="fixed top-20 right-10 text-green-500/20 animate-pulse hidden lg:block">
        <Palmtree size={40} />
      </div>
      <div className="fixed bottom-20 left-10 text-green-500/20 animate-pulse hidden lg:block">
        <Palmtree size={30} />
      </div>
      <div className="fixed top-1/3 left-5 text-blue-500/10 animate-bounce hidden lg:block">
        <Fish size={24} />
      </div>
      <div className="fixed top-10 left-1/4 text-blue-500/10 animate-pulse hidden lg:block">
        <Cloud size={30} />
      </div>
      <div className="fixed bottom-1/4 right-5 text-blue-500/10 animate-pulse hidden lg:block">
        <Waves size={24} />
      </div>
      <div className="fixed top-1/4 right-1/4 text-yellow-500/20 animate-pulse hidden lg:block">
        <SunMedium size={40} />
      </div>
    </>
  )
}

