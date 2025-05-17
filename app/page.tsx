"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import MainNav from "@/components/main-nav"
import { DailyQuestions } from "@/components/daily-questions"
import { AcademicModules } from "@/components/academic-modules"
import { Leaderboard } from "@/components/leaderboard"
import { modules } from "@/lib/data"

export default function HomePage() {
  // Add course codes to modules for academic organization
  const enhancedModules = modules.map(module => ({
    ...module,
    id: module.id === "cs101" ? "CS101Y1S1" :
         module.id === "math201" ? "MA201Y1S2" :
         module.id === "bio150" ? "BIO150Y1S1" :
         module.id === "hist101" ? "HIS101Y1S1" :
         module.id === "phys202" ? "PHY202Y2S1" :
         module.id === "eng305" ? "ENG305Y3S1" :
         module.id === "chem101" ? "CHE101Y1S1" :
         module.id === "psych220" ? "PSY220Y2S2" : module.id
  }))
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Ratta</h1>
          <div className="flex items-center gap-3">
            <Link href="/leaderboard">
              <Button variant="outline">LeaderBoard</Button>
            </Link>
          </div>
        </div>
        <MainNav />
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <DailyQuestions />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
        
        <div className="mb-12">
          <AcademicModules modules={enhancedModules} />
        </div>
      </main>
      
      <footer className="text-center text-sm text-muted-foreground mt-12 pt-6 border-t">
        <p>© 2025 Maintained by contributions from students</p>
      </footer>
    </div>
  )
}
