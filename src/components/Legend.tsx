import { Badge } from "@/components/ui/badge"

export default function Legend() {
  return (
    <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold mb-2">Legend</h3>
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <Badge className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
          <span className="text-xs">Investor</span>
        </div>
        <div className="flex items-center">
          <Badge className="w-4 h-4 rounded-full bg-green-500 mr-2" />
          <span className="text-xs">Company</span>
        </div>
      </div>
    </div>
  )
}

