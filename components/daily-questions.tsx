"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Plus } from "lucide-react"
import { getDailyQuestions } from "@/lib/data"
import { Flashcard } from "@/lib/types"
import { EnhancedFlashcard } from "@/components/enhanced-flashcard"

export function DailyQuestions() {
  const [activeTab, setActiveTab] = useState<"todo" | "completed">("todo")
  const [dailyQuestions, setDailyQuestions] = useState<Flashcard[]>([])
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([])
  const [streak, setStreak] = useState(0)
  
  // Load daily questions and streak from localStorage on mount
  useEffect(() => {
    // Get daily questions
    const questions = getDailyQuestions(5)
    setDailyQuestions(questions)
    
    // Get completed questions from localStorage
    const today = new Date().toISOString().split('T')[0]
    const storedCompleted = localStorage.getItem(`completed_questions_${today}`)
    if (storedCompleted) {
      setCompletedQuestions(JSON.parse(storedCompleted))
    }
    
    // Get streak from localStorage
    const storedStreak = localStorage.getItem('question_streak')
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10))
    }
    
    // Check if streak needs to be updated
    const lastStreakDate = localStorage.getItem('last_streak_date')
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayString = yesterday.toISOString().split('T')[0]
    
    if (lastStreakDate !== yesterdayString && lastStreakDate !== today) {
      // Reset streak if user missed a day
      if (lastStreakDate && new Date(lastStreakDate) < yesterday) {
        setStreak(0)
        localStorage.setItem('question_streak', '0')
      }
    }
    
    // Update last streak date
    localStorage.setItem('last_streak_date', today)
  }, [])
  
  // Save completed questions to localStorage when they change
  useEffect(() => {
    if (completedQuestions.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem(`completed_questions_${today}`, JSON.stringify(completedQuestions))
      
      // If all questions are completed, increase streak
      if (completedQuestions.length === dailyQuestions.length && dailyQuestions.length > 0) {
        const newStreak = streak + 1
        setStreak(newStreak)
        localStorage.setItem('question_streak', newStreak.toString())
      }
    }
  }, [completedQuestions, dailyQuestions.length, streak])
  
  const handleMarkCompleted = (questionId: string) => {
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions([...completedQuestions, questionId])
    }
  }
  
  const todoQuestions = dailyQuestions.filter(q => !completedQuestions.includes(q.id))
  const completed = dailyQuestions.filter(q => completedQuestions.includes(q.id))
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Daily Questions</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-3">
            <Check className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-bold">{streak}</span> day streak
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "todo" | "completed")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="todo">
              To Do ({todoQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completed.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="todo">
            {todoQuestions.length > 0 ? (
              <div className="space-y-4">
                {todoQuestions.map((question) => (
                  <div key={question.id} className="relative">
                    <EnhancedFlashcard flashcard={question} />
                    <Button 
                      size="sm" 
                      className="absolute bottom-3 right-3"
                      onClick={() => handleMarkCompleted(question.id)}
                    >
                      Mark as Completed
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">All questions completed for today!</p>
                <p className="text-sm text-muted-foreground">Come back tomorrow for new questions</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completed.length > 0 ? (
              <div className="space-y-4">
                {completed.map((question) => (
                  <div key={question.id}>
                    <EnhancedFlashcard flashcard={question} showAnswer={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No completed questions yet</p>
                <p className="text-sm text-muted-foreground">Complete daily questions to build your streak!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
