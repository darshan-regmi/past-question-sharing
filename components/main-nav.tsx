"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function MainNav() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("")
  
  useEffect(() => {
    // Set active tab based on current path
    if (pathname === "/") {
      setActiveTab("ratta")
    } else if (pathname.includes("/modules")) {
      setActiveTab("question-bank")
    } else if (pathname.includes("/flashcard")) {
      setActiveTab("flash-cards")
    } else if (pathname.includes("/ai-flashcards")) {
      setActiveTab("ai-flashcards")
    } else if (pathname.includes("/saved")) {
      setActiveTab("saved")
    } else if (pathname.includes("/profile")) {
      setActiveTab("profile")
    }
  }, [pathname])
  
  const navItems = [
    { id: "ratta", label: "Ratta", href: "/" },
    { id: "question-bank", label: "Question Bank", href: "/question-bank" },
    { id: "flash-cards", label: "Flash Cards", href: "/flashcard" },
    { id: "ai-flashcards", label: "AI Flashcards", href: "/ai-flashcards" },
    { id: "saved", label: "Saved", href: "/saved" },
    { id: "profile", label: "Profile", href: "/profile" }
  ]
  
  return (
    <nav className="border-b mb-8">
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "block py-3 text-sm font-medium transition-colors hover:text-primary",
                activeTab === item.id 
                  ? "border-b-2 border-primary text-primary" 
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
