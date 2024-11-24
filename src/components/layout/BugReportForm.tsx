"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function BugReportForm({
  handleOpen,
}: {
  handleOpen: (open: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bugTitle, setBugTitle] = useState<string>("");
  const [bugDescription, setBugDescription] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const submitBugReport = await fetch("/api/bug-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bugTitle, description: bugDescription }),
    });
    if (submitBugReport.ok) {
      toast.success("Bug report submitted successfully!");
      setIsSubmitting(false);
      handleOpen(false);
    } else {
      toast.error(
        "An error occurred while submitting the bug report. Please try again."
      );
      setIsSubmitting(false);
      handleOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="title">Bug Title</Label>
        <Input
          id="title"
          placeholder="Brief description of the bug"
          required
          value={bugTitle}
          onChange={(e) => setBugTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please provide more details about the bug"
          value={bugDescription}
          onChange={(e) => setBugDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Bug Report"}
      </Button>
    </form>
  );
}
