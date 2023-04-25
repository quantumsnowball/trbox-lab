export const cleanUrl = (url: string) => url.replace(/([^:]\/)\/+/g, "$1")

export const resultDirDatetimeFormatted = (name: string) => {
  const pattern = /\d{4}-\d{2}-\d{2}T\d{2}\.\d{2}\.\d{2}/;
  const match = pattern.exec(name)
  const iso = match?.[0]
  const formatted = iso?.replace('T', ' - ').replaceAll('.', ':')
  return formatted ?? 'Invalid Date'
}

export const randomRGB = () => '#' + Math.random().toString(16).slice(-6)

export const roundFloat = (n: number) => (val: number) => val.toFixed(n)

export const roundPct = (n: number) => (val: number) => `${(val * 100).toFixed(n)}%`

export const roundCurrency = (n: number) => (val: number) => val.toLocaleString('en-US', { maximumFractionDigits: n })
