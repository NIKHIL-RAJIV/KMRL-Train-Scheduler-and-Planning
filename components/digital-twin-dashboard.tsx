"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Train,
  MapPin,
  Activity,
  Users,
  Gauge,
  Clock,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
  Radio,
} from "lucide-react"
import {
  DigitalTwinEngine,
  type TrainPosition,
  type StationStatus,
  type NetworkMetrics,
} from "@/lib/digital-twin-engine"

export function DigitalTwinDashboard() {
  const [trainPositions, setTrainPositions] = useState<TrainPosition[]>([])
  const [stationStatus, setStationStatus] = useState<StationStatus[]>([])
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics | null>(null)
  const [simulation, setSimulation] = useState<any>(null)
  const [isLive, setIsLive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const engine = new DigitalTwinEngine()
      const trains = await engine.getTrainPositions()
      const stations = await engine.getStationStatus()
      const metrics = await engine.getNetworkMetrics()

      setTrainPositions(trains)
      setStationStatus(stations)
      setNetworkMetrics(metrics)
      setIsLoading(false)
    }

    loadData()

    // Simulate live updates every 3 seconds
    const interval = setInterval(() => {
      if (isLive) {
        loadData()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const runSimulation = async (scenario: "normal" | "breakdown" | "event-surge" | "weather-delay") => {
    const engine = new DigitalTwinEngine()
    const result = await engine.simulateScenario(scenario)
    setSimulation(result)
    setIsLive(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500 text-white"
      case "delayed":
        return "bg-red-500 text-white"
      case "early":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPlatformColor = (status: string) => {
    switch (status) {
      case "clear":
        return "bg-green-500 text-white"
      case "occupied":
        return "bg-yellow-500 text-black"
      case "boarding":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="h-8 w-8 animate-pulse text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isLive ? (
              <>
                <Radio className="h-5 w-5 text-red-500 animate-pulse" />
                <span className="font-semibold text-red-500">LIVE</span>
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-blue-500">SIMULATION MODE</span>
              </>
            )}
          </div>
          <span className="text-sm text-muted-foreground">Real-time network monitoring</span>
        </div>
        <Button onClick={() => setIsLive(!isLive)} variant={isLive ? "destructive" : "default"}>
          {isLive ? "Pause Live Feed" : "Resume Live Feed"}
        </Button>
      </div>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
            <Train className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics?.activeTrains}</div>
            <p className="text-xs text-muted-foreground">Operating now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics?.totalPassengers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Speed</CardTitle>
            <Gauge className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics?.avgSpeed}</div>
            <p className="text-xs text-muted-foreground">km/h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics?.onTimePerformance}%</div>
            <Progress value={networkMetrics?.onTimePerformance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Load</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics?.networkLoad}%</div>
            <Progress value={networkMetrics?.networkLoad} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>What-If Scenario Simulator</CardTitle>
          <CardDescription>Test network response to various operational scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => runSimulation("breakdown")} variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Train Breakdown
            </Button>
            <Button onClick={() => runSimulation("event-surge")} variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Event Surge
            </Button>
            <Button onClick={() => runSimulation("weather-delay")} variant="outline" className="gap-2">
              <Activity className="h-4 w-4" />
              Weather Delay
            </Button>
            <Button onClick={() => runSimulation("normal")} variant="outline" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Normal Operations
            </Button>
          </div>

          {simulation && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-lg mb-2">{simulation.scenario}</h4>
              <p className="text-sm text-muted-foreground mb-3">{simulation.impact}</p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded border">
                <p className="text-sm font-semibold mb-1">AI Recommendation:</p>
                <p className="text-sm">{simulation.recommendation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Train Positions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="h-5 w-5" />
            Live Train Positions
          </CardTitle>
          <CardDescription>Real-time location and status of all active trains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trainPositions.map((train, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Badge className={getStatusColor(train.status)}>{train.status.toUpperCase()}</Badge>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{train.trainId}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm">{train.speed} km/h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {train.currentStation} → {train.nextStation}
                      </span>
                    </div>
                    <Progress value={train.progress} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{train.passengers}</div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                  </div>
                  {train.delay > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">+{train.delay}</div>
                      <p className="text-xs text-muted-foreground">min delay</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Station Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Station Status Overview
          </CardTitle>
          <CardDescription>Real-time platform status and passenger waiting counts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stationStatus.slice(0, 12).map((station, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{station.name}</span>
                  <Badge className={getPlatformColor(station.platformStatus)} variant="secondary">
                    {station.platformStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{station.waitingPassengers} waiting</span>
                  <span>Next: {station.nextArrival}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
