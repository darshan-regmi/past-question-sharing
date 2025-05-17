"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import MainNav from "@/components/main-nav"
import { FilterBar } from "@/components/filter-bar"
import { EnhancedFlashcard } from "@/components/enhanced-flashcard"
import { Flashcard, Module, FilterOptions } from "@/lib/types"
import { Search, BookOpen, Clock, Tag, Filter } from "lucide-react"

// Mock data for the question bank
const mockModules: Module[] = [
  {
    id: "CS101Y1S1",
    title: "CS101",
    subject: "Computer Science",
    count: 25,
    name: "CS101 - Introduction to Computer Science",
    description: "Fundamentals of programming and computer science concepts",
    year: 1,
    semester: 1,
    tags: ["programming", "basics"],
    flashcardCount: 25,
  },
  {
    id: "MA201Y1S2",
    title: "MA201",
    subject: "Mathematics",
    count: 18,
    name: "MA201 - Linear Algebra",
    description: "Vectors, matrices, linear transformations and applications",
    year: 1,
    semester: 2,
    tags: ["mathematics", "vectors"],
    flashcardCount: 18,
  },
  {
    id: "PHY202Y2S1",
    title: "PHY202",
    subject: "Physics",
    count: 30,
    name: "PHY202 - Quantum Mechanics",
    description: "Introduction to quantum physics and wave functions",
    year: 2,
    semester: 1,
    tags: ["physics", "quantum"],
    flashcardCount: 30,
  },
  {
    id: "CS301Y2S2",
    title: "CS301",
    subject: "Computer Science",
    count: 42,
    name: "CS301 - Data Structures & Algorithms",
    description: "Advanced data structures and algorithm analysis",
    year: 2,
    semester: 2,
    tags: ["algorithms", "data structures"],
    flashcardCount: 42,
  },
  {
    id: "CS401Y3S1",
    title: "CS401",
    subject: "Computer Science",
    count: 35,
    name: "CS401 - Artificial Intelligence",
    description: "Fundamentals of AI, machine learning, and neural networks",
    year: 3,
    semester: 1,
    tags: ["AI", "machine learning"],
    flashcardCount: 35,
  },
]

const mockFlashcards: Flashcard[] = [
  {
    id: "q1",
    moduleId: "CS101Y1S1",
    question: "What is the difference between a compiler and an interpreter?",
    answer: "A compiler translates the entire source code into machine code before execution, while an interpreter executes the source code line by line without prior translation to machine code. Compilers generally produce faster-running applications, while interpreters offer better debugging capabilities.",
    difficulty: "medium",
    tags: ["programming", "basics"],
    year: 2023,
  },
  {
    id: "q2",
    moduleId: "CS101Y1S1",
    question: "Explain the concept of recursion in programming.",
    answer: "Recursion is a programming technique where a function calls itself to solve a problem. A recursive function must have a base case (termination condition) and a recursive case. It's useful for problems that can be broken down into smaller, similar subproblems, such as tree traversal, factorial calculation, or Fibonacci sequence generation.",
    difficulty: "hard",
    tags: ["programming", "algorithms"],
    year: 2023,
  },
  {
    id: "q3",
    moduleId: "MA201Y1S2",
    question: "What is an eigenvector and eigenvalue?",
    answer: "An eigenvector of a square matrix A is a non-zero vector v that, when multiplied by A, yields a scalar multiple of itself: Av = λv. The scalar λ is called the eigenvalue corresponding to the eigenvector v. Eigenvectors and eigenvalues are fundamental in linear algebra and have applications in various fields including physics, computer graphics, and data analysis.",
    difficulty: "hard",
    tags: ["mathematics", "linear algebra"],
    year: 2022,
  },
  {
    id: "q4",
    moduleId: "PHY202Y2S1",
    question: "State Heisenberg's Uncertainty Principle.",
    answer: "Heisenberg's Uncertainty Principle states that it is impossible to simultaneously know both the position and momentum of a particle with perfect precision. Mathematically, it is expressed as ΔxΔp ≥ ħ/2, where Δx is the uncertainty in position, Δp is the uncertainty in momentum, and ħ is the reduced Planck constant. This principle is fundamental to quantum mechanics and represents a departure from classical physics.",
    difficulty: "medium",
    tags: ["physics", "quantum"],
    year: 2023,
  },
  {
    id: "q5",
    moduleId: "CS301Y2S2",
    question: "What is the time complexity of quicksort in the worst case and average case?",
    answer: "Quicksort has a worst-case time complexity of O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions (e.g., when the array is already sorted). However, its average-case time complexity is O(n log n), making it efficient for most practical applications. Various pivot selection strategies can be used to minimize the likelihood of encountering the worst-case scenario.",
    difficulty: "medium",
    tags: ["algorithms", "sorting"],
    year: 2022,
  },
]

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    difficulty: null,
    tags: [],
    year: null,
  })
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>(mockFlashcards)
  
  // Handle module selection
  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId === selectedModule ? null : moduleId)
    
    // Filter flashcards when module is selected
    if (moduleId !== selectedModule) {
      setFilteredFlashcards(mockFlashcards.filter(card => card.moduleId === moduleId))
    } else {
      setFilteredFlashcards(mockFlashcards)
    }
  }
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    if (!query) {
      // If no search query, just filter by selected module
      setFilteredFlashcards(selectedModule 
        ? mockFlashcards.filter(card => card.moduleId === selectedModule)
        : mockFlashcards
      )
      return
    }
    
    // Filter flashcards by search query and selected module
    const filtered = mockFlashcards.filter(card => {
      const matchesModule = selectedModule ? card.moduleId === selectedModule : true
      const matchesQuery = 
        card.question.toLowerCase().includes(query) || 
        card.answer.toLowerCase().includes(query) ||
        (card.tags ? card.tags.some(tag => tag.toLowerCase().includes(query)) : false)
      
      return matchesModule && matchesQuery
    })
    
    setFilteredFlashcards(filtered)
  }
  
  // Handle filter changes
  const handleFilterChange = (newOptions: FilterOptions) => {
    setFilterOptions(newOptions)
    
    // Apply filters
    let filtered = selectedModule 
      ? mockFlashcards.filter(card => card.moduleId === selectedModule)
      : mockFlashcards
    
    // Apply difficulty filter
    if (newOptions.difficulty) {
      filtered = filtered.filter(card => card.difficulty === newOptions.difficulty)
    }
    
    // Apply tags filter
    if (newOptions.tags && newOptions.tags.length > 0) {
      filtered = filtered.filter(card => 
        card.tags && newOptions.tags!.some(tag => card.tags!.includes(tag))
      )
    }
    
    // Apply year filter
    if (newOptions.year) {
      filtered = filtered.filter(card => card.year === newOptions.year)
    }
    
    // Apply search query if exists
    if (searchQuery) {
      filtered = filtered.filter(card => 
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredFlashcards(filtered)
  }
  
  // Get all available tags from modules
  const allTags = Array.from(new Set(mockModules.flatMap(module => module.tags || [])))
  
  // Get all available years
  const allYears = Array.from(new Set(mockFlashcards.map(card => card.year)))
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Ratta</h1>
        <MainNav />
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar with modules */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules
              </CardTitle>
              <CardDescription>Select a module to view its questions</CardDescription>
              
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockModules.map(module => (
                  <Button
                    key={module.id}
                    variant={selectedModule === module.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleModuleSelect(module.id)}
                  >
                    <div>
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Year {module.year}, Semester {module.semester}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.flashcardCount} questions
                        </Badge>
                        {module.tags?.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content with questions */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Question Bank
                </span>
                <Button size="sm" variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </CardTitle>
              <CardDescription>
                {selectedModule 
                  ? `Questions for ${mockModules.find(m => m.id === selectedModule)?.name}`
                  : "All questions from all modules"
                }
              </CardDescription>
              
              {/* Filter bar */}
              <FilterBar
                options={filterOptions}
                onFilterChange={handleFilterChange}
                subjects={Array.from(new Set(mockModules.map(m => m.subject)))}
                years={allYears.map(year => year ? year.toString() : '')}
                tags={allTags as string[]}
                showDifficulty={true}
              />
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Questions</TabsTrigger>
                  <TabsTrigger value="easy">Easy</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {filteredFlashcards.length > 0 ? (
                    filteredFlashcards.map(card => (
                      <EnhancedFlashcard key={card.id} flashcard={card} />
                    ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground">No questions found matching your criteria</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedModule(null)
                          setFilterOptions({
                            difficulty: null,
                            tags: [],
                            year: null,
                          })
                          setFilteredFlashcards(mockFlashcards)
                        }}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="easy" className="space-y-6">
                  {filteredFlashcards.filter(card => card.difficulty === "easy").length > 0 ? (
                    filteredFlashcards
                      .filter(card => card.difficulty === "easy")
                      .map(card => (
                        <EnhancedFlashcard key={card.id} flashcard={card} />
                      ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground">No easy questions found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="medium" className="space-y-6">
                  {filteredFlashcards.filter(card => card.difficulty === "medium").length > 0 ? (
                    filteredFlashcards
                      .filter(card => card.difficulty === "medium")
                      .map(card => (
                        <EnhancedFlashcard key={card.id} flashcard={card} />
                      ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground">No medium questions found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="hard" className="space-y-6">
                  {filteredFlashcards.filter(card => card.difficulty === "hard").length > 0 ? (
                    filteredFlashcards
                      .filter(card => card.difficulty === "hard")
                      .map(card => (
                        <EnhancedFlashcard key={card.id} flashcard={card} />
                      ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground">No hard questions found</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground mt-12 pt-6 border-t">
        <p>© 2025 Maintained by contributions from students</p>
      </footer>
    </div>
  )
}
