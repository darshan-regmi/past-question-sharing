"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ModuleList from "@/components/module-list"
import MainNav from "@/components/main-nav"
import { FilterBar } from "@/components/filter-bar"
import { modules, getSubjects, filterModules } from "@/lib/data"
import { FilterOptions, Module } from "@/lib/types"

export default function ModulesPage() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})
  const [filteredModules, setFilteredModules] = useState<Module[]>(modules)
  const subjects = getSubjects()
  
  // Filter modules based on filter options
  useEffect(() => {
    const filtered = filterModules({
      query: filterOptions.searchQuery,
      subject: filterOptions.subject
    })
    setFilteredModules(filtered)
  }, [filterOptions])
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">StudyFlash</h1>
      </header>

      <MainNav />

      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Modules</h2>
          <Link href="/create-module">
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Create Module
            </Button>
          </Link>
        </div>
        
        <FilterBar
          options={filterOptions}
          onFilterChange={setFilterOptions}
          subjects={subjects}
        />
      </div>

      <main className="max-w-4xl mx-auto">
        {filteredModules.length > 0 ? (
          <ModuleList modules={filteredModules} />
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">No modules match your search criteria</p>
            <Button 
              variant="link" 
              onClick={() => setFilterOptions({})}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
