"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingDown, Leaf, DollarSign, Battery, Route, Gauge } from "lucide-react"
import {
  EnergyOptimizationEngine,
  type EnergyProfile,
  type RouteEnergyData,
  type EnergyMetrics,
} from "@/lib/energy-optimization-engine"

export function EnergyOptimizationDashboard() {
  const [energyProfiles, setEnergyProfiles] = useState<EnergyProfile[]>([])
  const [routeData, setRouteData] = useState<RouteEnergyData[]>([])
  const [metrics, setMetrics] = useState<EnergyMetrics | null>(null)
  const [projections, setProjections] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const engine = new EnergyOptimizationEngine()
      const profiles = await engine.analyzeFleetEnergy()
      const routes = await engine.analyzeRouteEnergy()
      const energyMetrics = await engine.getEnergyMetrics()
      const monthlyProjections = await engine.getMonthlyProjections()

      setEnergyProfiles(profiles)
      setRouteData(routes)
      setMetrics(energyMetrics)
      setProjections(monthlyProjections)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getSpeedProfileColor = (profile: string) => {
    switch (profile) {
      case "Eco Mode":
        return "bg-green-500 text-white"
      case "Balanced":
        return "bg-blue-500 text-white"
      case "Performance":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Zap className="h-8 w-8 animate-pulse text-yellow-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Consumption</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalConsumption.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kWh per day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics?.totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kWh saved daily</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.avgEfficiency}%</div>
            <Progress value={metrics?.avgEfficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduction</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.carbonReduction.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kg CO₂ saved daily</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{metrics?.costSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Daily savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regenerative</CardTitle>
            <Battery className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.regenerativeEnergy.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kWh recovered</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Projections */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Monthly Environmental Impact
          </CardTitle>
          <CardDescription>Projected savings and carbon reduction over 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{projections?.energySavings.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">kWh Saved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">₹{projections?.costSavings.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">Cost Savings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{projections?.carbonReduction.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">kg CO₂ Reduced</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{projections?.treesEquivalent}</div>
              <p className="text-sm text-muted-foreground mt-1">Trees Equivalent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Energy Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Route Energy Optimization
          </CardTitle>
          <CardDescription>AI-optimized speed profiles for maximum energy efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routeData.map((route, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Badge className={getSpeedProfileColor(route.speedProfile)}>{route.speedProfile}</Badge>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{route.route}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{route.distance} km</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Current: {route.currentEnergy} kWh</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-green-600 font-semibold">Optimized: {route.optimizedEnergy} kWh</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{route.savingsPercentage}%</div>
                  <p className="text-xs text-muted-foreground">Energy saved</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fleet Energy Profiles */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Energy Performance</CardTitle>
          <CardDescription>Individual train energy consumption and optimization metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {energyProfiles.map((profile, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center min-w-[80px]">
                    <span className="font-semibold">{profile.trainId}</span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current: {profile.currentConsumption} kWh</span>
                      <span className="text-green-600 font-semibold">
                        Optimized: {profile.optimizedConsumption} kWh
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={profile.efficiency} className="h-2" />
                      </div>
                      <span className="text-sm font-semibold">{profile.efficiency}% efficient</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{profile.savings}</div>
                    <p className="text-xs text-muted-foreground">kWh saved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{profile.regenerativeBraking}</div>
                    <p className="text-xs text-muted-foreground">kWh recovered</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{profile.carbonFootprint}</div>
                    <p className="text-xs text-muted-foreground">kg CO₂</p>
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
