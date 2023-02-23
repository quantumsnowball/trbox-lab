export const SOURCE_FILE_SUFFIX = '.py'
export const SOURCE_ROOT = '/source'
export const SOURCE_BOTTOM_NAVIGATION = ['files', 'source', 'output', 'error',] as const
export type BottomNavTag = typeof SOURCE_BOTTOM_NAVIGATION[number]
