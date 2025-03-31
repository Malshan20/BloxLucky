import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        <h3 className="text-xl font-medium text-green-500">Loading authentication...</h3>
        <p className="text-muted-foreground">Preparing your tropical paradise experience</p>
      </div>
    </div>
  )
}

