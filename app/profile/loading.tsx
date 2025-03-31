import { Skeleton } from "@/components/ui/skeleton"
import JungleDecorations from "@/components/jungle-decorations"

export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900/20 to-blue-900/20 pb-20">
      <JungleDecorations />

      {/* Profile Header Skeleton */}
      <div className="relative z-10 pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-primary/20 shadow-lg">
          {/* Avatar Skeleton */}
          <Skeleton className="h-32 w-32 rounded-full" />

          <div className="flex-1 text-center md:text-left">
            {/* Username Skeleton */}
            <Skeleton className="h-8 w-48 mb-2 mx-auto md:mx-0" />
            {/* Level Skeleton */}
            <Skeleton className="h-4 w-32 mb-4 mx-auto md:mx-0" />

            {/* Stats Skeleton */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-28" />
              ))}
            </div>
          </div>

          {/* Stats Card Skeleton */}
          <div className="bg-black/30 rounded-lg p-4 border border-primary/20 min-w-[200px]">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Skeleton className="h-12 w-full mb-8" />

        {/* Content Skeleton */}
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </main>
  )
}

