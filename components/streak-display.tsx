import { Calendar, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StreakDisplayProps {
  currentStreak: number
}

export default function StreakDisplay({ currentStreak }: StreakDisplayProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="p-2 flex items-center space-x-2">
              <Flame className="h-5 w-5" />
              <span className="font-bold">{currentStreak} day streak!</span>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Keep studying daily to maintain your streak!</p>
          <div className="flex items-center mt-2 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Last activity: Today</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
