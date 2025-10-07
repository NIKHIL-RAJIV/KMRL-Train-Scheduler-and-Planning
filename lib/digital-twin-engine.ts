export interface TrainPosition {
  trainId: string
  currentStation: string
  nextStation: string
  progress: number
  speed: number
  status: "on-time" | "delayed" | "early"
  passengers: number
  delay: number
}

export interface StationStatus {
  name: string
  position: number
  waitingPassengers: number
  platformStatus: "clear" | "occupied" | "boarding"
  nextArrival: string
}

export interface NetworkMetrics {
  activeTrains: number
  totalPassengers: number
  avgSpeed: number
  onTimePerformance: number
  networkLoad: number
}

export class DigitalTwinEngine {
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

  private getRandomStation(exclude?: string): string {
    const available = this.stations.filter((s) => s !== exclude)
    return available[Math.floor(Math.random() * available.length)]
  }

  private getNextStation(current: string): string {
    const index = this.stations.indexOf(current)
    if (index === -1 || index === this.stations.length - 1) return this.stations[0]
    return this.stations[index + 1]
  }

  async getTrainPositions(): Promise<TrainPosition[]> {
    const positions: TrainPosition[] = []

    for (let trainNum = 1; trainNum <= 8; trainNum++) {
      const currentStation = this.getRandomStation()
      const nextStation = this.getNextStation(currentStation)
      const progress = Math.random() * 100
      const speed = 40 + Math.random() * 40 // 40-80 km/h
      const delayMinutes = Math.random() < 0.8 ? 0 : Math.floor(Math.random() * 5)

      const status: "on-time" | "delayed" | "early" =
        delayMinutes > 2 ? "delayed" : delayMinutes < -1 ? "early" : "on-time"

      positions.push({
        trainId: `KMRL-${trainNum.toString().padStart(3, "0")}`,
        currentStation,
        nextStation,
        progress: Math.round(progress),
        speed: Math.round(speed),
        status,
        passengers: Math.floor(150 + Math.random() * 250),
        delay: delayMinutes,
      })
    }

    return positions
  }

  async getStationStatus(): Promise<StationStatus[]> {
    return this.stations.map((station, index) => {
      const platformStatuses: ("clear" | "occupied" | "boarding")[] = ["clear", "occupied", "boarding"]
      const platformStatus = platformStatuses[Math.floor(Math.random() * platformStatuses.length)]

      return {
        name: station,
        position: index,
        waitingPassengers: Math.floor(Math.random() * 150),
        platformStatus,
        nextArrival: `${Math.floor(Math.random() * 8) + 2} min`,
      }
    })
  }

  async getNetworkMetrics(): Promise<NetworkMetrics> {
    const trains = await this.getTrainPositions()
    const activeTrains = trains.length
    const totalPassengers = trains.reduce((sum, t) => sum + t.passengers, 0)
    const avgSpeed = trains.reduce((sum, t) => sum + t.speed, 0) / trains.length
    const onTimeTrains = trains.filter((t) => t.status === "on-time").length
    const onTimePerformance = (onTimeTrains / activeTrains) * 100

    return {
      activeTrains,
      totalPassengers,
      avgSpeed: Math.round(avgSpeed),
      onTimePerformance: Math.round(onTimePerformance * 10) / 10,
      networkLoad: Math.round((totalPassengers / (activeTrains * 400)) * 100),
    }
  }

  async simulateScenario(scenario: "normal" | "breakdown" | "event-surge" | "weather-delay") {
    const baseMetrics = await this.getNetworkMetrics()

    switch (scenario) {
      case "breakdown":
        return {
          scenario: "Train Breakdown at Edapally",
          impact: "2 trains affected, 15 min avg delay",
          affectedTrains: 2,
          delayIncrease: 15,
          passengerImpact: 800,
          recoveryTime: "45 minutes",
          recommendation: "Deploy backup train, reroute passengers via bus",
        }
      case "event-surge":
        return {
          scenario: "Cricket Match at JLN Stadium",
          impact: "3x passenger surge expected",
          affectedStations: ["JLN Stadium", "Kaloor", "Palarivattom"],
          passengerIncrease: baseMetrics.totalPassengers * 2,
          recommendation: "Increase frequency to 10 trains/hour, deploy crowd management",
        }
      case "weather-delay":
        return {
          scenario: "Heavy Rain Alert",
          impact: "Speed reduced to 60 km/h, 5 min delays",
          affectedTrains: baseMetrics.activeTrains,
          speedReduction: 25,
          delayIncrease: 5,
          recommendation: "Activate weather protocol, increase headway time",
        }
      default:
        return {
          scenario: "Normal Operations",
          impact: "All systems operational",
          onTimePerformance: baseMetrics.onTimePerformance,
          recommendation: "Continue monitoring",
        }
    }
  }
}
