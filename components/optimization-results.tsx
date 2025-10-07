"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, Train, Wrench, Sparkles } from "lucide-react"
import type { OptimizationResult } from "@/lib/ai-optimization-engine"

interface OptimizationResultsProps {
  results: OptimizationResult | null
  isOptimizing: boolean
}

export function OptimizationResults({ results, isOptimizing }: OptimizationResultsProps) {
  if (isOptimizing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-spin" />
            AI Optimization in Progress
          </CardTitle>
          <CardDescription>
            Running multi-criteria decision analysis and constraint satisfaction algorithms...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Progress value={33} className="flex-1" />
              <span className="text-sm text-muted-foreground">Analyzing constraints...</span>
            </div>
            <div className="text-sm text-muted-foreground">
              • Evaluating fitness certificates and clearances
              <br />• Calculating mileage balancing scores
              <br />• Optimizing bay geometry for minimal shunting
              <br />• Applying branding priority weights
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Optimization Results</CardTitle>
          <CardDescription>
            Click "Run AI Optimization" to generate the optimal train induction schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No optimization results available. Run the AI engine to see recommendations.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Optimization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Optimization Complete
          </CardTitle>
          <CardDescription>AI-generated optimal train induction schedule for tonight's operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{results.serviceTrains.length}</div>
              <div className="text-sm text-muted-foreground">Service Trains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{results.standbyTrains.length}</div>
              <div className="text-sm text-muted-foreground">Standby Trains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{results.maintenanceTrains.length}</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{results.executionTime}ms</div>
              <div className="text-sm text-muted-foreground">Execution Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constraint Violations & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.constraintViolations.length > 0 ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              Constraint Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.constraintViolations.length === 0 ? (
              <div className="text-green-600">✅ All constraints satisfied</div>
            ) : (
              <div className="space-y-2">
                {results.constraintViolations.map((violation, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{violation}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="text-sm">
                  {recommendation}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Train Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5 text-green-600" />
              Service Trains ({results.serviceTrains.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.serviceTrains.map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="font-medium">{train.name}</span>
                  <Badge variant="default" className="bg-green-600">
                    Ready
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Standby Trains ({results.standbyTrains.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.standbyTrains.map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="font-medium">{train.name}</span>
                  <Badge variant="secondary">Standby</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-600" />
              Maintenance ({results.maintenanceTrains.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.maintenanceTrains.map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span className="font-medium">{train.name}</span>
                  <Badge variant="destructive">Maintenance</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
