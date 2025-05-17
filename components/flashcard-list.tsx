import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: string
  question: string
  answer: string
}

interface FlashcardListProps {
  flashcards: Flashcard[]
}

export default function FlashcardList({ flashcards }: FlashcardListProps) {
  return (
    <div className="space-y-4">
      {flashcards.map((flashcard) => (
        <Card key={flashcard.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <h3 className="font-medium mb-2">Question:</h3>
              <p className="text-muted-foreground">{flashcard.question}</p>
            </div>
            <div className="border-t bg-muted/50 flex justify-between items-center p-4">
              <p className="text-sm text-muted-foreground">Click to view answer</p>
              <Link href={`/flashcard/${flashcard.id}`}>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
