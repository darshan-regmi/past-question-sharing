"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import MainNav from "@/components/main-nav"
import { AdvancedStudyMode } from "@/components/advanced-study-mode"
import { flashcards } from "@/lib/data"

interface StudyPageProps {
  params: {
    moduleId: string
  }
}

export default function StudyPage({ params }: StudyPageProps) {
  const moduleId = params.moduleId;
  const moduleFlashcards = flashcards[moduleId] || [];
  const [studyComplete, setStudyComplete] = useState(false);
  const [studyStats, setStudyStats] = useState<{
    totalCards: number;
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
    timeTaken: number;
  } | null>(null);

  const handleStudyComplete = (stats: {
    totalCards: number;
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
    timeTaken: number;
  }) => {
    setStudyComplete(true);
    setStudyStats(stats);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <div className="mb-6">
        <Link href={`/modules/${params.moduleId}`} className="inline-flex items-center text-sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to module
        </Link>
      </div>

      {studyComplete && studyStats ? (
        <div className="max-w-2xl mx-auto bg-muted/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg">
              <div className="text-3xl font-bold">{studyStats.totalCards}</div>
              <div className="text-sm text-muted-foreground">Total Cards</div>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((studyStats.correctCount / studyStats.totalCards) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{studyStats.correctCount}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{studyStats.incorrectCount}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-muted-foreground">
              Time taken: {Math.floor(studyStats.timeTaken / 60)}m {studyStats.timeTaken % 60}s
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setStudyComplete(false)}>Study Again</Button>
            <Link href={`/modules/${params.moduleId}`}>
              <Button variant="outline">Return to Module</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {moduleFlashcards.length > 0 ? (
            <AdvancedStudyMode 
              flashcards={moduleFlashcards} 
              moduleId={moduleId} 
              onComplete={handleStudyComplete}
            />
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <h2 className="text-2xl font-bold mb-2">No flashcards available</h2>
              <p className="text-muted-foreground mb-4">
                This module doesn't have any flashcards yet.
              </p>
              <Link href={`/modules/${params.moduleId}/create`}>
                <Button>Create First Flashcard</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
