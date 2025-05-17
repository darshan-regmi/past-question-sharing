"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for leaderboard
const mockUsers = [
  { id: "1", name: "Darshan Regmi", streak: 7, contributions: 15, avatar: "" },
  { id: "2", name: "John Smith", streak: 5, contributions: 12, avatar: "" },
  { id: "3", name: "Emily Johnson", streak: 4, contributions: 9, avatar: "" },
  { id: "4", name: "Michael Brown", streak: 3, contributions: 7, avatar: "" },
  { id: "5", name: "Sarah Davis", streak: 3, contributions: 5, avatar: "" },
  { id: "6", name: "David Wilson", streak: 2, contributions: 4, avatar: "" },
  { id: "7", name: "Jessica Taylor", streak: 1, contributions: 3, avatar: "" },
  { id: "8", name: "Robert Miller", streak: 1, contributions: 2, avatar: "" },
]

export function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<"streaks" | "contributions">("streaks")
  
  const sortedUsers = [...mockUsers].sort((a, b) => {
    if (leaderboardType === "streaks") {
      return b.streak - a.streak
    } else {
      return b.contributions - a.contributions
    }
  })
  
  const getLeaderBadge = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={leaderboardType} onValueChange={(value) => setLeaderboardType(value as "streaks" | "contributions")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="streaks" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Daily Streaks
            </TabsTrigger>
            <TabsTrigger value="contributions" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Contributions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="streaks" className="mt-0">
            <div className="space-y-2">
              {sortedUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    index < 3 ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6">
                      {getLeaderBadge(index)}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Badge variant={index < 3 ? "default" : "outline"} className="ml-auto">
                    {user.streak} day streak
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contributions" className="mt-0">
            <div className="space-y-2">
              {sortedUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    index < 3 ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6">
                      {getLeaderBadge(index)}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Badge variant={index < 3 ? "default" : "outline"} className="ml-auto">
                    {user.contributions} contributions
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
