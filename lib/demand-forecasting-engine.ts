export interface PassengerDemand {
  stationName: string
  currentLoad: number
  predictedLoad: number
  peakTime: string
  trend: "increasing" | "decreasing" | "stable"
  confidence: number
}

export interface ScheduleRecommendation {
  timeSlot: string
  currentFrequency: number
  recommendedFrequency: number
  expectedPassengers: number
  reason: string
  impact: "high" | "medium" | "low"
}

export interface DemandFactors {
  dayOfWeek: string
  weather: string
  events: string[]
  holiday: boolean
  temperature: number
}

export class DemandForecastingEngine {
  private stations = [
    "Aluva",
    "Pulinchodu",
    "Companypady",
    "Ambattukavu",
    "Muttom",
    "Kalamassery",
    "Cochin University",
    "Pathadipalam",
    "Edapally",
    "Changampuzha Park",
    "Palarivattom",
    "JLN Stadium",
    "Kaloor",
    "Town Hall",
    "MG Road",
    "Maharajas",
    "Ernakulam South",
    "Kadavanthra",
    "Elamkulam",
    "Vyttila",
    "Thaikoodam",
    "Petta",
    "SN Junction",
  ]

  private getDemandFactors(): DemandFactors {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const weather = ["Clear", "Rainy", "Cloudy", "Partly Cloudy"]
    const events = [
      ["Tech Conference at Infopark", "Cricket Match at Stadium"],
      ["Shopping Festival at Lulu Mall"],
      [],
      ["College Fest at MG University"],
      [],
    ]

    return {
      dayOfWeek: days[new Date().getDay()],
      weather: weather[Math.floor(Math.random() * weather.length)],
      events: events[Math.floor(Math.random() * events.length)],
      holiday: Math.random() < 0.1,
      temperature: 28 + Math.random() * 8,
    }
  }

  private calculateDemandMultiplier(factors: DemandFactors, hour: number): number {
    let multiplier = 1.0

    // Time of day impact
    if (hour >= 7 && hour <= 9)
      multiplier *= 1.8 // Morning peak
    else if (hour >= 17 && hour <= 19)
      multiplier *= 1.9 // Evening peak
    else if (hour >= 10 && hour <= 16)
      multiplier *= 1.2 // Midday
    else multiplier *= 0.6 // Off-peak

    // Day of week impact
    if (factors.dayOfWeek === "Saturday" || factors.dayOfWeek === "Sunday") multiplier *= 0.7
    if (factors.holiday) multiplier *= 0.5

    // Weather impact
    if (factors.weather === "Rainy") multiplier *= 1.3
    if (factors.temperature > 34) multiplier *= 1.15

    // Events impact
    if (factors.events.length > 0) multiplier *= 1.4

    return multiplier
  }

  async forecastStationDemand(): Promise<PassengerDemand[]> {
    const factors = this.getDemandFactors()
    const currentHour = new Date().getHours()

    return this.stations.map((station) => {
      const baseLoad = 150 + Math.random() * 300
      const multiplier = this.calculateDemandMultiplier(factors, currentHour)
      const currentLoad = Math.round(baseLoad * multiplier)
      const predictedLoad = Math.round(currentLoad * (0.9 + Math.random() * 0.3))

      const trend: "increasing" | "decreasing" | "stable" =
        predictedLoad > currentLoad * 1.1 ? "increasing" : predictedLoad < currentLoad * 0.9 ? "decreasing" : "stable"

      return {
        stationName: station,
        currentLoad,
        predictedLoad,
        peakTime: currentHour < 12 ? "17:30 - 19:00" : "08:00 - 09:30",
        trend,
        confidence: 85 + Math.random() * 12,
      }
    })
  }

  async generateScheduleRecommendations(): Promise<ScheduleRecommendation[]> {
    const factors = this.getDemandFactors()
    const timeSlots = [
      { time: "06:00 - 08:00", base: 300 },
      { time: "08:00 - 10:00", base: 800 },
      { time: "10:00 - 12:00", base: 400 },
      { time: "12:00 - 14:00", base: 350 },
      { time: "14:00 - 16:00", base: 380 },
      { time: "16:00 - 18:00", base: 750 },
      { time: "18:00 - 20:00", base: 850 },
      { time: "20:00 - 22:00", base: 400 },
    ]

    return timeSlots.map((slot, index) => {
      const hour = 6 + index * 2
      const multiplier = this.calculateDemandMultiplier(factors, hour)
      const expectedPassengers = Math.round(slot.base * multiplier)

      const currentFrequency = hour >= 7 && hour <= 19 ? 6 : 4 // trains per hour
      const optimalFrequency = Math.ceil(expectedPassengers / 120) // 120 passengers per train optimal

      const recommendedFrequency = Math.max(3, Math.min(10, optimalFrequency))
      const impact: "high" | "medium" | "low" =
        Math.abs(recommendedFrequency - currentFrequency) >= 2
          ? "high"
          : Math.abs(recommendedFrequency - currentFrequency) === 1
            ? "medium"
            : "low"

      let reason = ""
      if (recommendedFrequency > currentFrequency) {
        reason = factors.events.length > 0 ? `High demand due to: ${factors.events[0]}` : "Peak hour demand surge"
      } else if (recommendedFrequency < currentFrequency) {
        reason = factors.holiday ? "Holiday - reduced demand" : "Off-peak optimization"
      } else {
        reason = "Current frequency optimal"
      }

      return {
        timeSlot: slot.time,
        currentFrequency,
        recommendedFrequency,
        expectedPassengers,
        reason,
        impact,
      }
    })
  }

  async getDemandInsights() {
    const factors = this.getDemandFactors()
    const stationDemand = await this.forecastStationDemand()
    const recommendations = await this.generateScheduleRecommendations()

    const totalCurrentPassengers = stationDemand.reduce((sum, s) => sum + s.currentLoad, 0)
    const totalPredictedPassengers = stationDemand.reduce((sum, s) => sum + s.predictedLoad, 0)
    const avgConfidence = stationDemand.reduce((sum, s) => sum + s.confidence, 0) / stationDemand.length

    const highImpactChanges = recommendations.filter((r) => r.impact === "high").length

    return {
      factors,
      totalCurrentPassengers,
      totalPredictedPassengers,
      avgConfidence: Math.round(avgConfidence * 10) / 10,
      highImpactChanges,
      demandTrend: totalPredictedPassengers > totalCurrentPassengers ? "increasing" : "decreasing",
      optimizationPotential: Math.round(((highImpactChanges / recommendations.length) * 100 * 10) / 10),
    }
  }
}
