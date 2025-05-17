import MainNav from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Clock, Flame, Star, Trophy } from "lucide-react"
import StreakCalendar from "@/components/streak-calendar"
import AnsweredQuestions from "@/components/answered-questions"

export default function ProfilePage() {
  // In a real app, this data would come from a database
  const userStats = {
    totalAnswered: 127,
    correctAnswers: 98,
    currentStreak: 7,
    longestStreak: 14,
    totalModules: 8,
    completedModules: 3,
    badges: [
      { name: "7 Day Streak", icon: <Flame className="h-4 w-4 mr-1" />, date: "May 15, 2025" },
      { name: "100 Questions", icon: <CheckCircle className="h-4 w-4 mr-1" />, date: "May 10, 2025" },
      { name: "First Module", icon: <Star className="h-4 w-4 mr-1" />, date: "April 28, 2025" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Questions Answered</CardTitle>
            <CardDescription>Your progress so far</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{userStats.totalAnswered}</div>
            <div className="text-sm text-muted-foreground mb-4">
              {userStats.correctAnswers} correct (
              {Math.round((userStats.correctAnswers / userStats.totalAnswered) * 100)}
              %)
            </div>
            <Progress value={(userStats.correctAnswers / userStats.totalAnswered) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Streak</CardTitle>
            <CardDescription>Keep it going!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-orange-500 mr-2" />
              <div className="text-3xl font-bold">{userStats.currentStreak} days</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Longest streak: {userStats.longestStreak} days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Modules</CardTitle>
            <CardDescription>Your study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{userStats.totalModules}</div>
            <div className="text-sm text-muted-foreground mb-4">{userStats.completedModules} completed modules</div>
            <Progress value={(userStats.completedModules / userStats.totalModules) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList className="mb-4">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="answered">Answered Questions</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
              <CardDescription>Your study streak calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <StreakCalendar />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answered">
          <Card>
            <CardHeader>
              <CardTitle>Recently Answered Questions</CardTitle>
              <CardDescription>Your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <AnsweredQuestions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStats.badges.map((badge, index) => (
                  <Card key={index} className="border-2 border-amber-200 bg-amber-50">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="font-semibold">{badge.name}</h3>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Earned on {badge.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-dashed border-2 border-muted">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Clock className="h-8 w-8 mb-2" />
                    <p>Complete more activities to earn additional badges</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
