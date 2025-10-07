export interface MaintenanceAlert {
  trainId: string
  component: string
  failureProbability: number
  predictedFailureTime: string
  severity: "critical" | "high" | "medium" | "low"
  recommendedAction: string
  estimatedCost: number
  currentHealth: number
}

export interface SensorData {
  temperature: number
  vibration: number
  pressure: number
  wearLevel: number
}

export class PredictiveMaintenanceEngine {
  private simulateSensorData(): SensorData {
    return {
      temperature: 45 + Math.random() * 30,
      vibration: 0.5 + Math.random() * 2,
      pressure: 80 + Math.random() * 40,
      wearLevel: Math.random() * 100,
    }
  }

  private calculateFailureProbability(sensorData: SensorData): number {
    // AI-driven failure probability calculation
    const tempScore = Math.min(sensorData.temperature / 100, 1) * 0.3
    const vibrationScore = Math.min(sensorData.vibration / 3, 1) * 0.3
    const pressureScore = (Math.abs(sensorData.pressure - 100) / 100) * 0.2
    const wearScore = (sensorData.wearLevel / 100) * 0.2

    return Math.min((tempScore + vibrationScore + pressureScore + wearScore) * 100, 95)
  }

  private getSeverity(probability: number): "critical" | "high" | "medium" | "low" {
    if (probability >= 75) return "critical"
    if (probability >= 50) return "high"
    if (probability >= 25) return "medium"
    return "low"
  }

  async analyzeFleet(): Promise<MaintenanceAlert[]> {
    const components = [
      { name: "Brake System", baseCost: 250000 },
      { name: "Motor Assembly", baseCost: 800000 },
      { name: "Door Mechanism", baseCost: 150000 },
      { name: "HVAC System", baseCost: 300000 },
      { name: "Pantograph", baseCost: 400000 },
      { name: "Wheel Assembly", baseCost: 500000 },
    ]

    const alerts: MaintenanceAlert[] = []

    for (let trainNum = 1; trainNum <= 8; trainNum++) {
      const numComponents = Math.floor(Math.random() * 3) + 1
      const selectedComponents = components.sort(() => Math.random() - 0.5).slice(0, numComponents)

      for (const component of selectedComponents) {
        const sensorData = this.simulateSensorData()
        const probability = this.calculateFailureProbability(sensorData)
        const severity = this.getSeverity(probability)

        if (probability > 20) {
          const hoursToFailure = Math.floor((100 - probability) * 0.5 + 12)
          const predictedDate = new Date()
          predictedDate.setHours(predictedDate.getHours() + hoursToFailure)

          alerts.push({
            trainId: `KMRL-${trainNum.toString().padStart(3, "0")}`,
            component: component.name,
            failureProbability: Math.round(probability * 10) / 10,
            predictedFailureTime: `${hoursToFailure}h`,
            severity,
            recommendedAction:
              severity === "critical"
                ? "Immediate inspection required"
                : severity === "high"
                  ? "Schedule maintenance within 24h"
                  : "Monitor and schedule preventive maintenance",
            estimatedCost: Math.round(component.baseCost * (probability / 100)),
            currentHealth: Math.round((100 - probability) * 10) / 10,
          })
        }
      }
    }

    return alerts.sort((a, b) => b.failureProbability - a.failureProbability)
  }

  async getMaintenanceImpact() {
    const alerts = await this.analyzeFleet()
    const criticalAlerts = alerts.filter((a) => a.severity === "critical").length
    const totalCost = alerts.reduce((sum, a) => sum + a.estimatedCost, 0)
    const avgHealth = alerts.reduce((sum, a) => sum + a.currentHealth, 0) / alerts.length

    return {
      totalAlerts: alerts.length,
      criticalAlerts,
      estimatedSavings: Math.round(totalCost * 0.6), // 60% savings from predictive vs reactive
      fleetHealthScore: Math.round(avgHealth * 10) / 10,
      preventedBreakdowns: Math.floor(criticalAlerts * 0.85), // 85% prevention rate
    }
  }
}
