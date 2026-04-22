export interface Metric {
  id: string
  name: string
  value: number | string
  previousValue?: number | string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  format: 'number' | 'currency' | 'percentage' | 'text'
  icon?: string
  color?: string
  description?: string
  trend?: 'up' | 'down' | 'stable'
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: any
}

export interface TimeSeriesDataPoint {
  timestamp: Date
  value: number
  label?: string
  [key: string]: any
}

export interface ChartConfig {
  id: string
  title: string
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'scatter' | 'radar'
  data: ChartDataPoint[] | TimeSeriesDataPoint[]
  xAxisKey?: string
  yAxisKey?: string
  colors?: string[]
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  stacked?: boolean
  smooth?: boolean
}

export interface DashboardWidget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'text' | 'image'
  title: string
  description?: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  config: Metric | ChartConfig | TableConfig | TextWidgetConfig | ImageWidgetConfig
  refreshInterval?: number // in seconds
  lastUpdated?: Date
}

export interface TableConfig {
  columns: TableColumn[]
  data: Record<string, any>[]
  sortable?: boolean
  filterable?: boolean
  pagination?: boolean
  pageSize?: number
}

export interface TableColumn {
  key: string
  label: string
  type: 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'boolean'
  sortable?: boolean
  filterable?: boolean
  width?: number
  align?: 'left' | 'center' | 'right'
}

export interface TextWidgetConfig {
  content: string
  fontSize?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  alignment?: 'left' | 'center' | 'right'
}

export interface ImageWidgetConfig {
  src: string
  alt: string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export interface Dashboard {
  id: string
  name: string
  description?: string
  widgets: DashboardWidget[]
  layout: 'grid' | 'masonry' | 'flex'
  theme?: 'light' | 'dark' | 'auto'
  isPublic?: boolean
  tags?: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  permissions: DashboardPermission[]
}

export interface DashboardPermission {
  userId: string
  permission: 'view' | 'edit' | 'admin' | 'owner'
}

export interface Report {
  id: string
  name: string
  description?: string
  dashboardId: string
  schedule?: ReportSchedule
  format: 'pdf' | 'excel' | 'csv' | 'json'
  recipients?: string[]
  lastGenerated?: Date
  nextScheduled?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  time?: string // HH:MM format
  dayOfWeek?: number // 0-6 for weekly
  dayOfMonth?: number // 1-31 for monthly
  timezone?: string
}

export interface DataSource {
  id: string
  name: string
  type: 'database' | 'api' | 'file' | 'streaming'
  connectionString?: string
  config: Record<string, any>
  isActive: boolean
  lastSync?: Date
  refreshInterval?: number
  tables?: DataTable[]
}

export interface DataTable {
  name: string
  schema: TableColumn[]
  rowCount?: number
  lastUpdated?: Date
}

export interface Query {
  id: string
  name: string
  description?: string
  sql?: string
  dataSourceId: string
  parameters?: QueryParameter[]
  cache?: {
    enabled: boolean
    ttl: number // in seconds
  }
  createdAt: Date
  updatedAt: Date
}

export interface QueryParameter {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'select'
  defaultValue?: any
  required?: boolean
  options?: string[] // for select type
}

export interface Alert {
  id: string
  name: string
  description?: string
  metricId: string
  condition: AlertCondition
  threshold: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  channels: AlertChannel[]
  isActive: boolean
  lastTriggered?: Date
  cooldown?: number // in minutes
  createdAt: Date
  updatedAt: Date
}

export interface AlertCondition {
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq'
  aggregation?: 'avg' | 'sum' | 'min' | 'max' | 'count'
  timeWindow?: number // in minutes
}

export interface AlertChannel {
  type: 'email' | 'slack' | 'webhook' | 'sms'
  destination: string
  template?: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  preferences: UserPreferences
  createdAt: Date
  lastLogin?: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  timezone: string
  dateFormat: string
  defaultDashboard?: string
  emailNotifications: boolean
  pushNotifications: boolean
}

export interface AnalyticsEvent {
  id: string
  userId?: string
  eventType: string
  eventData: Record<string, any>
  timestamp: Date
  sessionId?: string
  userAgent?: string
  ipAddress?: string
}

// Utility types
export type TimeRange = '1h' | '24h' | '7d' | '30d' | '90d' | '1y' | 'custom'
export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count' | 'distinct'
export type ChartType = ChartConfig['type']
export type WidgetType = DashboardWidget['type']

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
    timestamp: Date
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    timestamp: Date
  }
}

// Filter and Search types
export interface FilterOption {
  field: string
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith'
  value: any
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

export interface SearchOptions {
  query?: string
  filters?: FilterOption[]
  sort?: SortOption[]
  page?: number
  limit?: number
}
