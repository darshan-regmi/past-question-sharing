import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, User } from "lucide-react"

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mb-8">
      <Link href="/">
        <Button variant="ghost" className="flex items-center">
          <Home className="h-4 w-4 mr-2" />
          <span>Home</span>
        </Button>
      </Link>
      <Link href="/modules">
        <Button variant="ghost" className="flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Modules</span>
        </Button>
      </Link>
      <Link href="/profile">
        <Button variant="ghost" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </Button>
      </Link>
    </nav>
  )
}
