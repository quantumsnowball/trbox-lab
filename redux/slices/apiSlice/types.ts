export type StrategyParams = {
  [name: string]: string
}
export type Meta = {
  timestamp: string
  source: string
  strategies: string[]
  params: StrategyParams
}

export type Metrics = {
  columns: string[],
  index: string[],
  data: (string | number)[][],
}

export type TradeStats = {
  count: number
  avg_interval: number | null
  avg_quantity: number | null
  avg_value: number | null
  avg_fees: number | null
}
export type Stats = {
  all: TradeStats,
  buys: TradeStats,
  sells: TradeStats,
}

export type MarksIndex = {
  [strategy: string]: string[]
}

export type Equity = {
  [timestamp: string]: number
}
export type Equities = {
  [name: string]: Equity
}

export type Trade = {
  [name: string]: string | number
}
export type Trades = Trade[]
export type TradesSchema = {
  schema: { fields: { name: string }[] }
  data: Trades
}


export type Line = {
  type: 'stdout' | 'stderr' | 'system'
  text: string
}
export type Lines = Line[]


