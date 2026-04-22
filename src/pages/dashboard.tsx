import { useParams } from 'react-router-dom'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from '../components/analytics/metricCard'
import {
  mockMetrics,
  mockRevenueData,
  mockUsersData,
  mockTrafficSources,
  mockDeviceData,
  mockSalesByCategory,
  mockTopPages,
  generateTimeSeriesData,
} from '../data/mockData'
import { formatCurrency, formatNumber, generateColorPalette } from '../lib/utils'
import {
  ShoppingCart,
  UserPlus,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Clock,
} from 'lucide-react'

const topMetrics = mockMetrics.slice(0, 4)

const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

const recentActivity = [
  { id: 1, event: 'New user signup', user: 'sarah.chen@example.com', time: '2 min ago', icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
  { id: 2, event: 'Order completed', user: 'mike.johnson@example.com', time: '5 min ago', icon: ShoppingCart, color: 'text-green-600 bg-green-50' },
  { id: 3, event: 'Payment received', user: 'alex.kumar@example.com', time: '12 min ago', icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
  { id: 4, event: 'New user signup', user: 'emma.wilson@example.com', time: '18 min ago', icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
  { id: 5, event: 'Page view spike', user: '/products/featured', time: '25 min ago', icon: Globe, color: 'text-yellow-600 bg-yellow-50' },
  { id: 6, event: 'Order completed', user: 'james.brown@example.com', time: '32 min ago', icon: ShoppingCart, color: 'text-green-600 bg-green-50' },
  { id: 7, event: 'Session timeout', user: 'lisa.park@example.com', time: '45 min ago', icon: Clock, color: 'text-gray-600 bg-gray-50' },
]

const conversionData = generateTimeSeriesData(14, 3.2, 0.08).map(d => ({
  ...d,
  name: d.label,
  value: +(d.value / 1000 * 3.2).toFixed(2),
}))

export function DashboardPage() {
  const { id } = useParams()

  const revenueChartData = mockRevenueData.map(d => ({
    name: d.label,
    revenue: d.value,
    label: d.label,
  }))

  const usersChartData = mockUsersData.map(d => ({
    name: d.label,
    users: d.value,
    label: d.label,
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {id ? 'Sales Dashboard' : 'Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your key business metrics and analytics
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {topMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Row - Revenue + Users Trend */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Area Chart - wider */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over the last 30 days</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="font-medium">+15.9%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
            <CardDescription>Visitor distribution by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockTrafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockTrafficSources.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Share']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row - Users + Sales by Category */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users Bar Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Active Users</CardTitle>
                <CardDescription>Daily active users over the last 30 days</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="font-medium">+4.7%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={usersChartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), 'Users']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockSalesByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mockSalesByCategory.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={generateColorPalette(5)[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Conversion + Top Pages + Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversion Rate Line Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Conversion Rate</CardTitle>
                <CardDescription>Last 14 days trend</CardDescription>
              </div>
              <Badge variant="default" className="text-xs">3.24%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Conversion']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Pages Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTopPages.map((page, i) => {
                const maxValue = mockTopPages[0].value
                const percentage = (page.value / maxValue) * 100
                return (
                  <div key={page.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-4 text-right">{i + 1}.</span>
                        <span className="font-medium truncate">{page.name}</span>
                      </div>
                      <span className="text-muted-foreground tabular-nums">
                        {formatNumber(page.value)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest events across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md shrink-0 ${activity.color}`}>
                    <activity.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{activity.event}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {activity.user}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {mockDeviceData.map((device, index) => {
          const colors = ['#3b82f6', '#10b981', '#f59e0b']
          const icons = ['Desktop', 'Mobile', 'Tablet']
          const trend = index === 0 ? -2.1 : index === 1 ? 5.3 : -1.4
          return (
            <Card key={device.name}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{device.name} Traffic</p>
                    <p className="text-2xl font-bold mt-1">{device.value}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      {trend > 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 relative">
                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={colors[index]}
                        strokeWidth="3"
                        strokeDasharray={`${device.value}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
