"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedFlashcard } from "@/components/enhanced-flashcard"
import MainNav from "@/components/main-nav"
import { Flashcard } from "@/lib/types"
import { Upload, Sparkles, FileText } from "lucide-react"

export default function AIFlashcardsPage() {
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedFlashcards, setGeneratedFlashcards] = useState<Flashcard[]>([])
  
  // Mock modules for dropdown
  const modules = [
    { id: "all", name: "All modules" },
    { id: "CS101Y1S1", name: "CS101 - Introduction to Computer Science" },
    { id: "MA201Y1S2", name: "MA201 - Linear Algebra" },
    { id: "PHY202Y2S1", name: "PHY202 - Quantum Mechanics" },
  ]
  
  // Mock AI-generated flashcards
  const mockFlashcards: Flashcard[] = [
    {
      id: "ai-1",
      question: "What is the difference between a stack and a queue?",
      answer: "A stack follows LIFO (Last In First Out) principle, while a queue follows FIFO (First In First Out).",
      difficulty: "medium",
      tags: ["data structures", "basics"],
    },
    {
      id: "ai-2",
      question: "What are the three OOP principles and define them?",
      answer: "1. Encapsulation - The process of wrapping data and methods into a single unit (class) and restricting direct access to some of the object's components to protect the data. 2. Inheritance - A mechanism where one class acquires the properties and behaviors (methods and attributes) of another class. 3. Polymorphism - The ability of different objects to respond to the same method in different ways.",
      difficulty: "hard",
      tags: ["OOP", "programming", "principles"],
    },
    {
      id: "ai-3",
      question: "What is a binary search algorithm?",
      answer: "Binary search is a search algorithm that finds the position of a target value within a sorted array. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half. Repeatedly check until the value is found or the interval is empty. Time complexity: O(log n).",
      difficulty: "medium",
      tags: ["algorithms", "search", "complexity"],
    },
  ]
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }
  
  const handleGenerate = () => {
    setIsGenerating(true)
    
    // Simulate API call with a delay
    setTimeout(() => {
      setGeneratedFlashcards(mockFlashcards)
      setIsGenerating(false)
    }, 2000)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Ratta</h1>
        <MainNav />
      </header>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI-generated Flash Cards
            </CardTitle>
            <p className="text-sm text-muted-foreground">From lecture slides</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="generate">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="generate">Generate New</TabsTrigger>
                <TabsTrigger value="view">View Generated</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="module">Module</Label>
                    <Select value={selectedModule} onValueChange={setSelectedModule}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map(module => (
                          <SelectItem key={module.id} value={module.id}>
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="slides">Upload Lecture Slides (PDF)</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <Input 
                          id="slides" 
                          type="file" 
                          accept=".pdf" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="slides" className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">
                            {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF files up to 10MB
                          </p>
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!uploadedFile || isGenerating}
                    className="w-full"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Flashcards"}
                  </Button>
                  
                  {isGenerating && (
                    <div className="text-center py-8">
                      <div className="animate-pulse flex flex-col items-center">
                        <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
                        <p className="text-sm font-medium">AI is generating flashcards...</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This may take a minute
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="view">
                <div>
                  <div className="mb-4">
                    <Label htmlFor="filter-module">Filter by Module</Label>
                    <Select value={selectedModule} onValueChange={setSelectedModule}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map(module => (
                          <SelectItem key={module.id} value={module.id}>
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {generatedFlashcards.length > 0 ? (
                    <div className="space-y-6">
                      {generatedFlashcards.map(card => (
                        <EnhancedFlashcard key={card.id} flashcard={card} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">No AI-generated flashcards yet</p>
                      <p className="text-sm text-muted-foreground">
                        Upload lecture slides to generate flashcards
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground mt-12 pt-6 border-t">
        <p>© 2025 Maintained by contributions from students</p>
      </footer>
    </div>
  )
}
