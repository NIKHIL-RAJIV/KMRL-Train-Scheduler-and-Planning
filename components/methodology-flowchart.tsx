"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Cog, CheckCircle } from "lucide-react"

export function MethodologyFlowchart() {
  return (
    <div className="space-y-6">
      {/* Methodology Overview */}
      <Card>
        <CardHeader>
          <CardTitle>AI Implementation Methodology</CardTitle>
          <CardDescription>
            Multi-phase approach combining proven AI techniques for optimal train scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Phase 1: Data Integration</h3>
              <p className="text-sm text-muted-foreground">
                Consolidate siloed data sources into unified decision platform
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Phase 2: AI Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Apply multi-criteria decision analysis and constraint solving
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Cog className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Phase 3: Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">Machine learning feedback loops for improved accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed AI Techniques */}
      <Card>
        <CardHeader>
          <CardTitle>AI Techniques Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* MCDA */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-blue-600">
                  Core AI
                </Badge>
                <h4 className="font-semibold">Multi-Criteria Decision Analysis (MCDA)</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Weighted scoring for 6 competing objectives
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Implementation:</strong> Normalized weights learned from operational data
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  weights = {"{"}
                  <br />
                  &nbsp;&nbsp;fitness: 0.25, // Safety first
                  <br />
                  &nbsp;&nbsp;jobCard: 0.20, // Readiness
                  <br />
                  &nbsp;&nbsp;branding: 0.15, // Revenue
                  <br />
                  &nbsp;&nbsp;mileage: 0.15, // Asset life
                  <br />
                  &nbsp;&nbsp;cleaning: 0.10, // Quality
                  <br />
                  &nbsp;&nbsp;geometry: 0.15 // Efficiency
                  <br />
                  {"}"}
                </div>
              </div>
            </div>

            {/* CSP */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-green-600">
                  Constraint AI
                </Badge>
                <h4 className="font-semibold">Constraint Satisfaction Problem (CSP) Solver</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Enforce hard operational constraints
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Algorithm:</strong> Backtracking with constraint propagation
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  constraints = {"{"}
                  <br />
                  &nbsp;&nbsp;minServiceTrains: 18,
                  <br />
                  &nbsp;&nbsp;maxServiceTrains: 22,
                  <br />
                  &nbsp;&nbsp;maxMaintenanceSlots: 6,
                  <br />
                  &nbsp;&nbsp;maxCleaningSlots: 4
                  <br />
                  {"}"}
                </div>
              </div>
            </div>

            {/* Greedy Optimization */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-orange-600">
                  Speed AI
                </Badge>
                <h4 className="font-semibold">Greedy Optimization Algorithm</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Fast decisions in 21:00-23:00 window
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Strategy:</strong> Locally optimal choices with global validation
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  scoredTrains.sort((a, b) =&gt;
                  <br />
                  &nbsp;&nbsp;b.totalScore - a.totalScore
                  <br />
                  );
                  <br />
                  for (const train of scoredTrains) {"{"}
                  <br />
                  &nbsp;&nbsp;assignOptimalSlot(train);
                  <br />
                  {"}"}
                </div>
              </div>
            </div>

            {/* Rule-Based System */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-red-600">
                  Safety AI
                </Badge>
                <h4 className="font-semibold">Rule-Based Expert System</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Safety-critical decision enforcement
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Logic:</strong> Deterministic if-then rules for compliance
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  if (!train.telcomClearance ||
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;!train.rollingStockClearance) {"{"}
                  <br />
                  &nbsp;&nbsp;forceMaintenanceAssignment(train);
                  <br />
                  &nbsp;&nbsp;logSafetyViolation();
                  <br />
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
          <CardDescription>Scalable deployment strategy for KMRL expansion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="flex-1">
                <h4 className="font-semibold">Phase 1: Core AI Engine (Current)</h4>
                <p className="text-sm text-muted-foreground">MCDA, CSP, Greedy optimization for 25 trainsets</p>
              </div>
              <Badge variant="default" className="bg-green-600">
                Complete
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Phase 2: Predictive Analytics (Q2 2025)</h4>
                <p className="text-sm text-muted-foreground">Time series analysis for maintenance forecasting</p>
              </div>
              <Badge variant="secondary">Planned</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Phase 3: Reinforcement Learning (Q4 2025)</h4>
                <p className="text-sm text-muted-foreground">Continuous improvement through operational feedback</p>
              </div>
              <Badge variant="secondary">Future</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Phase 4: Multi-Depot Scaling (2027)</h4>
                <p className="text-sm text-muted-foreground">
                  Distributed optimization for 40+ trainsets across 2 depots
                </p>
              </div>
              <Badge variant="secondary">Roadmap</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
