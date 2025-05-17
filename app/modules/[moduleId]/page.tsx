import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import FlashcardList from "@/components/flashcard-list"
import MainNav from "@/components/main-nav"

interface ModulePageProps {
  params: {
    moduleId: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  // In a real app, you would fetch the module data based on the moduleId
  const moduleData = {
    id: params.moduleId,
    title: params.moduleId === "cs101" ? "Introduction to Computer Science" : "Module Title",
    description: "Learn the fundamentals and answer practice questions to test your knowledge.",
    flashcards: [
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
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <Link href="/" className="inline-flex items-center mb-6 text-sm">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to modules
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{moduleData.title}</h1>
        <p className="text-muted-foreground mb-4">{moduleData.description}</p>
        <div className="flex gap-2">
          <Link href={`/modules/${params.moduleId}/study`}>
            <Button>Study All Cards</Button>
          </Link>
          <Link href={`/modules/${params.moduleId}/create`}>
            <Button variant="outline">
              <Plus className="mr-1 h-4 w-4" />
              Add Flashcard
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <h2 className="text-xl font-semibold mb-4">Flashcards ({moduleData.flashcards.length})</h2>
        <FlashcardList flashcards={moduleData.flashcards} />
      </main>
    </div>
  )
}
