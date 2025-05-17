"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import MainNav from "@/components/main-nav"
import { EnhancedFlashcard } from "@/components/enhanced-flashcard"
import { FilterBar } from "@/components/filter-bar"
import { flashcards } from "@/lib/data"
import { Flashcard, FilterOptions } from "@/lib/types"

interface ModulePageProps {
  params: {
    moduleId: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([])
  
  // Get module data from our static data
  const moduleId = params.moduleId
  const moduleFlashcards = flashcards[moduleId] || []
  
  const moduleData = {
    id: moduleId,
    title: moduleId === "cs101" ? "Introduction to Computer Science" : 
           moduleId === "math201" ? "Linear Algebra" : 
           moduleId === "phys202" ? "Quantum Mechanics" : "Module Title",
    description: "Learn the fundamentals and answer practice questions to test your knowledge.",
  }
  
  // Extract all years and tags from the module's flashcards
  const moduleYears = Array.from(new Set(moduleFlashcards.map(card => card.year).filter(Boolean) as string[]))
  const moduleTags = Array.from(new Set(moduleFlashcards.flatMap(card => card.tags || [])))
  
  // Filter flashcards based on filter options
  useEffect(() => {
    let filtered = [...moduleFlashcards]
    
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      filtered = filtered.filter(card => 
        card.question.toLowerCase().includes(query) || 
        card.answer.toLowerCase().includes(query)
      )
    }
    
    if (filterOptions.difficulty) {
      filtered = filtered.filter(card => card.difficulty === filterOptions.difficulty)
    }
    
    if (filterOptions.year) {
      filtered = filtered.filter(card => card.year === filterOptions.year)
    }
    
    if (filterOptions.tags && filterOptions.tags.length > 0) {
      filtered = filtered.filter(card => 
        card.tags && filterOptions.tags?.some(tag => card.tags?.includes(tag))
      )
    }
    
    setFilteredFlashcards(filtered)
  }, [filterOptions, moduleFlashcards])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <Link href="/modules" className="inline-flex items-center mb-6 text-sm">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to modules
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{moduleData.title}</h1>
        <p className="text-muted-foreground mb-4">{moduleData.description}</p>
        <div className="flex flex-wrap gap-2">
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
        <div className="mb-6">
          <FilterBar
            options={filterOptions}
            onFilterChange={setFilterOptions}
            years={moduleYears}
            tags={moduleTags}
            showDifficulty={true}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Flashcards ({filteredFlashcards.length})
          {filterOptions.searchQuery && 
            <span className="text-muted-foreground font-normal"> 
              &nbsp;matching "{filterOptions.searchQuery}"
            </span>
          }
        </h2>
        
        {filteredFlashcards.length > 0 ? (
          <div className="grid gap-6">
            {filteredFlashcards.map((flashcard: Flashcard) => (
              <EnhancedFlashcard
                key={flashcard.id}
                flashcard={flashcard}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">No flashcards match your filters</p>
            <Button 
              variant="link" 
              onClick={() => setFilterOptions({})}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
