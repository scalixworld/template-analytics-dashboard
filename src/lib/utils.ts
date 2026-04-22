import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, subDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(value)
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatDate(date: Date, formatString: string = 'MMM dd, yyyy'): string {
  return format(date, formatString)
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM dd, yyyy HH:mm')
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export function getChangeType(change: number): 'increase' | 'decrease' | 'neutral' {
  if (change > 0) return 'increase'
  if (change < 0) return 'decrease'
  return 'neutral'
}

export function getTrend(change: number): 'up' | 'down' | 'stable' {
  if (change > 5) return 'up'
  if (change < -5) return 'down'
  return 'stable'
}

export function generateColorPalette(count: number): string[] {
  const colors = [
    '#10b981', // emerald
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ef4444', // red
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6b7280', // gray
  ]

  if (count <= colors.length) {
    return colors.slice(0, count)
  }

  // Generate additional colors if needed
  const additionalColors: string[] = []
  for (let i = colors.length; i < count; i++) {
    additionalColors.push(`hsl(${i * 137.5 % 360}, 70%, 50%)`)
  }

  return [...colors, ...additionalColors]
}

export function getTimeRangeDates(range: string): { start: Date; end: Date } {
  const now = new Date()

  switch (range) {
    case '1h':
      return {
        start: subDays(now, 0),
        end: now
      }
    case '24h':
      return {
        start: subDays(now, 1),
        end: now
      }
    case '7d':
      return {
        start: subDays(now, 7),
        end: now
      }
    case '30d':
      return {
        start: subDays(now, 30),
        end: now
      }
    case '90d':
      return {
        start: subDays(now, 90),
        end: now
      }
    case '1y':
      return {
        start: subDays(now, 365),
        end: now
      }
    case 'today':
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      }
    case 'yesterday':
      const yesterday = subDays(now, 1)
      return {
        start: startOfDay(yesterday),
        end: endOfDay(yesterday)
      }
    case 'thisWeek':
      return {
        start: startOfWeek(now),
        end: endOfWeek(now)
      }
    case 'lastWeek':
      const lastWeek = subDays(now, 7)
      return {
        start: startOfWeek(lastWeek),
        end: endOfWeek(lastWeek)
      }
    case 'thisMonth':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now)
      }
    case 'lastMonth':
      const lastMonth = subDays(startOfMonth(now), 1)
      return {
        start: startOfMonth(lastMonth),
        end: endOfMonth(lastMonth)
      }
    case 'thisYear':
      return {
        start: startOfYear(now),
        end: endOfYear(now)
      }
    default:
      return {
        start: subDays(now, 30),
        end: now
      }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function groupBy<T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const group = key(item)
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(item)
    return groups
  }, {} as Record<K, T[]>)
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function downloadFile(data: any, filename: string, type: string = 'text/plain') {
  const blob = new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  downloadFile(csvContent, `${filename}.csv`, 'text/csv')
}

export function exportToJSON(data: any, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, `${filename}.json`, 'application/json')
}

export function getIconComponent(iconName: string) {
  // This would typically import from lucide-react dynamically
  // For now, return the icon name as a placeholder
  return iconName
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}
