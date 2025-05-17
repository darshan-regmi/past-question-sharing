"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import MainNav from "@/components/main-nav"

interface FlashcardPageProps {
  params: {
    id: string
  }
}

export default function FlashcardPage({ params }: FlashcardPageProps) {
  const [flipped, setFlipped] = useState(false)

  // In a real app, you would fetch this flashcard based on the id
  const flashcard = {
    id: params.id,
    question: "What is the time complexity of a binary search algorithm?",
    answer: "O(log n)",
    moduleId: "cs101",
    moduleName: "Introduction to Computer Science",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <Link href={`/modules/${flashcard.moduleId}`} className="inline-flex items-center mb-6 text-sm">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to {flashcard.moduleName}
      </Link>

      <div className="flex justify-center mb-8">
        <Card
          className="w-full max-w-2xl h-80 cursor-pointer transition-all duration-500 perspective"
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}>
            <CardContent className="absolute w-full h-full p-8 flex flex-col justify-center items-center backface-hidden">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Question:</h3>
              <p className="text-center text-xl">{flashcard.question}</p>
              <p className="mt-8 text-sm text-muted-foreground">Click to reveal answer</p>
            </CardContent>
            <CardContent className="absolute w-full h-full p-8 flex flex-col justify-center items-center backface-hidden rotate-y-180 bg-muted/30">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Answer:</h3>
              <p className="text-center text-xl">{flashcard.answer}</p>
              <p className="mt-8 text-sm text-muted-foreground">Click to see question</p>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Link href={`/modules/${flashcard.moduleId}`}>
          <Button variant="outline">View All Flashcards</Button>
        </Link>
      </div>
    </div>
  )
}
