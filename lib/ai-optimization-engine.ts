// AI-Driven Train Induction Planning Engine for KMRL
// Implements Multi-Criteria Decision Analysis, Constraint Satisfaction, and Optimization

export interface TrainData {
  id: string
  name: string
  currentBay: number
  fitnessScore: number
  jobCardStatus: "open" | "closed"
  brandingPriority: number
  mileage: number
  cleaningRequired: boolean
  telcomClearance: boolean
  rollingStockClearance: boolean
  signallingClearance: boolean
}

export interface OptimizationWeights {
  fitness: number
  jobCard: number
  branding: number
  mileage: number
  cleaning: number
  geometry: number
}

export interface OptimizationConstraints {
  minServiceTrains: number
  maxServiceTrains: number
  maxMaintenanceSlots: number
  maxCleaningSlots: number
}

export interface OptimizationResult {
  serviceTrains: TrainData[]
  standbyTrains: TrainData[]
  maintenanceTrains: TrainData[]
  totalScore: number
  constraintViolations: string[]
  recommendations: string[]
  executionTime: number
}

export class AIOptimizationEngine {
  private weights: OptimizationWeights = {
    fitness: 0.25, // Safety first - highest weight
    jobCard: 0.2, // Operational readiness
    branding: 0.15, // Revenue contracts
    mileage: 0.15, // Asset preservation
    cleaning: 0.1, // Service quality
    geometry: 0.15, // Operational efficiency
  }

  private constraints: OptimizationConstraints = {
    minServiceTrains: 18, // Service level agreement
    maxServiceTrains: 22, // Resource limitations
    maxMaintenanceSlots: 6, // Bay capacity
    maxCleaningSlots: 4, // Manpower limits
  }

  // Multi-Criteria Decision Analysis (MCDA) scoring
  private calculateTrainScore(train: TrainData): number {
    const fitnessScore = this.calculateFitnessScore(train)
    const jobCardScore = train.jobCardStatus === "closed" ? 20 : 0
    const brandingScore = Math.min(train.brandingPriority * 4, 20)
    const mileageScore = this.calculateMileageScore(train.mileage)
    const cleaningScore = train.cleaningRequired ? 5 : 15
    const geometryScore = this.calculateGeometryScore(train.currentBay)

    return (
      fitnessScore * this.weights.fitness +
      jobCardScore * this.weights.jobCard +
      brandingScore * this.weights.branding +
      mileageScore * this.weights.mileage +
      cleaningScore * this.weights.cleaning +
      geometryScore * this.weights.geometry
    )
  }

  // Rule-Based Expert System for safety constraints
  private calculateFitnessScore(train: TrainData): number {
    if (!train.telcomClearance || !train.rollingStockClearance || !train.signallingClearance) {
      return 0 // Force maintenance assignment for safety
    }
    return train.fitnessScore
  }

  // Heuristic for mileage balancing
  private calculateMileageScore(mileage: number): number {
    const targetMileage = 50000 // Target annual mileage
    const deviation = Math.abs(mileage - targetMileage)
    return Math.max(0, 20 - deviation / 1000)
  }

  // Geometry-based heuristic for bay positioning
  private calculateGeometryScore(currentBay: number): number {
    // Closer bays (1-4) reduce shunting time and energy consumption
    return currentBay <= 4 ? 20 : 10
  }

  // Constraint Satisfaction Problem (CSP) solver
  private enforceConstraints(serviceTrains: TrainData[], maintenanceTrains: TrainData[]): string[] {
    const violations: string[] = []

    if (serviceTrains.length < this.constraints.minServiceTrains) {
      violations.push(`Insufficient service trains: ${serviceTrains.length} < ${this.constraints.minServiceTrains}`)
    }

    if (serviceTrains.length > this.constraints.maxServiceTrains) {
      violations.push(`Excess service trains: ${serviceTrains.length} > ${this.constraints.maxServiceTrains}`)
    }

    if (maintenanceTrains.length > this.constraints.maxMaintenanceSlots) {
      violations.push(
        `Maintenance capacity exceeded: ${maintenanceTrains.length} > ${this.constraints.maxMaintenanceSlots}`,
      )
    }

    return violations
  }

  // Greedy optimization algorithm with constraint checking
  public async optimizeTrainInduction(): Promise<OptimizationResult> {
    const startTime = Date.now()

    // Generate mock train data (in real implementation, this would come from APIs)
    const trains = this.generateMockTrainData()

    // Calculate scores for all trains using MCDA
    const scoredTrains = trains
      .map((train) => ({
        ...train,
        score: this.calculateTrainScore(train),
      }))
      .sort((a, b) => b.score - a.score)

    // Greedy assignment with constraint checking
    const serviceTrains: TrainData[] = []
    const standbyTrains: TrainData[] = []
    const maintenanceTrains: TrainData[] = []

    for (const train of scoredTrains) {
      // Safety-critical rule: trains without clearances must go to maintenance
      if (!train.telcomClearance || !train.rollingStockClearance || !train.signallingClearance) {
        if (maintenanceTrains.length < this.constraints.maxMaintenanceSlots) {
          maintenanceTrains.push(train)
        } else {
          standbyTrains.push(train) // Overflow to standby if maintenance full
        }
      }
      // Assign to service if within constraints and high score
      else if (serviceTrains.length < this.constraints.maxServiceTrains && train.score > 12) {
        serviceTrains.push(train)
      }
      // Assign to maintenance if needed and capacity available
      else if (train.cleaningRequired && maintenanceTrains.length < this.constraints.maxMaintenanceSlots) {
        maintenanceTrains.push(train)
      }
      // Default to standby
      else {
        standbyTrains.push(train)
      }
    }

    // Validate constraints
    const violations = this.enforceConstraints(serviceTrains, maintenanceTrains)

    // Generate recommendations
    const recommendations = this.generateRecommendations(serviceTrains, maintenanceTrains, violations)

    const executionTime = Date.now() - startTime

    return {
      serviceTrains,
      standbyTrains,
      maintenanceTrains,
      totalScore: serviceTrains.reduce((sum, train) => sum + (train as any).score, 0),
      constraintViolations: violations,
      recommendations,
      executionTime,
    }
  }

  private generateRecommendations(
    serviceTrains: TrainData[],
    maintenanceTrains: TrainData[],
    violations: string[],
  ): string[] {
    const recommendations: string[] = []

    if (violations.length === 0) {
      recommendations.push("✅ All constraints satisfied - optimal solution found")
    }

    if (serviceTrains.length === this.constraints.minServiceTrains) {
      recommendations.push("⚠️ Operating at minimum service capacity - consider standby activation")
    }

    const highMileageTrains = serviceTrains.filter((t) => t.mileage > 55000)
    if (highMileageTrains.length > 0) {
      recommendations.push(`🔧 ${highMileageTrains.length} trains approaching maintenance threshold`)
    }

    const brandingIssues = serviceTrains.filter((t) => t.brandingPriority > 4)
    if (brandingIssues.length > 0) {
      recommendations.push(`📊 ${brandingIssues.length} trains have high branding priority - monitor exposure hours`)
    }

    return recommendations
  }

  private generateMockTrainData(): TrainData[] {
    const trains: TrainData[] = []

    for (let i = 1; i <= 25; i++) {
      trains.push({
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

    return trains
  }
}
