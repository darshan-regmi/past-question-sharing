import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMarkdown } from "@/hooks/use-markdown";
import { Flashcard } from "@/lib/types";
import Image from "next/image";

interface EnhancedFlashcardProps {
  flashcard: Flashcard;
  showAnswer?: boolean;
  onFlip?: () => void;
}

export function EnhancedFlashcard({ flashcard, showAnswer = false, onFlip }: EnhancedFlashcardProps) {
  const { renderMarkdown } = useMarkdown();

  // Define difficulty colors
  const difficultyColors = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card 
      className="w-full transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={onFlip}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          {flashcard.difficulty && (
            <Badge variant="outline" className={difficultyColors[flashcard.difficulty]}>
              {flashcard.difficulty}
            </Badge>
          )}
          {flashcard.year && (
            <span className="text-xs text-muted-foreground">Year: {flashcard.year}</span>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Question:</h3>
          <div className="text-base">{renderMarkdown(flashcard.question)}</div>
        </div>

        {flashcard.imageUrl && (
          <div className="my-4 flex justify-center">
            <Image 
              src={flashcard.imageUrl} 
              alt="Question illustration" 
              width={300} 
              height={200} 
              className="rounded-md object-contain"
            />
          </div>
        )}

        {showAnswer && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Answer:</h3>
            <div className="text-base">{renderMarkdown(flashcard.answer)}</div>
          </div>
        )}

        {!showAnswer && (
          <p className="mt-4 text-sm text-center text-muted-foreground">Click to reveal answer</p>
        )}

        {flashcard.tags && flashcard.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {flashcard.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
