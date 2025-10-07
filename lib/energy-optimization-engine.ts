export interface EnergyProfile {
  trainId: string
  currentConsumption: number
  optimizedConsumption: number
  savings: number
  efficiency: number
  carbonFootprint: number
  regenerativeBraking: number
}

export interface RouteEnergyData {
  route: string
  distance: number
  currentEnergy: number
  optimizedEnergy: number
  speedProfile: string
  savingsPercentage: number
}

export interface EnergyMetrics {
  totalConsumption: number
  totalSavings: number
  avgEfficiency: number
  carbonReduction: number
  costSavings: number
  regenerativeEnergy: number
}

export class EnergyOptimizationEngine {
  private readonly ENERGY_COST_PER_KWH = 8.5 // INR
  private readonly CARBON_PER_KWH = 0.82 // kg CO2

  private calculateOptimalSpeedProfile(distance: number, stops: number): number {
    // AI-optimized speed profile reduces energy by 12-18%
    const baseEnergy = distance * 2.5 // kWh per km
    const stopPenalty = stops * 15 // Energy for acceleration after stops
    const optimizationFactor = 0.85 // 15% optimization through AI

    return (baseEnergy + stopPenalty) * optimizationFactor
  }

  private calculateRegenerativeBraking(consumption: number): number {
    // Regenerative braking recovers 20-30% of braking energy
    return consumption * (0.2 + Math.random() * 0.1)
  }

  async analyzeFleetEnergy(): Promise<EnergyProfile[]> {
    const profiles: EnergyProfile[] = []

    for (let trainNum = 1; trainNum <= 8; trainNum++) {
      const baseConsumption = 800 + Math.random() * 400 // kWh per day
      const optimizationRate = 0.12 + Math.random() * 0.08 // 12-20% savings
      const optimizedConsumption = baseConsumption * (1 - optimizationRate)
      const savings = baseConsumption - optimizedConsumption
      const regenerative = this.calculateRegenerativeBraking(baseConsumption)

      profiles.push({
        trainId: `KMRL-${trainNum.toString().padStart(3, "0")}`,
        currentConsumption: Math.round(baseConsumption),
        optimizedConsumption: Math.round(optimizedConsumption),
        savings: Math.round(savings),
        efficiency: Math.round((optimizedConsumption / baseConsumption) * 100),
        carbonFootprint: Math.round(optimizedConsumption * this.CARBON_PER_KWH),
        regenerativeBraking: Math.round(regenerative),
      })
    }

    return profiles.sort((a, b) => b.savings - a.savings)
  }

  async analyzeRouteEnergy(): Promise<RouteEnergyData[]> {
    const routes = [
      { name: "Aluva → Petta", distance: 13.4, stops: 11 },
      { name: "Petta → Aluva", distance: 13.4, stops: 11 },
      { name: "JLN Stadium → Petta", distance: 6.2, stops: 6 },
      { name: "Aluva → MG Road", distance: 10.8, stops: 9 },
      { name: "Vyttila → Aluva", distance: 9.5, stops: 8 },
    ]

    return routes.map((route) => {
      const currentEnergy = route.distance * 2.8 + route.stops * 18
      const optimizedEnergy = this.calculateOptimalSpeedProfile(route.distance, route.stops)
      const savings = ((currentEnergy - optimizedEnergy) / currentEnergy) * 100

      const speedProfiles = ["Eco Mode", "Balanced", "Performance"]
      const selectedProfile = savings > 15 ? "Eco Mode" : savings > 10 ? "Balanced" : "Performance"

      return {
        route: route.name,
        distance: route.distance,
        currentEnergy: Math.round(currentEnergy),
        optimizedEnergy: Math.round(optimizedEnergy),
        speedProfile: selectedProfile,
        savingsPercentage: Math.round(savings * 10) / 10,
      }
    })
  }

  async getEnergyMetrics(): Promise<EnergyMetrics> {
    const profiles = await this.analyzeFleetEnergy()

    const totalConsumption = profiles.reduce((sum, p) => sum + p.currentConsumption, 0)
    const totalOptimized = profiles.reduce((sum, p) => sum + p.optimizedConsumption, 0)
    const totalSavings = totalConsumption - totalOptimized
    const avgEfficiency = profiles.reduce((sum, p) => sum + p.efficiency, 0) / profiles.length
    const carbonReduction = totalSavings * this.CARBON_PER_KWH
    const costSavings = totalSavings * this.ENERGY_COST_PER_KWH
    const regenerativeEnergy = profiles.reduce((sum, p) => sum + p.regenerativeBraking, 0)

    return {
      totalConsumption: Math.round(totalConsumption),
      totalSavings: Math.round(totalSavings),
      avgEfficiency: Math.round(avgEfficiency * 10) / 10,
      carbonReduction: Math.round(carbonReduction),
      costSavings: Math.round(costSavings),
      regenerativeEnergy: Math.round(regenerativeEnergy),
    }
  }

  async getMonthlyProjections() {
    const metrics = await this.getEnergyMetrics()

    return {
      energySavings: metrics.totalSavings * 30,
      costSavings: metrics.costSavings * 30,
      carbonReduction: metrics.carbonReduction * 30,
      treesEquivalent: Math.round((metrics.carbonReduction * 30) / 21), // 21kg CO2 per tree per year
    }
  }
}
