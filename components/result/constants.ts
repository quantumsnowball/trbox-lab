export const RESULT_DIR_PREFIX = '.result'
export const RESULT_ROOT = '/result'
export const RESULT_BOTTOM_NAVIGATION = [
    'files', 'metrics', 'equity', 'trades',
] as const
export type ResultBottomNavTag = typeof RESULT_BOTTOM_NAVIGATION[number]

