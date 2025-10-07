export interface WeatherData {
  condition: "Clear" | "Rainy" | "Heavy Rain" | "Fog" | "Thunderstorm" | "Cloudy" | "Partly Cloudy"
  temperature: number
  humidity: number
  windSpeed: number
  visibility: number
  rainfall: number
  forecast: WeatherForecast[]
  alerts: WeatherAlert[]
}

export interface WeatherForecast {
  time: string
  condition: string
  temperature: number
  rainfall: number
  impact: "none" | "low" | "medium" | "high" | "severe"
}

export interface WeatherAlert {
  type: "rain" | "fog" | "storm" | "heat"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  recommendation: string
  affectedLines: string[]
}

export interface WeatherImpact {
  speedReduction: number
  frequencyAdjustment: number
  delayPrediction: number
  safetyProtocol: string
  operationalStatus: "normal" | "cautious" | "restricted" | "suspended"
}

export class WeatherEngine {
  private monsoonMonths = [6, 7, 8, 9] // June to September

  async getCurrentWeather(): Promise<WeatherData> {
    const month = new Date().getMonth()
    const isMonsoon = this.monsoonMonths.includes(month)

    // Simulate realistic Kerala weather patterns
    const conditions: WeatherData["condition"][] = isMonsoon
      ? ["Rainy", "Heavy Rain", "Cloudy", "Thunderstorm", "Partly Cloudy"]
      : ["Clear", "Partly Cloudy", "Cloudy"]

    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const temperature = isMonsoon ? 26 + Math.random() * 6 : 28 + Math.random() * 8
    const humidity = condition.includes("Rain") ? 85 + Math.random() * 10 : 60 + Math.random() * 25
    const rainfall =
      condition === "Heavy Rain"
        ? 50 + Math.random() * 100
        : condition === "Rainy"
          ? 10 + Math.random() * 40
          : condition === "Thunderstorm"
            ? 30 + Math.random() * 80
            : 0

    const windSpeed =
      condition === "Thunderstorm"
        ? 40 + Math.random() * 30
        : condition.includes("Rain")
          ? 20 + Math.random() * 20
          : 5 + Math.random() * 15

    const visibility =
      condition === "Fog"
        ? 50 + Math.random() * 100
        : condition === "Heavy Rain"
          ? 200 + Math.random() * 300
          : condition.includes("Rain")
            ? 500 + Math.random() * 1000
            : 5000 + Math.random() * 5000

    const forecast = this.generateForecast(condition, temperature)
    const alerts = this.generateAlerts(condition, rainfall, visibility, windSpeed)

    return {
      condition,
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity),
      windSpeed: Math.round(windSpeed),
      visibility: Math.round(visibility),
      rainfall: Math.round(rainfall * 10) / 10,
      forecast,
      alerts,
    }
  }

  private generateForecast(currentCondition: string, currentTemp: number): WeatherForecast[] {
    const hours = ["Now", "1h", "2h", "3h", "4h", "6h", "12h", "24h"]
    const conditions = ["Clear", "Partly Cloudy", "Cloudy", "Rainy", "Heavy Rain"]

    return hours.map((time, index) => {
      const tempVariation = (Math.random() - 0.5) * 4
      const temperature = Math.round((currentTemp + tempVariation) * 10) / 10

      const condition = index === 0 ? currentCondition : conditions[Math.floor(Math.random() * conditions.length)]
      const rainfall = condition.includes("Rain") ? Math.random() * 50 : 0

      const impact: WeatherForecast["impact"] =
        condition === "Heavy Rain" || rainfall > 40
          ? "high"
          : condition === "Rainy" || rainfall > 20
            ? "medium"
            : condition === "Cloudy"
              ? "low"
              : "none"

      return {
        time,
        condition,
        temperature,
        rainfall: Math.round(rainfall * 10) / 10,
        impact,
      }
    })
  }

  private generateAlerts(condition: string, rainfall: number, visibility: number, windSpeed: number): WeatherAlert[] {
    const alerts: WeatherAlert[] = []

    if (condition === "Heavy Rain" || rainfall > 50) {
      alerts.push({
        type: "rain",
        severity: rainfall > 100 ? "critical" : "high",
        message: "Heavy rainfall detected - Track flooding risk",
        recommendation: "Reduce train speed to 40 km/h, increase headway by 2 minutes",
        affectedLines: ["Blue Line", "Green Line"],
      })
    }

    if (visibility < 200) {
      alerts.push({
        type: "fog",
        severity: visibility < 100 ? "critical" : "high",
        message: "Low visibility conditions - Enhanced signaling required",
        recommendation: "Activate fog protocol, reduce speed to 30 km/h",
        affectedLines: ["All Lines"],
      })
    }

    if (condition === "Thunderstorm" || windSpeed > 60) {
      alerts.push({
        type: "storm",
        severity: "critical",
        message: "Severe weather alert - Lightning and high winds",
        recommendation: "Consider service suspension, ensure passenger safety",
        affectedLines: ["All Lines"],
      })
    }

    if (condition === "Rainy" && rainfall > 20 && rainfall < 50) {
      alerts.push({
        type: "rain",
        severity: "medium",
        message: "Moderate rainfall - Monitor track conditions",
        recommendation: "Reduce speed by 20%, monitor drainage systems",
        affectedLines: ["Blue Line"],
      })
    }

    return alerts
  }

  async calculateWeatherImpact(weather: WeatherData): Promise<WeatherImpact> {
    let speedReduction = 0
    let frequencyAdjustment = 0
    let delayPrediction = 0
    let safetyProtocol = "Standard Operations"
    let operationalStatus: WeatherImpact["operationalStatus"] = "normal"

    // Calculate impact based on weather conditions
    if (weather.condition === "Heavy Rain" || weather.rainfall > 50) {
      speedReduction = 40 // 40% speed reduction
      frequencyAdjustment = -2 // Reduce frequency by 2 trains/hour
      delayPrediction = 8 // 8 minutes average delay
      safetyProtocol = "Heavy Rain Protocol - Enhanced Monitoring"
      operationalStatus = "restricted"
    } else if (weather.condition === "Rainy" || weather.rainfall > 20) {
      speedReduction = 20
      frequencyAdjustment = -1
      delayPrediction = 4
      safetyProtocol = "Rain Protocol - Track Monitoring Active"
      operationalStatus = "cautious"
    } else if (weather.condition === "Fog" || weather.visibility < 200) {
      speedReduction = 50
      frequencyAdjustment = -3
      delayPrediction = 12
      safetyProtocol = "Fog Protocol - Enhanced Signaling"
      operationalStatus = "restricted"
    } else if (weather.condition === "Thunderstorm") {
      speedReduction = 60
      frequencyAdjustment = -4
      delayPrediction = 15
      safetyProtocol = "Storm Protocol - Service Evaluation Required"
      operationalStatus = "suspended"
    } else if (weather.condition === "Cloudy") {
      speedReduction = 5
      frequencyAdjustment = 0
      delayPrediction = 1
      safetyProtocol = "Standard Operations with Weather Monitoring"
      operationalStatus = "cautious"
    }

    // Additional adjustments for wind
    if (weather.windSpeed > 60) {
      speedReduction = Math.max(speedReduction, 50)
      operationalStatus = "suspended"
    } else if (weather.windSpeed > 40) {
      speedReduction += 10
      operationalStatus = operationalStatus === "normal" ? "cautious" : operationalStatus
    }

    return {
      speedReduction,
      frequencyAdjustment,
      delayPrediction,
      safetyProtocol,
      operationalStatus,
    }
  }

  async getAdaptiveSchedule(weather: WeatherData) {
    const impact = await this.calculateWeatherImpact(weather)
    const baseSchedule = [
      { time: "06:00-08:00", normalFrequency: 4, normalSpeed: 80 },
      { time: "08:00-10:00", normalFrequency: 6, normalSpeed: 80 },
      { time: "10:00-12:00", normalFrequency: 5, normalSpeed: 80 },
      { time: "12:00-14:00", normalFrequency: 4, normalSpeed: 80 },
      { time: "14:00-16:00", normalFrequency: 5, normalSpeed: 80 },
      { time: "16:00-18:00", normalFrequency: 6, normalSpeed: 80 },
      { time: "18:00-20:00", normalFrequency: 7, normalSpeed: 80 },
      { time: "20:00-22:00", normalFrequency: 4, normalSpeed: 80 },
    ]

    return baseSchedule.map((slot) => ({
      ...slot,
      adaptedFrequency: Math.max(2, slot.normalFrequency + impact.frequencyAdjustment),
      adaptedSpeed: Math.round(slot.normalSpeed * (1 - impact.speedReduction / 100)),
      expectedDelay: impact.delayPrediction,
      status: impact.operationalStatus,
    }))
  }
}
