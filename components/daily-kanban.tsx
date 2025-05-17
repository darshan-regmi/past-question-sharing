"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  text: string
  module: string
  status: "todo" | "inprogress" | "completed"
}

export default function DailyKanban() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "What is the difference between var, let, and const in JavaScript?",
      module: "Web Development",
      status: "todo",
    },
    {
      id: "q2",
      text: "Explain the concept of inheritance in object-oriented programming.",
      module: "Computer Science",
      status: "todo",
    },
    {
      id: "q3",
      text: "What is the central limit theorem in statistics?",
      module: "Statistics",
      status: "inprogress",
    },
    {
      id: "q4",
      text: "Describe the process of photosynthesis.",
      module: "Biology",
      status: "inprogress",
    },
    {
      id: "q5",
      text: "What are the key principles of responsive web design?",
      module: "Web Development",
      status: "completed",
    },
  ])

  const moveQuestion = (id: string, newStatus: "todo" | "inprogress" | "completed") => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return { ...q, status: newStatus }
        }
        return q
      }),
    )
  }

  const getQuestionsByStatus = (status: "todo" | "inprogress" | "completed") => {
    return questions.filter((q) => q.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KanbanColumn
        title="To Do"
        icon={<Circle className="h-5 w-5 text-slate-400" />}
        questions={getQuestionsByStatus("todo")}
        onMoveQuestion={moveQuestion}
        color="bg-slate-100"
      />
      <KanbanColumn
        title="In Progress"
        icon={<Clock className="h-5 w-5 text-amber-500" />}
        questions={getQuestionsByStatus("inprogress")}
        onMoveQuestion={moveQuestion}
        color="bg-amber-50"
      />
      <KanbanColumn
        title="Completed"
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        questions={getQuestionsByStatus("completed")}
        onMoveQuestion={moveQuestion}
        color="bg-green-50"
      />
    </div>
  )
}

interface KanbanColumnProps {
  title: string
  icon: React.ReactNode
  questions: Question[]
  onMoveQuestion: (id: string, status: "todo" | "inprogress" | "completed") => void
  color: string
}

function KanbanColumn({ title, icon, questions, onMoveQuestion, color }: KanbanColumnProps) {
  return (
    <Card className={cn("h-full", color)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
          <span className="ml-2 text-sm text-muted-foreground">({questions.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground py-8">No questions</p>
        ) : (
          questions.map((question) => (
            <Card key={question.id} className="shadow-sm">
              <CardContent className="p-3">
                <p className="text-sm mb-2">{question.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{question.module}</span>
                  <div className="flex gap-1">
                    {question.status !== "todo" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onMoveQuestion(question.id, "todo")}
                      >
                        ← To Do
                      </Button>
                    )}
                    {question.status !== "inprogress" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onMoveQuestion(question.id, "inprogress")}
                      >
                        {question.status === "todo" ? "Start →" : "← In Progress"}
                      </Button>
                    )}
                    {question.status !== "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onMoveQuestion(question.id, "completed")}
                      >
                        Complete →
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}
