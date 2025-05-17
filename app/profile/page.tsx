"use client"

import { useState } from "react"
import MainNav from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Clock, Save } from "lucide-react"

export default function ProfilePage() {
  const [semester, setSemester] = useState("2")
  const [year, setYear] = useState("1")
  const [streak, setStreak] = useState(2)
  const [claimedToday, setClaimedToday] = useState(true)
  
  // Calculate next claim time
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  const hoursUntilNextClaim = Math.floor((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60))
  
  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    console.log({ semester, year })
    // Show success message
    alert("Profile updated successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Ratta</h1>
        <MainNav />
      </header>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/images/avatar.png" alt="User avatar" />
                  <AvatarFallback className="bg-yellow-400 text-white text-xl">DR</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">Edit Profile</h2>
                <p className="text-sm text-muted-foreground mb-4">@darshan.regmi.s24</p>
              </div>

              <div className="flex-1">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Semester</label>
                    <Select value={semester} onValueChange={setSemester}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Year</label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                        <SelectItem value="4">Year 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleSaveChanges} className="mt-2">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">Your Streak</h2>
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-orange-300 mb-4">
                  <span className="text-3xl font-bold">{streak}</span>
                  <span className="text-xs text-muted-foreground absolute -bottom-6">day streak</span>
                </div>
                
                <div className="mt-4 space-y-2 text-center">
                  {claimedToday ? (
                    <div className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Claimed today</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <span>Next claim in: {hoursUntilNextClaim}h</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground max-w-[200px]">
                    Answer daily cram questions to increase your streaks and rule the leaderboard
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
