"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function StreakCalendar() {
  // In a real app, this data would come from a database
  // This represents days where the user has studied
  const [studyDays] = useState<Date[]>([
    new Date(2025, 4, 10),
    new Date(2025, 4, 11),
    new Date(2025, 4, 12),
    new Date(2025, 4, 13),
    new Date(2025, 4, 14),
    new Date(2025, 4, 15),
    new Date(2025, 4, 16), // Today
  ])

  return (
    <div>
      <Calendar
        mode="multiple"
        selected={studyDays}
        className="rounded-md border"
        components={{
          Day: (props) => {
            const isStudyDay = studyDays.some(
              (date) =>
                date.getDate() === props.date.getDate() &&
                date.getMonth() === props.date.getMonth() &&
                date.getFullYear() === props.date.getFullYear(),
            )

            // Check if it's today
            const isToday =
              new Date().getDate() === props.date.getDate() &&
              new Date().getMonth() === props.date.getMonth() &&
              new Date().getFullYear() === props.date.getFullYear()

            return (
              <div
                className={cn(
                  "h-9 w-9 p-0 font-normal",
                  isStudyDay && !isToday && "bg-orange-100 text-orange-700 font-medium rounded-md",
                  isToday && "bg-orange-500 text-white font-medium rounded-md",
                )}
              >
                <props.components.Day {...props} />
              </div>
            )
          },
        }}
      />
      <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-orange-100 border border-orange-200 mr-1"></div>
          <span>Study Day</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-sm bg-orange-500 mr-1"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
