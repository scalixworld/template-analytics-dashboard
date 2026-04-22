import { faker } from '@faker-js/faker'
import {
  Metric,
  ChartDataPoint,
  TimeSeriesDataPoint,
  Dashboard,
  DashboardWidget,
  User,
  DataSource,
  Query,
  Alert,
  Report
} from '../types/analytics'

// Generate time series data
export const generateTimeSeriesData = (
  days: number,
  baseValue: number = 1000,
  volatility: number = 0.2
): TimeSeriesDataPoint[] => {
  const data: TimeSeriesDataPoint[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const value = Math.max(0, baseValue * (1 + randomChange))

    data.push({
      timestamp: date,
      value: Math.round(value),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
  }

  return data
}

// Mock Metrics
export const mockMetrics: Metric[] = [
  {
    id: 'revenue',
    name: 'Total Revenue',
    value: 284750,
    previousValue: 245680,
    change: 15.9,
    changeType: 'increase',
    format: 'currency',
    icon: 'DollarSign',
    color: '#10b981',
    description: 'Total revenue this month',
    trend: 'up'
  },
  {
    id: 'users',
    name: 'Active Users',
    value: 12450,
    previousValue: 11890,
    change: 4.7,
    changeType: 'increase',
    format: 'number',
    icon: 'Users',
    color: '#3b82f6',
    description: 'Monthly active users',
    trend: 'up'
  },
  {
    id: 'conversion',
    name: 'Conversion Rate',
    value: 3.24,
    previousValue: 2.98,
    change: 0.26,
    changeType: 'increase',
    format: 'percentage',
    icon: 'TrendingUp',
    color: '#f59e0b',
    description: 'Visitor to customer conversion',
    trend: 'up'
  },
  {
    id: 'orders',
    name: 'Total Orders',
    value: 892,
    previousValue: 756,
    change: 18.0,
    changeType: 'increase',
    format: 'number',
    icon: 'ShoppingCart',
    color: '#8b5cf6',
    description: 'Orders processed this month',
    trend: 'up'
  },
  {
    id: 'bounce-rate',
    name: 'Bounce Rate',
    value: 42.3,
    previousValue: 45.1,
    change: -2.8,
    changeType: 'decrease',
    format: 'percentage',
    icon: 'TrendingDown',
    color: '#ef4444',
    description: 'Website bounce rate',
    trend: 'down'
  },
  {
    id: 'avg-session',
    name: 'Avg Session Duration',
    value: '4m 32s',
    previousValue: '3m 58s',
    change: 17.9,
    changeType: 'increase',
    format: 'text',
    icon: 'Clock',
    color: '#06b6d4',
    description: 'Average user session time',
    trend: 'up'
  }
]

// Mock Chart Data
export const mockRevenueData = generateTimeSeriesData(30, 9500, 0.15)
export const mockUsersData = generateTimeSeriesData(30, 420, 0.1)
export const mockConversionData = generateTimeSeriesData(30, 3.2, 0.05)

export const mockTrafficSources: ChartDataPoint[] = [
  { name: 'Organic Search', value: 45 },
  { name: 'Direct', value: 25 },
  { name: 'Social Media', value: 15 },
  { name: 'Email', value: 10 },
  { name: 'Paid Ads', value: 5 }
]

export const mockDeviceData: ChartDataPoint[] = [
  { name: 'Desktop', value: 52 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 13 }
]

export const mockTopPages: ChartDataPoint[] = [
  { name: '/products', value: 12500 },
  { name: '/about', value: 8900 },
  { name: '/contact', value: 6700 },
  { name: '/blog', value: 5400 },
  { name: '/pricing', value: 4200 }
]

export const mockSalesByCategory: ChartDataPoint[] = [
  { name: 'Electronics', value: 45000 },
  { name: 'Clothing', value: 32000 },
  { name: 'Home & Garden', value: 28000 },
  { name: 'Sports', value: 21000 },
  { name: 'Books', value: 15000 }
]

// Mock Dashboard Widgets
export const mockDashboardWidgets: DashboardWidget[] = [
  {
    id: 'revenue-metric',
    type: 'metric',
    title: 'Total Revenue',
    position: { x: 0, y: 0, width: 3, height: 1 },
    config: mockMetrics[0],
    refreshInterval: 300
  },
  {
    id: 'users-metric',
    type: 'metric',
    title: 'Active Users',
    position: { x: 3, y: 0, width: 3, height: 1 },
    config: mockMetrics[1],
    refreshInterval: 300
  },
  {
    id: 'revenue-chart',
    type: 'chart',
    title: 'Revenue Trend',
    position: { x: 0, y: 1, width: 6, height: 4 },
    config: {
      id: 'revenue-chart',
      title: 'Revenue Trend',
      type: 'area',
      data: mockRevenueData,
      colors: ['#10b981'],
      height: 300,
      showLegend: false,
      smooth: true
    }
  },
  {
    id: 'traffic-sources',
    type: 'chart',
    title: 'Traffic Sources',
    position: { x: 6, y: 1, width: 3, height: 4 },
    config: {
      id: 'traffic-sources',
      title: 'Traffic Sources',
      type: 'pie',
      data: mockTrafficSources,
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
      height: 300,
      showLegend: true
    }
  },
  {
    id: 'device-breakdown',
    type: 'chart',
    title: 'Device Breakdown',
    position: { x: 9, y: 1, width: 3, height: 4 },
    config: {
      id: 'device-breakdown',
      title: 'Device Breakdown',
      type: 'donut',
      data: mockDeviceData,
      colors: ['#10b981', '#3b82f6', '#f59e0b'],
      height: 300,
      showLegend: true
    }
  },
  {
    id: 'top-pages',
    type: 'table',
    title: 'Top Pages',
    position: { x: 0, y: 5, width: 6, height: 4 },
    config: {
      columns: [
        { key: 'name', label: 'Page', type: 'text', sortable: true },
        { key: 'value', label: 'Views', type: 'number', sortable: true, align: 'right' }
      ],
      data: mockTopPages,
      sortable: true,
      pagination: true,
      pageSize: 10
    }
  },
  {
    id: 'sales-category',
    type: 'chart',
    title: 'Sales by Category',
    position: { x: 6, y: 5, width: 6, height: 4 },
    config: {
      id: 'sales-category',
      title: 'Sales by Category',
      type: 'bar',
      data: mockSalesByCategory,
      colors: ['#10b981'],
      height: 300,
      showLegend: false,
      showGrid: true
    }
  }
]

// Mock Dashboard
export const mockDashboard: Dashboard = {
  id: 'main-dashboard',
  name: 'Main Dashboard',
  description: 'Primary business analytics dashboard',
  widgets: mockDashboardWidgets,
  layout: 'grid',
  theme: 'light',
  isPublic: false,
  tags: ['business', 'analytics', 'revenue'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  createdBy: 'admin',
  permissions: [
    {
      userId: 'admin',
      permission: 'owner'
    }
  ]
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'admin',
    email: 'admin@company.com',
    name: 'Admin User',
    avatar: faker.image.avatar(),
    role: 'admin',
    preferences: {
      theme: 'light',
      timezone: 'America/New_York',
      dateFormat: 'MM/dd/yyyy',
      defaultDashboard: 'main-dashboard',
      emailNotifications: true,
      pushNotifications: false
    },
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'editor',
    email: 'editor@company.com',
    name: 'Editor User',
    avatar: faker.image.avatar(),
    role: 'editor',
    preferences: {
      theme: 'dark',
      timezone: 'America/Los_Angeles',
      dateFormat: 'dd/MM/yyyy',
      emailNotifications: true,
      pushNotifications: true
    },
    createdAt: new Date('2024-01-02'),
    lastLogin: new Date(Date.now() - 86400000)
  }
]

// Mock Data Sources
export const mockDataSources: DataSource[] = [
  {
    id: 'postgres-main',
    name: 'Main PostgreSQL Database',
    type: 'database',
    connectionString: 'postgresql://user:pass@localhost:5432/analytics',
    config: {
      host: 'localhost',
      port: 5432,
      database: 'analytics',
      username: 'user',
      password: 'pass'
    },
    isActive: true,
    lastSync: new Date(),
    refreshInterval: 300,
    tables: [
      {
        name: 'users',
        schema: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
          { key: 'name', label: 'Name', type: 'text' }
        ],
        rowCount: 12500,
        lastUpdated: new Date()
      },
      {
        name: 'orders',
        schema: [
          { key: 'id', label: 'Order ID', type: 'text' },
          { key: 'user_id', label: 'User ID', type: 'text' },
          { key: 'total', label: 'Total', type: 'currency' }
        ],
        rowCount: 892,
        lastUpdated: new Date()
      }
    ]
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics API',
    type: 'api',
    config: {
      apiKey: 'GA_API_KEY',
      viewId: 'GA_VIEW_ID',
      propertyId: 'GA_PROPERTY_ID'
    },
    isActive: true,
    lastSync: new Date(),
    refreshInterval: 3600
  }
]

// Mock Queries
export const mockQueries: Query[] = [
  {
    id: 'revenue-query',
    name: 'Monthly Revenue',
    description: 'Calculate total revenue for current month',
    sql: 'SELECT SUM(amount) as revenue FROM orders WHERE created_at >= DATE_TRUNC(\'month\', CURRENT_DATE)',
    dataSourceId: 'postgres-main',
    parameters: [],
    cache: {
      enabled: true,
      ttl: 300
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: 'user-growth-query',
    name: 'User Growth',
    description: 'Track user registration over time',
    sql: 'SELECT DATE(created_at) as date, COUNT(*) as new_users FROM users WHERE created_at >= $start_date GROUP BY DATE(created_at) ORDER BY date',
    dataSourceId: 'postgres-main',
    parameters: [
      {
        name: 'start_date',
        type: 'date',
        defaultValue: '2024-01-01',
        required: true
      }
    ],
    cache: {
      enabled: true,
      ttl: 3600
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
]

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'revenue-drop',
    name: 'Revenue Drop Alert',
    description: 'Alert when daily revenue drops below threshold',
    metricId: 'revenue',
    condition: {
      operator: 'lt',
      aggregation: 'sum',
      timeWindow: 1440 // 24 hours
    },
    threshold: 5000,
    severity: 'high',
    channels: [
      {
        type: 'email',
        destination: 'admin@company.com',
        template: 'Revenue has dropped below $5,000 today.'
      },
      {
        type: 'slack',
        destination: '#alerts',
        template: ':warning: Revenue Alert: Daily revenue below $5,000'
      }
    ],
    isActive: true,
    lastTriggered: undefined,
    cooldown: 60,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: 'high-traffic',
    name: 'High Traffic Alert',
    description: 'Alert when user traffic spikes significantly',
    metricId: 'users',
    condition: {
      operator: 'gt',
      aggregation: 'avg',
      timeWindow: 60 // 1 hour
    },
    threshold: 1000,
    severity: 'medium',
    channels: [
      {
        type: 'slack',
        destination: '#monitoring',
        template: ':rocket: Traffic spike detected: {{value}} users in the last hour'
      }
    ],
    isActive: true,
    lastTriggered: new Date(Date.now() - 3600000),
    cooldown: 30,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
]

// Mock Reports
export const mockReports: Report[] = [
  {
    id: 'weekly-summary',
    name: 'Weekly Business Summary',
    description: 'Comprehensive weekly business performance report',
    dashboardId: 'main-dashboard',
    schedule: {
      frequency: 'weekly',
      time: '09:00',
      dayOfWeek: 1, // Monday
      timezone: 'America/New_York'
    },
    format: 'pdf',
    recipients: ['ceo@company.com', 'cfo@company.com', 'admin@company.com'],
    lastGenerated: new Date(Date.now() - 86400000 * 3),
    nextScheduled: new Date(Date.now() + 86400000 * 4),
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: 'monthly-revenue',
    name: 'Monthly Revenue Report',
    description: 'Detailed monthly revenue analysis and trends',
    dashboardId: 'main-dashboard',
    schedule: {
      frequency: 'monthly',
      time: '08:00',
      dayOfMonth: 1,
      timezone: 'America/New_York'
    },
    format: 'excel',
    recipients: ['finance@company.com'],
    lastGenerated: new Date(Date.now() - 86400000 * 15),
    nextScheduled: new Date(Date.now() + 86400000 * 15),
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
]

// Utility functions
export function getMetricById(id: string): Metric | undefined {
  return mockMetrics.find(metric => metric.id === id)
}

export function getDashboardById(id: string): Dashboard | undefined {
  return mockDashboard.id === id ? mockDashboard : undefined
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id)
}

export function getDataSourceById(id: string): DataSource | undefined {
  return mockDataSources.find(ds => ds.id === id)
}

export function getQueryById(id: string): Query | undefined {
  return mockQueries.find(query => query.id === id)
}

export function getAlertById(id: string): Alert | undefined {
  return mockAlerts.find(alert => alert.id === id)
}

export function getReportById(id: string): Report | undefined {
  return mockReports.find(report => report.id === id)
}

// Generate additional mock data
export function generateRandomMetrics(count: number = 6): Metric[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `metric-${i + 1}`,
    name: faker.commerce.productName(),
    value: faker.number.int({ min: 100, max: 10000 }),
    previousValue: faker.number.int({ min: 100, max: 10000 }),
    change: faker.number.float({ min: -20, max: 30, precision: 0.1 }),
    changeType: faker.helpers.arrayElement(['increase', 'decrease', 'neutral']),
    format: faker.helpers.arrayElement(['number', 'currency', 'percentage']),
    icon: faker.helpers.arrayElement(['TrendingUp', 'Users', 'DollarSign', 'ShoppingCart']),
    color: faker.color.rgb({ format: 'hex' }),
    description: faker.lorem.sentence(),
    trend: faker.helpers.arrayElement(['up', 'down', 'stable'])
  }))
}

export function generateChartData(type: 'line' | 'bar' | 'pie', points: number = 12): ChartDataPoint[] {
  if (type === 'pie') {
    return Array.from({ length: points }, () => ({
      name: faker.commerce.department(),
      value: faker.number.int({ min: 10, max: 100 })
    }))
  }

  return Array.from({ length: points }, (_, i) => ({
    name: `Period ${i + 1}`,
    value: faker.number.int({ min: 100, max: 1000 }),
    category: faker.commerce.department()
  }))
}
