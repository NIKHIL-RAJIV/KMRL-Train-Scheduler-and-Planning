import { SIHPresentation } from "@/components/sih-presentation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KMRL AI Train Scheduling - SIH 2025 Presentation | Team Newgate",
  description:
    "Smart India Hackathon 2025 presentation for AI-Driven Train Induction Planning & Scheduling system for Kochi Metro Rail Limited (KMRL)",
  keywords: ["Smart India Hackathon", "KMRL", "AI", "Train Scheduling", "Metro Rail", "Optimization"],
}

export default function PresentationPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <SIHPresentation />
    </main>
  )
}
