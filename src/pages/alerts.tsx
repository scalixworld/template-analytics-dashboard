import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAlerts, mockMetrics } from '../data/mockData'
import { formatDate } from '../lib/utils'
import type { Alert, AlertCondition } from '../types/analytics'
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  Zap,
  Search,
  Plus,
  Mail,
  MessageSquare,
  Webhook,
  Smartphone,
  Clock,
  CheckCircle2,
  PauseCircle,
  Shield,
  Activity,
} from 'lucide-react'

const operatorLabels: Record<string, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  neq: '!=',
}

const aggregationLabels: Record<string, string> = {
  avg: 'Average',
  sum: 'Sum',
  min: 'Minimum',
  max: 'Maximum',
  count: 'Count',
}

function getChannelIcon(type: string) {
  switch (type) {
    case 'email': return Mail
    case 'slack': return MessageSquare
    case 'webhook': return Webhook
    case 'sms': return Smartphone
    default: return Bell
  }
}

function getSeverityConfig(severity: string) {
  switch (severity) {
    case 'critical':
      return { icon: Zap, color: 'text-red-700', bg: 'bg-red-50 border-red-200', badgeBg: 'bg-red-100 text-red-700 hover:bg-red-100' }
    case 'high':
      return { icon: AlertTriangle, color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', badgeBg: 'bg-orange-100 text-orange-700 hover:bg-orange-100' }
    case 'medium':
      return { icon: AlertCircle, color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', badgeBg: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' }
    case 'low':
      return { icon: Info, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', badgeBg: 'bg-blue-100 text-blue-700 hover:bg-blue-100' }
    default:
      return { icon: Info, color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200', badgeBg: 'bg-gray-100 text-gray-700 hover:bg-gray-100' }
  }
}

function formatCondition(condition: AlertCondition, threshold: number): string {
  const op = operatorLabels[condition.operator] || condition.operator
  const agg = condition.aggregation ? `${aggregationLabels[condition.aggregation] || condition.aggregation} ` : ''
  const window = condition.timeWindow ? ` (${condition.timeWindow >= 1440 ? `${(condition.timeWindow / 1440).toFixed(0)}d` : condition.timeWindow >= 60 ? `${(condition.timeWindow / 60).toFixed(0)}h` : `${condition.timeWindow}m`})` : ''
  return `${agg}${op} ${threshold.toLocaleString()}${window}`
}

function getMetricName(metricId: string): string {
  const metric = mockMetrics.find(m => m.id === metricId)
  return metric?.name || metricId
}

// Additional alerts for a richer display
const additionalAlerts: Alert[] = [
  {
    id: 'error-rate-spike',
    name: 'Error Rate Spike',
    description: 'Alert when application error rate exceeds normal levels',
    metricId: 'bounce-rate',
    condition: { operator: 'gt', aggregation: 'avg', timeWindow: 30 },
    threshold: 5,
    severity: 'critical',
    channels: [
      { type: 'slack', destination: '#engineering', template: 'Error rate spike: {{value}}% in the last 30 min' },
      { type: 'email', destination: 'oncall@company.com' },
    ],
    isActive: true,
    lastTriggered: new Date(Date.now() - 7200000),
    cooldown: 15,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: 'low-conversion',
    name: 'Low Conversion Warning',
    description: 'Notify when conversion rate drops below target',
    metricId: 'conversion',
    condition: { operator: 'lt', aggregation: 'avg', timeWindow: 1440 },
    threshold: 2.5,
    severity: 'medium',
    channels: [
      { type: 'email', destination: 'growth@company.com' },
    ],
    isActive: true,
    lastTriggered: undefined,
    cooldown: 120,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
  {
    id: 'order-volume',
    name: 'Order Volume Threshold',
    description: 'Alert when hourly order count exceeds capacity',
    metricId: 'orders',
    condition: { operator: 'gt', aggregation: 'count', timeWindow: 60 },
    threshold: 200,
    severity: 'low',
    channels: [
      { type: 'slack', destination: '#operations' },
    ],
    isActive: false,
    lastTriggered: new Date(Date.now() - 86400000 * 7),
    cooldown: 60,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
]

const allAlerts = [...mockAlerts, ...additionalAlerts]

export function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all')
  const [filterSeverity, setFilterSeverity] = useState<string>('all')

  const filteredAlerts = allAlerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' ? alert.isActive : !alert.isActive)
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const activeCount = allAlerts.filter(a => a.isActive).length
  const triggeredToday = allAlerts.filter(a => {
    if (!a.lastTriggered) return false
    const today = new Date()
    return a.lastTriggered.toDateString() === today.toDateString()
  }).length
  const criticalCount = allAlerts.filter(a => a.severity === 'critical' && a.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor KPIs and get notified of important changes
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{allAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-50 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-yellow-50 text-yellow-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Triggered Today</p>
                <p className="text-2xl font-bold">{triggeredToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-red-50 text-red-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Active</p>
                <p className="text-2xl font-bold">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[280px]">Alert</TableHead>
                <TableHead>Metric</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => {
                const severityConfig = getSeverityConfig(alert.severity)
                const SeverityIcon = severityConfig.icon
                return (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md border ${severityConfig.bg}`}>
                          <SeverityIcon className={`h-4 w-4 ${severityConfig.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{alert.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                        {getMetricName(alert.metricId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {formatCondition(alert.condition, alert.threshold)}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs border-0 ${severityConfig.badgeBg}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {alert.channels.map((channel, i) => {
                          const ChannelIcon = getChannelIcon(channel.type)
                          return (
                            <div
                              key={i}
                              className="p-1 rounded bg-muted"
                              title={`${channel.type}: ${channel.destination}`}
                            >
                              <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          )
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {alert.lastTriggered ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDate(alert.lastTriggered)}
                        </div>
                      ) : (
                        <span className="text-xs">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {alert.isActive ? (
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs font-medium text-green-700">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <PauseCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">Paused</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alert History Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Alert Activity</CardTitle>
          <CardDescription>Latest alert triggers and resolutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { alert: 'Error Rate Spike', time: '2 hours ago', type: 'triggered', severity: 'critical' },
              { alert: 'High Traffic Alert', time: '1 hour ago', type: 'triggered', severity: 'medium' },
              { alert: 'High Traffic Alert', time: '45 min ago', type: 'resolved', severity: 'medium' },
              { alert: 'Revenue Drop Alert', time: '3 days ago', type: 'triggered', severity: 'high' },
              { alert: 'Revenue Drop Alert', time: '3 days ago', type: 'resolved', severity: 'high' },
            ].map((event, i) => {
              const config = getSeverityConfig(event.severity)
              const SevIcon = config.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md border ${config.bg}`}>
                    <SevIcon className={`h-3.5 w-3.5 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{event.alert}</span>
                      <span className="text-muted-foreground"> was </span>
                      <span className={event.type === 'triggered' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                        {event.type}
                      </span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
