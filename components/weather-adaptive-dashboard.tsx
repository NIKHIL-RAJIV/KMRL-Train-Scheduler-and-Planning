"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Sun,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Gauge,
  TrendingDown,
  Shield,
} from "lucide-react"
import { WeatherEngine, type WeatherData, type WeatherImpact } from "@/lib/weather-engine"

export function WeatherAdaptiveDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [impact, setImpact] = useState<WeatherImpact | null>(null)
  const [adaptiveSchedule, setAdaptiveSchedule] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWeatherData = async () => {
      const engine = new WeatherEngine()
      const weatherData = await engine.getCurrentWeather()
      const weatherImpact = await engine.calculateWeatherImpact(weatherData)
      const schedule = await engine.getAdaptiveSchedule(weatherData)

      setWeather(weatherData)
      setImpact(weatherImpact)
      setAdaptiveSchedule(schedule)
      setLoading(false)
    }

    loadWeatherData()
    const interval = setInterval(loadWeatherData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Partly Cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "Cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "Rainy":
        return <CloudDrizzle className="h-8 w-8 text-blue-500" />
      case "Heavy Rain":
        return <CloudRain className="h-8 w-8 text-blue-700" />
      case "Fog":
        return <CloudFog className="h-8 w-8 text-gray-400" />
      case "Thunderstorm":
        return <CloudLightning className="h-8 w-8 text-purple-600" />
      default:
        return <Cloud className="h-8 w-8" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500"
      case "cautious":
        return "bg-yellow-500"
      case "restricted":
        return "bg-orange-500"
      case "suspended":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4" />
      case "cautious":
        return <AlertTriangle className="h-4 w-4" />
      case "restricted":
        return <AlertTriangle className="h-4 w-4" />
      case "suspended":
        return <XCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (loading || !weather || !impact) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Cloud className="h-12 w-12 animate-pulse mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getWeatherIcon(weather.condition)}
              <div>
                <div className="text-2xl">{weather.condition}</div>
                <div className="text-sm font-normal text-muted-foreground">Current Weather Conditions</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">{weather.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{weather.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
                  <div className="text-xs text-muted-foreground">Wind Speed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{weather.visibility}m</div>
                  <div className="text-xs text-muted-foreground">Visibility</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Operational Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(impact.operationalStatus)}`} />
                <span className="text-lg font-semibold capitalize">{impact.operationalStatus}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Speed Reduction</span>
                  <span className="font-semibold text-orange-600">{impact.speedReduction}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Delay</span>
                  <span className="font-semibold text-red-600">{impact.delayPrediction} min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rainfall Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CloudRain className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="text-3xl font-bold">{weather.rainfall}</div>
                  <div className="text-xs text-muted-foreground">mm/hour</div>
                </div>
              </div>
              <Progress value={Math.min(100, (weather.rainfall / 150) * 100)} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {weather.rainfall > 100
                  ? "Extreme rainfall"
                  : weather.rainfall > 50
                    ? "Heavy rainfall"
                    : weather.rainfall > 20
                      ? "Moderate rainfall"
                      : weather.rainfall > 0
                        ? "Light rainfall"
                        : "No rainfall"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alerts */}
      {weather.alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <AlertTriangle className="h-5 w-5" />
              Active Weather Alerts ({weather.alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weather.alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {alert.severity}
                      </Badge>
                      <span className="font-semibold">{alert.message}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Recommendation:</span>
                      <span>{alert.recommendation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Affected:</span>
                      <span>{alert.affectedLines.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Protocol */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Active Safety Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900">{impact.safetyProtocol}</p>
          </div>
        </CardContent>
      </Card>

      {/* Weather-Adaptive Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Weather-Adaptive Schedule</CardTitle>
          <CardDescription>Real-time schedule adjustments based on current weather conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adaptiveSchedule.map((slot, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">{slot.time}</span>
                    <Badge variant="outline" className="gap-1">
                      {getStatusIcon(slot.status)}
                      {slot.status}
                    </Badge>
                  </div>
                  {slot.expectedDelay > 0 && <Badge variant="destructive">+{slot.expectedDelay} min delay</Badge>}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Frequency</div>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-muted-foreground">{slot.normalFrequency}/hr</span>
                      <TrendingDown className="h-3 w-3 text-orange-500" />
                      <span className="font-semibold text-orange-600">{slot.adaptedFrequency}/hr</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Speed Limit</div>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-muted-foreground">{slot.normalSpeed} km/h</span>
                      <Gauge className="h-3 w-3 text-orange-500" />
                      <span className="font-semibold text-orange-600">{slot.adaptedSpeed} km/h</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Status</div>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(slot.status)} text-white`}
                    >
                      {getStatusIcon(slot.status)}
                      {slot.status === "normal"
                        ? "Operating"
                        : slot.status === "cautious"
                          ? "Monitoring"
                          : slot.status === "restricted"
                            ? "Limited"
                            : "Suspended"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast & Impact Prediction</CardTitle>
          <CardDescription>Upcoming weather conditions and operational impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {weather.forecast.map((forecast, index) => (
              <div key={index} className="p-3 border rounded-lg text-center space-y-2">
                <div className="text-sm font-semibold text-muted-foreground">{forecast.time}</div>
                <div className="flex justify-center">{getWeatherIcon(forecast.condition)}</div>
                <div className="text-xs font-medium">{forecast.condition}</div>
                <div className="text-sm font-bold">{forecast.temperature}°C</div>
                {forecast.rainfall > 0 && <div className="text-xs text-blue-600">{forecast.rainfall}mm</div>}
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    forecast.impact === "high"
                      ? "border-red-500 text-red-700"
                      : forecast.impact === "medium"
                        ? "border-orange-500 text-orange-700"
                        : forecast.impact === "low"
                          ? "border-yellow-500 text-yellow-700"
                          : "border-green-500 text-green-700"
                  }`}
                >
                  {forecast.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
