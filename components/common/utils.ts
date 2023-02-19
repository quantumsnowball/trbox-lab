import { TreeDict } from "@/common/types"


// sorting
type Entry = [string, TreeDict | null]
export const byDirThenName = (a: Entry, b: Entry) => {
  if (a[1] && !b[1]) return -1
  if (!a[1] && b[1]) return +1
  if (a[0] < b[0]) return -1
  if (a[0] > b[0]) return +1
  return 0
}


