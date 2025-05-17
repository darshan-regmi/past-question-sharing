"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import MainNav from "@/components/main-nav"

interface CreateFlashcardPageProps {
  params: {
    moduleId: string
  }
}

export default function CreateFlashcardPage({ params }: CreateFlashcardPageProps) {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would send this data to your API
    console.log({
      moduleId: params.moduleId,
      question,
      answer,
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Navigate back to module page
      router.push(`/modules/${params.moduleId}`)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <Link href={`/modules/${params.moduleId}`} className="inline-flex items-center mb-6 text-sm">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to module
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Flashcard</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium">
                Question
              </label>
              <Textarea
                id="question"
                placeholder="Enter your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Answer
              </label>
              <Textarea
                id="answer"
                placeholder="Enter the answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                rows={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push(`/modules/${params.moduleId}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Flashcard"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
