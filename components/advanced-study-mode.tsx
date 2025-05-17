import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EnhancedFlashcard } from "@/components/enhanced-flashcard";
import { Flashcard } from "@/lib/types";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Timer, 
  Settings
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdvancedStudyModeProps {
  flashcards: Flashcard[];
  moduleId: string;
  onComplete?: (stats: {
    totalCards: number;
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
    timeTaken: number;
  }) => void;
}

export function AdvancedStudyMode({ 
  flashcards, 
  moduleId, 
  onComplete 
}: AdvancedStudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string[]>([]);
  const [studyMode, setStudyMode] = useState<"all" | "difficult" | "incorrect">("all");
  const [shuffleCards, setShuffleCards] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeCards, setActiveCards] = useState(flashcards);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showTimer) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showTimer, startTime]);

  // Update active cards when study mode changes
  useEffect(() => {
    let filteredCards = [...flashcards];
    
    if (studyMode === "difficult") {
      filteredCards = flashcards.filter(card => card.difficulty === "medium" || card.difficulty === "hard");
    } else if (studyMode === "incorrect") {
      filteredCards = flashcards.filter(card => incorrect.includes(card.id));
      if (filteredCards.length === 0) filteredCards = [...flashcards];
    }
    
    if (shuffleCards) {
      filteredCards = [...filteredCards].sort(() => 0.5 - Math.random());
    }
    
    setActiveCards(filteredCards);
    setCurrentIndex(0);
    setFlipped(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [studyMode, shuffleCards, flashcards, incorrect]);

  const currentCard = activeCards[currentIndex];
  const progress = (completed.length / activeCards.length) * 100;
  
  const handleNext = () => {
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      // Study session complete
      if (onComplete) {
        onComplete({
          totalCards: activeCards.length,
          correctCount: correct.length,
          incorrectCount: incorrect.length,
          skippedCount: activeCards.length - correct.length - incorrect.length,
          timeTaken: elapsedTime
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped && !completed.includes(currentCard.id)) {
      setCompleted([...completed, currentCard.id]);
    }
  };

  const handleCorrect = () => {
    if (!correct.includes(currentCard.id)) {
      setCorrect([...correct, currentCard.id]);
    }
    // Remove from incorrect if it was there
    if (incorrect.includes(currentCard.id)) {
      setIncorrect(incorrect.filter(id => id !== currentCard.id));
    }
    handleNext();
  };

  const handleIncorrect = () => {
    if (!incorrect.includes(currentCard.id)) {
      setIncorrect([...incorrect, currentCard.id]);
    }
    // Remove from correct if it was there
    if (correct.includes(currentCard.id)) {
      setCorrect(correct.filter(id => id !== currentCard.id));
    }
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted([]);
    setCorrect([]);
    setIncorrect([]);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentCard) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">No flashcards available</h2>
        <p className="text-muted-foreground mb-4">
          There are no flashcards available for this study mode.
        </p>
        <Button onClick={() => setStudyMode("all")}>
          Study All Cards
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {activeCards.length}
        </div>
        
        <div className="flex items-center gap-4">
          {showTimer && (
            <div className="flex items-center gap-1 text-sm">
              <Timer className="h-4 w-4" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Study Settings</SheetTitle>
                <SheetDescription>
                  Customize your study experience
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Study Mode</h4>
                  <Select value={studyMode} onValueChange={(value: "all" | "difficult" | "incorrect") => setStudyMode(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cards</SelectItem>
                      <SelectItem value="difficult">Difficult Cards</SelectItem>
                      <SelectItem value="incorrect">Incorrect Cards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffle-cards">Shuffle Cards</Label>
                  <Switch 
                    id="shuffle-cards" 
                    checked={shuffleCards} 
                    onCheckedChange={setShuffleCards} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-timer">Show Timer</Label>
                  <Switch 
                    id="show-timer" 
                    checked={showTimer} 
                    onCheckedChange={setShowTimer} 
                  />
                </div>
                
                <Button onClick={handleReset} className="w-full">
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Reset Study Session
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="mb-8">
        <EnhancedFlashcard 
          flashcard={currentCard} 
          showAnswer={flipped} 
          onFlip={handleFlip} 
        />
      </div>

      <Tabs defaultValue="navigate" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="navigate">Navigation</TabsTrigger>
          <TabsTrigger value="rate">Rate Knowledge</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigate" className="pt-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" onClick={handleFlip}>
              {flipped ? "Hide Answer" : "Show Answer"}
            </Button>
            <Button onClick={handleNext}>
              {currentIndex === activeCards.length - 1 ? "Finish" : "Next"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="rate" className="pt-4">
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-red-200 hover:bg-red-50 text-red-600" 
              onClick={handleIncorrect}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              Incorrect
            </Button>
            <Button 
              variant="outline" 
              onClick={handleFlip}
            >
              {flipped ? "Hide Answer" : "Show Answer"}
            </Button>
            <Button 
              variant="outline" 
              className="border-green-200 hover:bg-green-50 text-green-600" 
              onClick={handleCorrect}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              Correct
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div>Correct: {correct.length}</div>
          <div>Incorrect: {incorrect.length}</div>
          <div>Remaining: {activeCards.length - completed.length}</div>
        </div>
      </div>
    </div>
  );
}
