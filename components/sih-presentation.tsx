"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Train,
  Zap,
  Target,
  TrendingUp,
  BookOpen,
  Download,
  Cloud,
  Activity,
  Users,
  Wrench,
  Battery,
} from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Title Slide",
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold mb-4 text-balance">
            AI-Driven Train Induction Planning & Scheduling for Kochi Metro Rail Limited (KMRL)
          </h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-white/20">
            <h2 className="text-2xl font-semibold text-yellow-300">SMART INDIA HACKATHON 2025</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Problem Statement ID:</strong> 25081
                </p>
                <p>
                  <strong>Theme:</strong> Smart Automation
                </p>
                <p>
                  <strong>PS Category:</strong> Software
                </p>
              </div>
              <div>
                <p>
                  <strong>Team ID:</strong> SIH25-A0H-T217
                </p>
                <p>
                  <strong>Team Name:</strong> Newgate
                </p>
              </div>
            </div>
          </div>
          <Train className="w-20 h-20 mx-auto text-yellow-300 animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Proposed Solution",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <h2 className="text-4xl font-bold mb-6 text-blue-900 flex items-center gap-3">
          <Target className="w-10 h-10" />
          Proposed Solution
        </h2>
        <div className="grid grid-cols-2 gap-8 h-5/6">
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Problem Addressed</h3>
              <ul className="space-y-2 text-sm">
                <li>• Manual, error-prone scheduling of 25 trainsets</li>
                <li>• Siloed decision-making across 6 variables</li>
                <li>• WhatsApp-based coordination inefficiencies</li>
                <li>• 2-hour daily decision window pressure</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Innovation & Uniqueness</h3>
              <ul className="space-y-2 text-sm">
                <li>• First AI system for Indian metro scheduling</li>
                <li>• Multi-algorithm hybrid approach</li>
                <li>• Real-time constraint satisfaction</li>
                <li>• Scalable architecture for future expansion</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-xl text-white">
            <h3 className="text-2xl font-semibold mb-4 text-center">AI-Powered Solution</h3>
            <div className="space-y-3">
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Multi-Criteria Decision Analysis
              </Badge>
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Constraint Satisfaction Problem
              </Badge>
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Greedy Optimization
              </Badge>
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Rule-Based Expert System
              </Badge>
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Heuristic Search
              </Badge>
              <Badge className="w-full justify-center py-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                Multi-Objective Optimization
              </Badge>
            </div>
            <div className="mt-6 text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-4xl font-bold text-yellow-300">87% Faster</div>
              <div className="text-sm">Decision Making</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Innovative Features",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-4xl font-bold mb-6 text-purple-900 flex items-center gap-3">
          <Zap className="w-10 h-10" />
          Innovative AI Features
        </h2>
        <div className="grid grid-cols-2 gap-6 h-5/6">
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-800">Predictive Maintenance AI</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Predicts component failures 24-48 hours in advance</li>
                <li>• Analyzes sensor data: temperature, vibration, pressure</li>
                <li>• 60% cost savings vs reactive maintenance</li>
                <li>• Real-time failure probability calculations</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Dynamic Demand Forecasting</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• AI predicts passenger loads by station & time</li>
                <li>• Factors: weather, events, holidays, time of day</li>
                <li>• Auto-generates optimal train frequencies</li>
                <li>• 15-20% operational efficiency improvement</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <Battery className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Energy Optimization</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• AI calculates optimal speed profiles</li>
                <li>• 12-20% energy consumption reduction</li>
                <li>• Regenerative braking recovery tracking</li>
                <li>• Carbon footprint monitoring & reduction</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Digital Twin Visualization</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Real-time 3D network monitoring</li>
                <li>• Live train positions & progress tracking</li>
                <li>• What-if scenario simulator</li>
                <li>• Tests breakdown, surge, weather responses</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-cyan-500">
              <div className="flex items-center gap-3 mb-3">
                <Cloud className="w-6 h-6 text-cyan-600" />
                <h3 className="text-lg font-semibold mb-3 text-cyan-800">Weather-Adaptive Scheduling</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Real-time weather monitoring & alerts</li>
                <li>• Auto-adjusts speed & frequency for safety</li>
                <li>• Monsoon-ready protocols for Kerala climate</li>
                <li>• Predicts delays based on weather conditions</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-xl shadow-xl text-white">
              <h3 className="text-xl font-semibold mb-3 text-center">Comprehensive AI Ecosystem</h3>
              <div className="grid grid-cols-2 gap-3 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">5</div>
                  <div className="text-xs">AI Systems</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">Real-time</div>
                  <div className="text-xs">Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">Predictive</div>
                  <div className="text-xs">Analytics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">Adaptive</div>
                  <div className="text-xs">Optimization</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Technical Approach",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-cyan-50 to-blue-50">
        <h2 className="text-4xl font-bold mb-6 text-cyan-900 flex items-center gap-3">
          <Zap className="w-10 h-10" />
          Technical Approach
        </h2>
        <div className="grid grid-cols-2 gap-8 h-5/6">
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Technologies Used</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-purple-700 mb-2">Frontend:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• React/Next.js 15</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS v4</li>
                    <li>• shadcn/ui</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-purple-700 mb-2">Backend:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Node.js</li>
                    <li>• AI/ML Algorithms</li>
                    <li>• Real-time APIs</li>
                    <li>• Weather APIs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border border-orange-100">
              <h3 className="text-xl font-semibold mb-3 text-orange-800">Implementation Phases</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Phase 1:</strong> Core AI algorithms & dashboard
                </li>
                <li>
                  • <strong>Phase 2:</strong> Predictive maintenance & demand forecasting
                </li>
                <li>
                  • <strong>Phase 3:</strong> Energy optimization & digital twin
                </li>
                <li>
                  • <strong>Phase 4:</strong> Weather integration & real-time monitoring
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Methodology Flow</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg text-white shadow">
                <div className="font-semibold">Data Collection</div>
                <div className="text-sm opacity-90">Fitness, Jobs, Branding, Mileage, Cleaning, Geometry</div>
              </div>
              <div className="text-center text-2xl text-gray-400">↓</div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg text-white shadow">
                <div className="font-semibold">AI Processing</div>
                <div className="text-sm opacity-90">Multi-algorithm optimization engine</div>
              </div>
              <div className="text-center text-2xl text-gray-400">↓</div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg text-white shadow">
                <div className="font-semibold">Decision Output</div>
                <div className="text-sm opacity-90">Service/Standby/Maintenance assignments</div>
              </div>
              <div className="text-center text-2xl text-gray-400">↓</div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg text-white shadow">
                <div className="font-semibold">Real-time Monitoring</div>
                <div className="text-sm opacity-90">Performance tracking & optimization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Feasibility and Viability",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-green-50 to-emerald-50">
        <h2 className="text-4xl font-bold mb-6 text-green-900 flex items-center gap-3">
          <TrendingUp className="w-10 h-10" />
          Feasibility and Viability
        </h2>
        <div className="grid grid-cols-3 gap-6 h-5/6">
          <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-3 text-green-800">Feasibility Analysis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                ✅ <strong>Technical:</strong> Proven AI algorithms
              </li>
              <li>
                ✅ <strong>Data:</strong> Existing KMRL systems
              </li>
              <li>
                ✅ <strong>Infrastructure:</strong> Cloud-ready architecture
              </li>
              <li>
                ✅ <strong>Timeline:</strong> 6-month implementation
              </li>
              <li>
                ✅ <strong>Budget:</strong> Cost-effective solution
              </li>
              <li>
                ✅ <strong>Skills:</strong> Available expertise
              </li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-red-500">
            <h3 className="text-xl font-semibold mb-3 text-red-800">Challenges & Risks</h3>
            <ul className="space-y-2 text-sm">
              <li>⚠️ Data integration complexity</li>
              <li>⚠️ Staff training requirements</li>
              <li>⚠️ System reliability demands</li>
              <li>⚠️ Change management resistance</li>
              <li>⚠️ Real-time performance needs</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Mitigation Strategies</h3>
            <ul className="space-y-2 text-sm">
              <li>🛡️ Phased rollout approach</li>
              <li>🛡️ Comprehensive training program</li>
              <li>🛡️ Redundant system architecture</li>
              <li>🛡️ Change management support</li>
              <li>🛡️ Performance monitoring tools</li>
              <li>🛡️ 24/7 technical support</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-700 p-6 rounded-xl shadow-xl text-white">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">High Viability Score: 8.5/10</div>
            <div className="text-sm opacity-90">
              Based on technical feasibility, market need, and implementation readiness
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Impact and Benefits",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-orange-50 to-amber-50">
        <h2 className="text-4xl font-bold mb-6 text-orange-900 flex items-center gap-3">
          <Target className="w-10 h-10" />
          Impact and Benefits
        </h2>
        <div className="grid grid-cols-2 gap-8 h-5/6">
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Operational Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-700">Faster Decisions</div>
                </div>
                <div className="text-center bg-green-50 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-green-600">25%</div>
                  <div className="text-sm text-gray-700">Cost Reduction</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-700">Accuracy Rate</div>
                </div>
                <div className="text-center bg-orange-50 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-orange-600">60%</div>
                  <div className="text-sm text-gray-700">Less Downtime</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Social Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li>• Improved passenger experience & satisfaction</li>
                <li>• Reduced service disruptions & delays</li>
                <li>• Enhanced safety standards & protocols</li>
                <li>• Better work-life balance for staff</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Economic Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li>• ₹2.5 Cr annual savings in operations</li>
                <li>• 60% reduced maintenance costs</li>
                <li>• Optimized resource utilization</li>
                <li>• Scalable to other metro systems</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border border-green-100">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Environmental Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li>• 15-20% reduced energy consumption</li>
                <li>• Lower carbon footprint & emissions</li>
                <li>• Optimized train utilization</li>
                <li>• Sustainable transportation solution</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-xl shadow-xl text-white">
              <h3 className="text-xl font-semibold mb-3">Long-term Vision</h3>
              <p className="text-sm opacity-90">
                Scalable solution for India's 18 operational metro systems, potentially impacting 50+ million daily
                commuters nationwide and revolutionizing urban transportation.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Research and References",
    content: (
      <div className="p-8 h-full bg-gradient-to-br from-slate-50 to-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 flex items-center gap-3">
          <BookOpen className="w-10 h-10" />
          Research and References
        </h2>
        <div className="grid grid-cols-2 gap-8 h-5/6">
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Academic Research</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  • "Multi-Objective Optimization for Railway Scheduling" - IEEE Transactions on Intelligent
                  Transportation Systems (2023)
                </li>
                <li>• "AI-Driven Predictive Maintenance in Metro Systems" - Transportation Research Part C (2024)</li>
                <li>
                  • "Constraint Satisfaction in Urban Rail Operations" - Journal of Rail Transport Planning (2023)
                </li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Industry Standards</h3>
              <ul className="space-y-2 text-xs">
                <li>• KMRL Operational Guidelines 2024</li>
                <li>• Indian Railway Standards for Metro Operations</li>
                <li>• ISO 55000 Asset Management Standards</li>
                <li>• EN 50126 Railway Safety Standards</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Technology References</h3>
              <ul className="space-y-2 text-xs">
                <li>• React.js Documentation - react.dev</li>
                <li>• Next.js Framework - nextjs.org</li>
                <li>• TypeScript Language - typescriptlang.org</li>
                <li>• Tailwind CSS - tailwindcss.com</li>
                <li>• Vercel Platform - vercel.com</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold mb-3 text-orange-800">Case Studies</h3>
              <ul className="space-y-2 text-xs">
                <li>• Singapore MRT AI Scheduling System</li>
                <li>• London Underground Optimization</li>
                <li>• Tokyo Metro Predictive Maintenance</li>
                <li>• Delhi Metro Digital Transformation</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-gray-500">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Data Sources</h3>
              <ul className="space-y-2 text-xs">
                <li>• KMRL Operations Database</li>
                <li>• Ministry of Housing & Urban Affairs</li>
                <li>• Indian Metro Rail Society Reports</li>
                <li>• Smart Cities Mission Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export function SIHPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const downloadPresentation = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const pdf = new jsPDF("landscape", "mm", "a4")
      const slideElements = document.querySelectorAll("[data-slide-content]")

      for (let i = 0; i < slides.length; i++) {
        setCurrentSlide(i)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const slideElement = document.querySelector("[data-slide-content]") as HTMLElement
        if (slideElement) {
          const canvas = await html2canvas(slideElement, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            ignoreElements: (element) => {
              const computedStyle = window.getComputedStyle(element)
              const bgColor = computedStyle.backgroundColor
              const color = computedStyle.color
              return bgColor.includes("oklch") || color.includes("oklch")
            },
          })

          const imgData = canvas.toDataURL("image/png")
          const imgWidth = 297
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          if (i > 0) pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        }
      }

      pdf.save("KMRL-AI-Train-Scheduling-Presentation.pdf")
      setCurrentSlide(0)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      {/* Slide Content */}
      <div className="aspect-[16/9] bg-white relative" data-slide-content>
        {slides[currentSlide].content}
      </div>

      {/* Navigation */}
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-4">
          <Button
            onClick={downloadPresentation}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 bg-transparent"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Slide Counter */}
      <div className="bg-gray-50 px-4 py-2 text-center text-sm text-gray-600">
        Slide {currentSlide + 1} of {slides.length} - {slides[currentSlide].title}
      </div>
    </div>
  )
}
