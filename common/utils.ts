import { RESULT_DIR_PREFIX } from "@/components/result/constants"

export const cleanUrl = (url: string) => url.replace(/([^:]\/)\/+/g, "$1")

export const resultDirDatetimeFormatted = (name: string) =>
  name
    .replace(`${RESULT_DIR_PREFIX}_`, '')
    .replace('T', ' - ')
    .replaceAll('.', ':')
    .slice(0, -7)

export const randomRGB = () => '#' + Math.random().toString(16).slice(-6)

export const roundFloat = (n: number) => (val: number) => val.toFixed(n)

export const roundPct = (n: number) => (val: number) => `${(val * 100).toFixed(n)}%`

