"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProcessFlowArchitecture() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">PROCESS FLOW ARCHITECTURE</h1>
          <p className="text-xl text-gray-700 mb-2">AI-Driven Train Induction Planning & Scheduling</p>
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">KMRL - Smart India Hackathon 2025</Badge>
        </div>

        <div className="relative bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
          {/* Start Node */}
          <div className="flex justify-center mb-8">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
              START: Daily Planning Window (21:00 - 23:00)
            </div>
          </div>

          {/* Vertical Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-1 h-8 bg-gray-400"></div>
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400 mt-8"></div>
          </div>

          {/* Data Collection Phase */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 text-center mb-4">DATA COLLECTION & VALIDATION</h3>
            <div className="grid grid-cols-6 gap-3">
              {[
                { name: "Fitness Certificates", color: "bg-green-400", icon: "✓" },
                { name: "Job Cards Status", color: "bg-blue-400", icon: "📋" },
                { name: "Branding Priority", color: "bg-purple-400", icon: "🎨" },
                { name: "Mileage Balance", color: "bg-orange-400", icon: "⚖️" },
                { name: "Cleaning Slots", color: "bg-cyan-400", icon: "🧽" },
                { name: "Stabling Geometry", color: "bg-pink-400", icon: "📐" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`${item.color} w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xl shadow-md`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-1 h-8 bg-gray-400"></div>
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400 mt-8"></div>
          </div>

          {/* AI Processing Engine */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 mb-8 text-white shadow-lg">
            <h3 className="text-xl font-bold text-center mb-6">AI OPTIMIZATION ENGINE</h3>

            <div className="grid grid-cols-3 gap-6">
              {/* Input Processing */}
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center">Input Processing</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded p-2">• Data Validation</div>
                  <div className="bg-white/20 rounded p-2">• Constraint Mapping</div>
                  <div className="bg-white/20 rounded p-2">• Priority Weighting</div>
                </div>
              </div>

              {/* Core Algorithms */}
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center">Core AI Algorithms</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded p-2">• MCDA Scoring</div>
                  <div className="bg-white/20 rounded p-2">• CSP Solver</div>
                  <div className="bg-white/20 rounded p-2">• Greedy Optimization</div>
                  <div className="bg-white/20 rounded p-2">• Rule-Based Logic</div>
                </div>
              </div>

              {/* Output Generation */}
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center">Decision Making</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded p-2">• Multi-Objective Opt.</div>
                  <div className="bg-white/20 rounded p-2">• Conflict Resolution</div>
                  <div className="bg-white/20 rounded p-2">• Assignment Logic</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Diamond */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-40 h-40 bg-yellow-400 transform rotate-45 flex items-center justify-center shadow-lg">
                <div className="transform -rotate-45 text-center font-bold text-gray-800">
                  <div className="text-sm">Constraints</div>
                  <div className="text-sm">Satisfied?</div>
                </div>
              </div>
              {/* Decision paths */}
              <div className="absolute -right-24 top-16 flex items-center">
                <div className="w-16 h-1 bg-green-500"></div>
                <div className="w-0 h-0 border-l-4 border-t-2 border-b-2 border-l-green-500 border-t-transparent border-b-transparent"></div>
                <span className="ml-2 text-green-600 font-bold">YES</span>
              </div>
              <div className="absolute -left-24 top-16 flex items-center">
                <span className="mr-2 text-red-600 font-bold">NO</span>
                <div className="w-0 h-0 border-r-4 border-t-2 border-b-2 border-r-red-500 border-t-transparent border-b-transparent"></div>
                <div className="w-16 h-1 bg-red-500"></div>
              </div>
            </div>
          </div>

          {/* Final Assignments */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="bg-green-100 border-2 border-green-300 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  🚇
                </div>
                <h4 className="font-bold text-green-800 mb-2">SERVICE</h4>
                <p className="text-sm text-gray-700">Active passenger service</p>
                <div className="mt-3 text-xs bg-green-200 rounded p-2">Peak hour optimization</div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100 border-2 border-yellow-300 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  ⏸️
                </div>
                <h4 className="font-bold text-yellow-800 mb-2">STANDBY</h4>
                <p className="text-sm text-gray-700">Ready for deployment</p>
                <div className="mt-3 text-xs bg-yellow-200 rounded p-2">Contingency reserve</div>
              </CardContent>
            </Card>

            <Card className="bg-red-100 border-2 border-red-300 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  🔧
                </div>
                <h4 className="font-bold text-red-800 mb-2">MAINTENANCE</h4>
                <p className="text-sm text-gray-700">Scheduled maintenance</p>
                <div className="mt-3 text-xs bg-red-200 rounded p-2">Preventive care</div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Loop */}
          <div className="bg-gray-100 rounded-xl p-6 border-2 border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  📊
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Performance Monitoring</div>
                  <div className="text-sm text-gray-600">Real-time metrics & feedback</div>
                </div>
              </div>

              <div className="flex-1 mx-8">
                <div className="border-t-2 border-dashed border-gray-400 relative">
                  <div className="absolute left-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-400"></div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold text-gray-800 text-right">Continuous Learning</div>
                  <div className="text-sm text-gray-600 text-right">Algorithm refinement</div>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  🧠
                </div>
              </div>
            </div>
          </div>

          {/* End Node */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              END: Optimized Train Schedule Generated
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-gray-700">Decision Time Reduction</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-600">25%</div>
            <div className="text-sm text-gray-700">Operational Cost Savings</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">99.2%</div>
            <div className="text-sm text-gray-700">Constraint Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
