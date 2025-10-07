"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Train, Wrench, Sparkles, Zap, Users, Activity, Cloud } from "lucide-react"
import { AIOptimizationEngine } from "@/lib/ai-optimization-engine"
import { TrainFleetOverview } from "@/components/train-fleet-overview"
import { OptimizationResults } from "@/components/optimization-results"
import { SystemMetrics } from "@/components/system-metrics"
import { MethodologyFlowchart } from "@/components/methodology-flowchart"
import { PredictiveMaintenanceDashboard } from "@/components/predictive-maintenance-dashboard"
import { DemandForecastingDashboard } from "@/components/demand-forecasting-dashboard"
import { EnergyOptimizationDashboard } from "@/components/energy-optimization-dashboard"
import { DigitalTwinDashboard } from "@/components/digital-twin-dashboard"
import { WeatherAdaptiveDashboard } from "@/components/weather-adaptive-dashboard"

export function TrainSchedulingDashboard() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState(null)
  const [systemMetrics, setSystemMetrics] = useState({
    fleetAvailability: 92.5,
    punctualityKPI: 99.2,
    maintenanceCost: 15.8,
    brandingCompliance: 98.1,
  })

  const handleOptimization = async () => {
    setIsOptimizing(true)

    // Simulate AI optimization process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const engine = new AIOptimizationEngine()
    const results = await engine.optimizeTrainInduction()

    setOptimizationResults(results)
    setIsOptimizing(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">KMRL AI Train Induction System</h1>
          <p className="text-muted-foreground text-pretty">
            Intelligent scheduling and optimization for Kochi Metro Rail operations
          </p>
        </div>
        <Button onClick={handleOptimization} disabled={isOptimizing} className="bg-blue-600 hover:bg-blue-700">
          {isOptimizing ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Run AI Optimization
            </>
          )}
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Availability</CardTitle>
            <Train className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.fleetAvailability}%</div>
            <Progress value={systemMetrics.fleetAvailability} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Punctuality KPI</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.punctualityKPI}%</div>
            <Progress value={systemMetrics.punctualityKPI} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Cost</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{systemMetrics.maintenanceCost}L</div>
            <p className="text-xs text-muted-foreground">Monthly average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branding Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.brandingCompliance}%</div>
            <Progress value={systemMetrics.brandingCompliance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="methodology">Methodology</TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-1">
            <Wrench className="h-3 w-3" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="demand" className="gap-1">
            <Users className="h-3 w-3" />
            Demand
          </TabsTrigger>
          <TabsTrigger value="energy" className="gap-1">
            <Zap className="h-3 w-3" />
            Energy
          </TabsTrigger>
          <TabsTrigger value="digital-twin" className="gap-1">
            <Activity className="h-3 w-3" />
            Live Twin
          </TabsTrigger>
          <TabsTrigger value="weather" className="gap-1">
            <Cloud className="h-3 w-3" />
            Weather
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <TrainFleetOverview />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <OptimizationResults results={optimizationResults} isOptimizing={isOptimizing} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <SystemMetrics metrics={systemMetrics} />
        </TabsContent>

        <TabsContent value="methodology" className="space-y-4">
          <MethodologyFlowchart />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <PredictiveMaintenanceDashboard />
        </TabsContent>

        <TabsContent value="demand" className="space-y-4">
          <DemandForecastingDashboard />
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <EnergyOptimizationDashboard />
        </TabsContent>

        <TabsContent value="digital-twin" className="space-y-4">
          <DigitalTwinDashboard />
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <WeatherAdaptiveDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
