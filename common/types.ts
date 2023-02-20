export type ColorMode = 'light' | 'dark'

export type Tag = 'OrderResult' | 'TradeLogHistory' | 'EquityValue' | 'EquityCurveHistory'
export type WebSocketMessage = {
  tag: Tag,
  data: any
}
export type TaggedMessage<T> = {
  tag: Tag,
  data: T
}

export type EquityValue = {
  timestamp: string
  equity: number
}
export type EquityCurve = EquityValue[]

export type OrderResult = {
  timestamp: string
  symbol: string
  action: string
  price: number
  quantity: number
}
export type TradeLog = OrderResult[]


export type TreeDict = {
  [key: string]: TreeDict | null
}

export type Node = {
  name: string
  type: 'folder' | 'file'
  path: string
  parent: Node | null
  children: Node[]
}
