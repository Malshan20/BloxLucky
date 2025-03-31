import { Skeleton } from "@/components/ui/skeleton"
import JungleDecorations from "@/components/jungle-decorations"

export default function SettingsLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900/20 to-blue-900/20 pb-20">
      <JungleDecorations />

      {/* Settings Header Skeleton */}
      <div className="relative z-10 pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      </div>

      {/* Settings Content Skeleton */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Tabs Skeleton */}
        <Skeleton className="h-12 w-full mb-8" />

        {/* Card Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </main>
  )
}

