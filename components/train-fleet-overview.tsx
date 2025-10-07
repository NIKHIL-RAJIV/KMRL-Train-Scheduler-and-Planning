"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Wrench } from "lucide-react"
import type { TrainData } from "@/lib/ai-optimization-engine"

export function TrainFleetOverview() {
  const [trains, setTrains] = useState<TrainData[]>([])

  useEffect(() => {
    // Generate mock data for demonstration
    const mockTrains: TrainData[] = []
    for (let i = 1; i <= 25; i++) {
      mockTrains.push({
        id: `KMRL-${i.toString().padStart(3, "0")}`,
        name: `Train Set ${i}`,
        currentBay: Math.floor(Math.random() * 8) + 1,
        fitnessScore: Math.floor(Math.random() * 20) + 5,
        jobCardStatus: Math.random() > 0.3 ? "closed" : "open",
        brandingPriority: Math.floor(Math.random() * 5) + 1,
        mileage: Math.floor(Math.random() * 20000) + 40000,
        cleaningRequired: Math.random() > 0.7,
        telcomClearance: Math.random() > 0.1,
        rollingStockClearance: Math.random() > 0.05,
        signallingClearance: Math.random() > 0.05,
      })
    }
    setTrains(mockTrains)
  }, [])

  const getStatusBadge = (train: TrainData) => {
    if (!train.telcomClearance || !train.rollingStockClearance || !train.signallingClearance) {
      return <Badge className="bg-red-600 text-white border-transparent hover:bg-red-700">Maintenance Required</Badge>
    }
    if (train.jobCardStatus === "open") {
      return <Badge variant="secondary">Standby</Badge>
    }
    return (
      <Badge variant="default" className="bg-green-600 text-white">
        Service Ready
      </Badge>
    )
  }

  const getClearanceStatus = (train: TrainData) => {
    const clearances = [
      { name: "Telecom", status: train.telcomClearance },
      { name: "Rolling Stock", status: train.rollingStockClearance },
      { name: "Signalling", status: train.signallingClearance },
    ]

    return (
      <div className="flex gap-1">
        {clearances.map((clearance) => (
          <div key={clearance.name} className="flex items-center gap-1">
            {clearance.status ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-red-600" />
            )}
            <span className="text-xs">{clearance.name}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Fleet Status Overview</CardTitle>
          <CardDescription>
            Real-time status of all 25 KMRL trainsets with AI-driven readiness assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trains.map((train) => (
              <Card key={train.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{train.name}</h4>
                  {getStatusBadge(train)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bay Position:</span>
                    <span className="font-medium">Bay {train.currentBay}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Fitness Score:</span>
                    <span className="font-medium">{train.fitnessScore}/25</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mileage:</span>
                    <span className="font-medium">{train.mileage.toLocaleString()} km</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Branding Priority:</span>
                    <span className="font-medium">Level {train.brandingPriority}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground mb-1">Clearance Status:</div>
                    {getClearanceStatus(train)}
                  </div>

                  {train.cleaningRequired && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <Wrench className="h-3 w-3" />
                      <span className="text-xs">Cleaning Required</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
