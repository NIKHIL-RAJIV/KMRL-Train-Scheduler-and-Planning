"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface SystemMetricsProps {
  metrics: {
    fleetAvailability: number
    punctualityKPI: number
    maintenanceCost: number
    brandingCompliance: number
  }
}

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  const performanceData = [
    { month: "Jan", availability: 91.2, punctuality: 98.8, cost: 18.5 },
    { month: "Feb", availability: 92.1, punctuality: 99.1, cost: 17.2 },
    { month: "Mar", availability: 91.8, punctuality: 98.9, cost: 16.8 },
    { month: "Apr", availability: 92.5, punctuality: 99.2, cost: 15.8 },
    { month: "May", availability: 93.1, punctuality: 99.4, cost: 15.2 },
    { month: "Jun", availability: 92.8, punctuality: 99.3, cost: 15.5 },
  ]

  const aiImpactData = [
    { metric: "Decision Time", before: 120, after: 15 },
    { metric: "Accuracy", before: 75, after: 94 },
    { metric: "Cost Reduction", before: 100, after: 68 },
    { metric: "Efficiency", before: 82, after: 96 },
  ]

  return (
    <div className="space-y-6">
      {/* Current Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Fleet Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.fleetAvailability}%</div>
            <Progress value={metrics.fleetAvailability} className="mb-2" />
            <p className="text-xs text-muted-foreground">Target: 90%+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Punctuality KPI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.punctualityKPI}%</div>
            <Progress value={metrics.punctualityKPI} className="mb-2" />
            <p className="text-xs text-muted-foreground">Target: 99.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">₹{metrics.maintenanceCost}L</div>
            <Progress value={100 - (metrics.maintenanceCost / 25) * 100} className="mb-2" />
            <p className="text-xs text-muted-foreground">25% reduction vs manual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Branding SLA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.brandingCompliance}%</div>
            <Progress value={metrics.brandingCompliance} className="mb-2" />
            <p className="text-xs text-muted-foreground">Contract compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends (6 Months)</CardTitle>
          <CardDescription>Key metrics showing improvement since AI implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="availability"
                stroke="#2563eb"
                strokeWidth={2}
                name="Fleet Availability (%)"
              />
              <Line type="monotone" dataKey="punctuality" stroke="#16a34a" strokeWidth={2} name="Punctuality (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>AI Implementation Impact</CardTitle>
          <CardDescription>Before vs After AI-driven optimization (normalized scores)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiImpactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="before" fill="#ef4444" name="Before AI" />
              <Bar dataKey="after" fill="#22c55e" name="After AI" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>AI System Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Operational Improvements</h4>
              <ul className="text-sm space-y-1">
                <li>• 87% reduction in decision time (120min → 15min)</li>
                <li>• 25% improvement in scheduling accuracy</li>
                <li>• 32% reduction in maintenance costs</li>
                <li>• 15% improvement in fleet utilization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Strategic Advantages</h4>
              <ul className="text-sm space-y-1">
                <li>• Scalable to 40+ trainsets by 2027</li>
                <li>• Auditable decision-making process</li>
                <li>• Reduced cognitive load on operators</li>
                <li>• Proactive maintenance scheduling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
