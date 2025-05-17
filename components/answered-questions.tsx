import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export default function AnsweredQuestions() {
  // In a real app, this data would come from a database
  const answeredQuestions = [
    {
      id: "q1",
      question: "What is the time complexity of a binary search algorithm?",
      module: "Computer Science",
      date: "May 16, 2025",
      correct: true,
    },
    {
      id: "q2",
      question: "What does CPU stand for?",
      module: "Computer Science",
      date: "May 16, 2025",
      correct: true,
    },
    {
      id: "q3",
      question: "What is the central limit theorem in statistics?",
      module: "Statistics",
      date: "May 15, 2025",
      correct: false,
    },
    {
      id: "q4",
      question: "Describe the process of photosynthesis.",
      module: "Biology",
      date: "May 15, 2025",
      correct: true,
    },
    {
      id: "q5",
      question: "What are the key principles of responsive web design?",
      module: "Web Development",
      date: "May 14, 2025",
      correct: true,
    },
  ]

  return (
    <div className="space-y-4">
      {answeredQuestions.map((question) => (
        <Card key={question.id} className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium mb-1">{question.question}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{question.module}</Badge>
                  <span className="text-xs text-muted-foreground">{question.date}</span>
                </div>
              </div>
              {question.correct ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
