import { ProcessFlowArchitecture } from "@/components/process-flow-architecture"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Process Flow Architecture - KMRL AI Train Scheduler",
  description: "Comprehensive process flow architecture diagram for AI-driven train induction planning system",
}

export default function ArchitecturePage() {
  return <ProcessFlowArchitecture />
}
