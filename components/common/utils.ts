import { FileNode } from "@/common/types"


// sorting
export const byDirThenName = (a: FileNode, b: FileNode) => {
  // folder always on top
  if (a.type === 'folder' && b.type === 'file') return -1
  if (b.type === 'folder' && a.type === 'file') return +1
  // hidden below normal
  if (!a.name.startsWith('.') && b.name.startsWith('.')) return -1
  if (a.name.startsWith('.') && !b.name.startsWith('.')) return +1
  // sort by name
  if (a.name < b.name) return -1
  if (a.name > b.name) return +1
  return 0
}

export const byDirThenReverseName = (a: FileNode, b: FileNode) => {
  // folder always on top
  if (a.type === 'folder' && b.type === 'file') return -1
  if (b.type === 'folder' && a.type === 'file') return +1
  // hidden below normal
  if (!a.name.startsWith('.') && b.name.startsWith('.')) return -1
  if (a.name.startsWith('.') && !b.name.startsWith('.')) return +1
  // sort by name, if file then reverse
  if (a.name < b.name)
    return a.name.startsWith('.') ? +1 : -1
  if (a.name > b.name)
    return a.name.startsWith('.') ? -1 : +1
  return 0
}


