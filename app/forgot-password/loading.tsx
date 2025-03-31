import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 jungle-pattern">
      <div className="w-full max-w-md flex flex-col items-center justify-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

