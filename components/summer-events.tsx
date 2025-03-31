import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TreePalmIcon as PalmTree, Umbrella, SunMedium, Building2 } from "lucide-react"

export default function SummerEvents() {
  return (
    <Card className="bg-[#2a1f14] border-[#3a2a1a] overflow-hidden col-span-1 sm:col-span-2 md:col-span-3 group relative tropical-shadow shadow-lg shadow-green-900/50" style={{backgroundImage: "url('/Banner_.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="/BLOXLUCKY.gif" type="video/webm" />
      </video> */}
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
            </div>
            <div className="flex space-x-3">
              
              <Button
                size="sm"
                variant="default"
                className="border-green-800 text-green-500 hover:bg-green-900/20 flex items-center shadow-2xl shadow-green-900/30 absolute bottom-4 left-1/2 transform -translate-x-1/2 justify-center"
                onClick={() => window.location.href = '/about'}
              >
               <Building2 className="h-10 w-10 text-green-600 mr-3" />
                Learn More
              </Button>
            </div>
      </CardContent>
    </Card>
  )
}
