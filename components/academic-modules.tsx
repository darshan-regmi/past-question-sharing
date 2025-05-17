"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Eye } from "lucide-react"
import { Module } from "@/lib/types"

interface AcademicModulesProps {
  modules: Module[]
}

export function AcademicModules({ modules }: AcademicModulesProps) {
  const [selectedYear, setSelectedYear] = useState<string>("1")
  const [selectedSemester, setSelectedSemester] = useState<string>("1")
  
  // Group modules by year and semester
  const years = Array.from(new Set(modules.map(m => {
    // Extract year from module ID (assuming format like CS101Y1S2 where Y1 is year 1)
    const yearMatch = m.id.match(/Y(\d+)S\d+/i)
    return yearMatch ? yearMatch[1] : "1"
  })))
  
  const semesters = ["1", "2"]
  
  // Filter modules by selected year and semester
  const filteredModules = modules.filter(m => {
    const yearMatch = m.id.match(/Y(\d+)S(\d+)/i)
    const moduleYear = yearMatch ? yearMatch[1] : "1"
    const moduleSemester = yearMatch ? yearMatch[2] : "1"
    
    return moduleYear === selectedYear && moduleSemester === selectedSemester
  })
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Academic Modules</CardTitle>
            <CardDescription>
              Displaying modules for Year {selectedYear}, Semester {selectedSemester}
            </CardDescription>
          </div>
          <Link href="/create-module">
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add Module
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Year</h4>
              <Tabs 
                value={selectedYear} 
                onValueChange={setSelectedYear}
                className="w-[200px]"
              >
                <TabsList className="grid grid-cols-4">
                  {["1", "2", "3", "4"].map(year => (
                    <TabsTrigger key={year} value={year}>
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Semester</h4>
              <Tabs 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
                className="w-[140px]"
              >
                <TabsList className="grid grid-cols-2">
                  {semesters.map(sem => (
                    <TabsTrigger key={sem} value={sem}>
                      {sem}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredModules.length > 0 ? (
              filteredModules.map(module => (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {module.id}
                      </Badge>
                      <Badge>{module.subject}</Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {module.count} questions
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/modules/${module.id}/create`}>
                          <Button size="sm" variant="outline">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </Link>
                        <Link href={`/modules/${module.id}`}>
                          <Button size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground mb-2">No modules found for Year {selectedYear}, Semester {selectedSemester}</p>
                <Link href="/create-module">
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    Create First Module
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
