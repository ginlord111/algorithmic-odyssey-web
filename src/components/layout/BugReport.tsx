"use client"
import { useState } from 'react'
import { Bug } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BugReportForm } from './BugReportForm'

export function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
const handleOpen = (open:boolean) => {
    setIsOpen(open)
}
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="fixed right-4 bottom-4 z-50 gap-2"
          aria-label="Report a bug"
        >
          <Bug className="h-4 w-4" />
          Report a Bug
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Report a Bug</SheetTitle>
          <SheetDescription>
            Please provide details about the bug you encountered. We appreciate your feedback!
          </SheetDescription>
        </SheetHeader>
        <BugReportForm  handleOpen={handleOpen}/>
      </SheetContent>
    </Sheet>
  )
}

