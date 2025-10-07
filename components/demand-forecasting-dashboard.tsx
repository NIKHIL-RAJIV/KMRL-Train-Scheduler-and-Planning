"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Calendar,
  Cloud,
  Thermometer,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react"
import {
  DemandForecastingEngine,
  type PassengerDemand,
  type ScheduleRecommendation,
} from "@/lib/demand-forecasting-engine"

export function DemandForecastingDashboard() {
  const [stationDemand, setStationDemand] = useState<PassengerDemand[]>([])
  const [recommendations, setRecommendations] = useState<ScheduleRecommendation[]>([])
  const [insights, setInsights] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const engine = new DemandForecastingEngine()
      const demand = await engine.forecastStationDemand()
      const scheduleRecs = await engine.generateScheduleRecommendations()
      const demandInsights = await engine.getDemandInsights()

      setStationDemand(demand)
      setRecommendations(scheduleRecs)
      setInsights(demandInsights)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Users className="h-8 w-8 animate-pulse text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demand Factors */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Current Demand Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Day</p>
                <p className="font-semibold">{insights.factors.dayOfWeek}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Weather</p>
                <p className="font-semibold">{insights.factors.weather}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold">{insights.factors.temperature.toFixed(1)}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Events</p>
                <p className="font-semibold">{insights.factors.events.length || "None"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={insights.factors.holiday ? "destructive" : "secondary"}>
                {insights.factors.holiday ? "Holiday" : "Regular Day"}
              </Badge>
            </div>
          </div>
          {insights.factors.events.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm font-medium">Active Events:</p>
              <ul className="text-sm text-muted-foreground mt-1">
                {insights.factors.events.map((event: string, i: number) => (
                  <li key={i}>• {event}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Load</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalCurrentPassengers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Passengers across network</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Load</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalPredictedPassengers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Next hour forecast</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.avgConfidence}%</div>
            <Progress value={insights.avgConfidence} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Changes</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.highImpactChanges}</div>
            <p className="text-xs text-muted-foreground">High priority adjustments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.optimizationPotential}%</div>
            <p className="text-xs text-muted-foreground">Efficiency potential</p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Schedule Recommendations</CardTitle>
          <CardDescription>AI-optimized train frequency based on predicted passenger demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Badge className={getImpactColor(rec.impact)}>{rec.impact.toUpperCase()}</Badge>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{rec.timeSlot}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{rec.expectedPassengers} passengers</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-lg font-bold">{rec.currentFrequency}/hr</p>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Recommended</p>
                    <p className="text-lg font-bold text-blue-600">{rec.recommendedFrequency}/hr</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Station Demand Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Station-wise Demand Forecast</CardTitle>
          <CardDescription>Real-time passenger load predictions across all stations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stationDemand.slice(0, 12).map((station, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{station.stationName}</span>
                  {getTrendIcon(station.trend)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Current: {station.currentLoad}</span>
                  <span>Predicted: {station.predictedLoad}</span>
                </div>
                <Progress value={(station.currentLoad / 500) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Peak: {station.peakTime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
