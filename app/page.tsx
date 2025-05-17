import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import ModuleList from "@/components/module-list"
import MainNav from "@/components/main-nav"
import DailyKanban from "@/components/daily-kanban"
import StreakDisplay from "@/components/streak-display"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
        <p className="text-xl text-muted-foreground mb-6">Share and study past questions from your modules</p>
        <div className="flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search modules..." className="pl-8" />
          </div>
          <Link href="/create-module">
            <Button>Create Module</Button>
          </Link>
        </div>
      </header>

      <MainNav />

      <main>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Daily Questions</h2>
            <StreakDisplay currentStreak={7} />
          </div>
          <DailyKanban />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Modules</h2>
          <ModuleList
            modules={[
              { id: "cs101", title: "Introduction to Computer Science", count: 42, subject: "Computer Science" },
              { id: "math201", title: "Linear Algebra", count: 36, subject: "Mathematics" },
              { id: "bio150", title: "Cell Biology", count: 28, subject: "Biology" },
              { id: "hist101", title: "World History", count: 53, subject: "History" },
            ]}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recently Added</h2>
          <ModuleList
            modules={[
              { id: "phys202", title: "Quantum Mechanics", count: 17, subject: "Physics" },
              { id: "eng305", title: "Modern Literature", count: 23, subject: "English" },
              { id: "chem101", title: "General Chemistry", count: 31, subject: "Chemistry" },
              { id: "psych220", title: "Cognitive Psychology", count: 19, subject: "Psychology" },
            ]}
          />
        </section>
      </main>
    </div>
  )
}
