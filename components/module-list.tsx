import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Module {
  id: string
  title: string
  count: number
  subject: string
}

interface ModuleListProps {
  modules: Module[]
}

export default function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {modules.map((module) => (
        <Link href={`/modules/${module.id}`} key={module.id}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2">{module.subject}</Badge>
              <CardTitle className="line-clamp-2">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{module.count} flashcards</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Study Now
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

import { Button } from "@/components/ui/button"
