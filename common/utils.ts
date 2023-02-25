import { RESULT_DIR_PREFIX } from "@/components/result/constants"

export const cleanUrl = (url: string) => url.replace(/([^:]\/)\/+/g, "$1")

export const resultDirDatetimeFormatted = (name: string) =>
  name
    .replace(`${RESULT_DIR_PREFIX}_`, '')
    .replace('T', ' - ')
    .replaceAll('.', ':')
    .slice(0, -7)

