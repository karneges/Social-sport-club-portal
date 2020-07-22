export interface PieEchartInterface {
  name: string,
  value: number
}

export interface PieEchartChartModel {
  data: PieEchartInterface[]
  chartTitle: string
}
