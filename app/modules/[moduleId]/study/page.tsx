"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import MainNav from "@/components/main-nav"

interface StudyPageProps {
  params: {
    moduleId: string
  }
}

export default function StudyPage({ params }: StudyPageProps) {
  // In a real app, you would fetch these flashcards based on the moduleId
  const flashcards = [
    {
      id: "1",
      question: "What is the time complexity of a binary search algorithm?",
      answer: "O(log n)",
    },
    {
      id: "2",
      question: "What does CPU stand for?",
      answer: "Central Processing Unit",
    },
    {
      id: "3",
      question: "What is the difference between a stack and a queue?",
      answer: "A stack follows LIFO (Last In First Out) principle, while a queue follows FIFO (First In First Out).",
    },
    {
      id: "4",
      question: "What is recursion?",
      answer: "Recursion is when a function calls itself directly or indirectly to solve a problem.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])

  const currentCard = flashcards[currentIndex]
  const progress = (completed.length / flashcards.length) * 100

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
    if (!flipped && !completed.includes(currentCard.id)) {
      setCompleted([...completed, currentCard.id])
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setCompleted([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <div className="flex justify-between items-center mb-6">
        <Link href={`/modules/${params.moduleId}`} className="inline-flex items-center text-sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to module
        </Link>
        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
      </div>

      <div className="mb-4">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center mb-8">
        <Card
          className="w-full max-w-2xl h-64 cursor-pointer transition-all duration-500 perspective"
          onClick={handleFlip}
        >
          <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}>
            <CardContent className="absolute w-full h-full p-6 flex flex-col justify-center items-center backface-hidden">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Question:</h3>
              <p className="text-center text-lg">{currentCard.question}</p>
              <p className="mt-4 text-sm text-muted-foreground">Click to reveal answer</p>
            </CardContent>
            <CardContent className="absolute w-full h-full p-6 flex flex-col justify-center items-center backface-hidden rotate-y-180 bg-muted/30">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Answer:</h3>
              <p className="text-center text-lg">{currentCard.answer}</p>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
