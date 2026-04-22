import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
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
import {
  mockReports,
  mockRevenueData,
  mockSalesByCategory,
  mockMetrics,
} from '../data/mockData'
import { formatDate, formatCurrency, formatNumber } from '../lib/utils'
import type { Report } from '../types/analytics'
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Search,
  ChevronLeft,
  FileSpreadsheet,
  FileDown,
  Play,
  Eye,
  Mail,
  CheckCircle2,
  BarChart3,
} from 'lucide-react'

const reportTypeLabels: Record<string, string> = {
  pdf: 'PDF',
  excel: 'Excel',
  csv: 'CSV',
  json: 'JSON',
}

const frequencyLabels: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
}

function getFormatIcon(format: string) {
  switch (format) {
    case 'pdf': return FileText
    case 'excel': return FileSpreadsheet
    case 'csv': return FileDown
    default: return FileText
  }
}

// Extra mock reports to fill the list
const additionalReports: Report[] = [
  {
    id: 'daily-traffic',
    name: 'Daily Traffic Analysis',
    description: 'Breakdown of daily website traffic and user sessions',
    dashboardId: 'main-dashboard',
    schedule: { frequency: 'daily', time: '07:00', timezone: 'UTC' },
    format: 'csv',
    recipients: ['marketing@company.com'],
    lastGenerated: new Date(Date.now() - 86400000),
    nextScheduled: new Date(Date.now() + 3600000),
    isActive: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
  {
    id: 'quarterly-exec',
    name: 'Quarterly Executive Summary',
    description: 'High-level KPI review for executive stakeholders',
    dashboardId: 'main-dashboard',
    schedule: { frequency: 'quarterly', time: '10:00', dayOfMonth: 1, timezone: 'America/New_York' },
    format: 'pdf',
    recipients: ['ceo@company.com', 'board@company.com'],
    lastGenerated: new Date(Date.now() - 86400000 * 45),
    nextScheduled: new Date(Date.now() + 86400000 * 45),
    isActive: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'conversion-funnel',
    name: 'Conversion Funnel Report',
    description: 'Detailed funnel analysis from visitor to customer',
    dashboardId: 'main-dashboard',
    schedule: { frequency: 'weekly', time: '09:00', dayOfWeek: 5, timezone: 'America/New_York' },
    format: 'excel',
    recipients: ['growth@company.com', 'product@company.com'],
    lastGenerated: new Date(Date.now() - 86400000 * 2),
    nextScheduled: new Date(Date.now() + 86400000 * 5),
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
]

const allReports = [...mockReports, ...additionalReports]

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReports = allReports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExportCSV = () => {
    const headers = ['Name', 'Format', 'Schedule', 'Last Generated', 'Status']
    const rows = allReports.map(r => [
      r.name,
      r.format,
      r.schedule?.frequency || 'N/A',
      r.lastGenerated ? formatDate(r.lastGenerated) : 'Never',
      r.isActive ? 'Active' : 'Paused',
    ])
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `reports-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (selectedReport) {
    return <ReportDetail report={selectedReport} onBack={() => setSelectedReport(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate, schedule, and manage automated reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{allReports.length}</p>
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
                <p className="text-2xl font-bold">{allReports.filter(r => r.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-yellow-50 text-yellow-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{allReports.filter(r => r.schedule).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recipients</p>
                <p className="text-2xl font-bold">
                  {new Set(allReports.flatMap(r => r.recipients || [])).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Report Name</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => {
                const FormatIcon = getFormatIcon(report.format)
                return (
                  <TableRow key={report.id} className="cursor-pointer" onClick={() => setSelectedReport(report)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-muted">
                          <FormatIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {reportTypeLabels[report.format]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {report.schedule ? frequencyLabels[report.schedule.frequency] : 'Manual'}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {report.lastGenerated ? formatDate(report.lastGenerated) : 'Never'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {report.nextScheduled ? formatDate(report.nextScheduled) : '-'}
                    </TableCell>
                    <TableCell>
                      {report.isActive ? (
                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Paused
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View Report">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Run Now">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

/* Report Detail View */
function ReportDetail({ report, onBack }: { report: Report; onBack: () => void }) {
  const revenueData = mockRevenueData.map(d => ({
    name: d.label,
    value: d.value,
  }))

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Button variant="ghost" size="sm" className="mb-4" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Reports
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{report.name}</h1>
            <p className="text-muted-foreground mt-1">{report.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Run Now
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download {reportTypeLabels[report.format]}
            </Button>
          </div>
        </div>
      </div>

      {/* Report Meta */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Format</p>
            <p className="text-lg font-semibold mt-1">{reportTypeLabels[report.format]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Schedule</p>
            <p className="text-lg font-semibold mt-1">
              {report.schedule ? `${frequencyLabels[report.schedule.frequency]} at ${report.schedule.time}` : 'Manual'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Last Generated</p>
            <p className="text-lg font-semibold mt-1">
              {report.lastGenerated ? formatDate(report.lastGenerated) : 'Never'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Recipients</p>
            <p className="text-lg font-semibold mt-1">{report.recipients?.length || 0} people</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview Charts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Report Preview</CardTitle>
          </div>
          <CardDescription>Visual summary of the data this report covers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-4">Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="reportRevGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#reportRevGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Sales by Category</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockSalesByCategory}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), 'Sales']} />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Key Metrics Summary</CardTitle>
          <CardDescription>Metrics included in this report</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Previous</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMetrics.slice(0, 5).map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">{metric.name}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {metric.format === 'currency'
                      ? formatCurrency(Number(metric.value))
                      : metric.format === 'percentage'
                        ? `${metric.value}%`
                        : typeof metric.value === 'number'
                          ? formatNumber(metric.value)
                          : metric.value}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">
                    {metric.previousValue
                      ? metric.format === 'currency'
                        ? formatCurrency(Number(metric.previousValue))
                        : metric.format === 'percentage'
                          ? `${metric.previousValue}%`
                          : typeof metric.previousValue === 'number'
                            ? formatNumber(metric.previousValue as number)
                            : metric.previousValue
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {metric.change !== undefined && (
                      <Badge
                        variant={metric.changeType === 'increase' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recipients */}
      {report.recipients && report.recipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recipients</CardTitle>
            <CardDescription>People who receive this report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {report.recipients.map((email) => (
                <Badge key={email} variant="outline" className="text-sm py-1 px-3">
                  <Mail className="h-3 w-3 mr-1.5" />
                  {email}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
