"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle2, Clock, TrendingDown, Wrench, Activity } from "lucide-react"
import { PredictiveMaintenanceEngine, type MaintenanceAlert } from "@/lib/predictive-maintenance-engine"

export function PredictiveMaintenanceDashboard() {
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([])
  const [impact, setImpact] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const engine = new PredictiveMaintenanceEngine()
      const maintenanceAlerts = await engine.analyzeFleet()
      const maintenanceImpact = await engine.getMaintenanceImpact()

      setAlerts(maintenanceAlerts)
      setImpact(maintenanceImpact)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impact.totalAlerts}</div>
            <p className="text-xs text-muted-foreground">Active predictions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{impact.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impact.fleetHealthScore}%</div>
            <Progress value={impact.fleetHealthScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{(impact.estimatedSavings / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">vs reactive maintenance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prevented Failures</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impact.preventedBreakdowns}</div>
            <p className="text-xs text-muted-foreground">Breakdowns avoided</p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Predictive Maintenance Alerts
          </CardTitle>
          <CardDescription>AI-powered failure predictions based on real-time sensor data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                    <span className="text-xs text-muted-foreground">{alert.failureProbability}%</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{alert.trainId}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm">{alert.component}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{alert.predictedFailureTime}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">₹{(alert.estimatedCost / 1000).toFixed(0)}K</span>
                    <span className="text-xs text-muted-foreground">Est. cost</span>
                  </div>
                  <div className="w-24">
                    <div className="text-xs text-muted-foreground mb-1">Health: {alert.currentHealth}%</div>
                    <Progress value={alert.currentHealth} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
