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
import { mockDataSources, mockQueries } from '../data/mockData'
import { formatDate, formatNumber } from '../lib/utils'
import type { DataSource } from '../types/analytics'
import {
  Database,
  Globe,
  FileUp,
  Radio,
  Plus,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Table2,
  Layers,
  HardDrive,
  Plug,
  Code,
  Copy,
  Zap,
  Server,
} from 'lucide-react'

function getSourceTypeIcon(type: string) {
  switch (type) {
    case 'database': return Database
    case 'api': return Globe
    case 'file': return FileUp
    case 'streaming': return Radio
    default: return Database
  }
}

function getSourceTypeColor(type: string) {
  switch (type) {
    case 'database': return 'text-blue-600 bg-blue-50'
    case 'api': return 'text-purple-600 bg-purple-50'
    case 'file': return 'text-green-600 bg-green-50'
    case 'streaming': return 'text-orange-600 bg-orange-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

function getStatusConfig(isActive: boolean, lastSync?: Date) {
  if (!isActive) {
    return { icon: XCircle, label: 'Disconnected', color: 'text-red-600', dotColor: 'bg-red-500' }
  }
  if (lastSync) {
    const minutesSinceSync = (Date.now() - lastSync.getTime()) / 60000
    if (minutesSinceSync > 60) {
      return { icon: AlertCircle, label: 'Stale', color: 'text-yellow-600', dotColor: 'bg-yellow-500' }
    }
  }
  return { icon: CheckCircle2, label: 'Connected', color: 'text-green-600', dotColor: 'bg-green-500' }
}

function formatRefreshInterval(seconds?: number): string {
  if (!seconds) return 'Manual'
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  return `${Math.round(seconds / 3600)}h`
}

// Additional data sources for richer display
const additionalSources: DataSource[] = [
  {
    id: 'stripe-api',
    name: 'Stripe Payments',
    type: 'api',
    config: {
      baseUrl: 'https://api.stripe.com/v1',
      apiKey: 'sk_live_***',
    },
    isActive: true,
    lastSync: new Date(Date.now() - 300000),
    refreshInterval: 600,
  },
  {
    id: 'csv-uploads',
    name: 'CSV Data Uploads',
    type: 'file',
    config: {
      uploadDir: '/data/uploads',
      format: 'csv',
    },
    isActive: true,
    lastSync: new Date(Date.now() - 86400000 * 2),
    refreshInterval: undefined,
  },
  {
    id: 'kafka-events',
    name: 'Event Stream (Kafka)',
    type: 'streaming',
    config: {
      brokers: ['kafka-1:9092', 'kafka-2:9092'],
      topics: ['user-events', 'order-events'],
    },
    isActive: false,
    lastSync: new Date(Date.now() - 86400000 * 5),
    refreshInterval: 0,
  },
  {
    id: 'mysql-analytics',
    name: 'Analytics MySQL Replica',
    type: 'database',
    connectionString: 'mysql://readonly:***@replica.db.internal:3306/analytics',
    config: {
      host: 'replica.db.internal',
      port: 3306,
      database: 'analytics',
    },
    isActive: true,
    lastSync: new Date(Date.now() - 120000),
    refreshInterval: 60,
    tables: [
      {
        name: 'page_views',
        schema: [
          { key: 'id', label: 'ID', type: 'text' },
          { key: 'url', label: 'URL', type: 'text' },
          { key: 'timestamp', label: 'Timestamp', type: 'date' },
        ],
        rowCount: 2450000,
        lastUpdated: new Date(),
      },
      {
        name: 'sessions',
        schema: [
          { key: 'id', label: 'Session ID', type: 'text' },
          { key: 'user_id', label: 'User ID', type: 'text' },
          { key: 'duration', label: 'Duration', type: 'number' },
        ],
        rowCount: 875000,
        lastUpdated: new Date(),
      },
    ],
  },
]

const allSources = [...mockDataSources, ...additionalSources]

export function DataSourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredSources = allSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const connectedCount = allSources.filter(s => s.isActive).length
  const totalTables = allSources.reduce((acc, s) => acc + (s.tables?.length || 0), 0)
  const totalRows = allSources.reduce((acc, s) => acc + (s.tables?.reduce((t, table) => t + (table.rowCount || 0), 0) || 0), 0)

  if (selectedSource) {
    return <DataSourceDetail source={selectedSource} onBack={() => setSelectedSource(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground mt-1">
            Connect and manage your data pipelines
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                <Plug className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">{allSources.length}</p>
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
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold">{connectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                <Table2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tables</p>
                <p className="text-2xl font-bold">{totalTables}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-orange-50 text-orange-600">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rows</p>
                <p className="text-2xl font-bold">{totalRows > 1000000 ? `${(totalRows / 1000000).toFixed(1)}M` : formatNumber(totalRows)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search data sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 border rounded-md p-0.5">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 px-3"
            onClick={() => setViewMode('grid')}
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 px-3"
            onClick={() => setViewMode('list')}
          >
            <Table2 className="h-3.5 w-3.5 mr-1" />
            List
          </Button>
        </div>
      </div>

      {/* Data Sources Grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSources.map((source) => {
            const TypeIcon = getSourceTypeIcon(source.type)
            const typeColor = getSourceTypeColor(source.type)
            const status = getStatusConfig(source.isActive, source.lastSync)
            const StatusIcon = status.icon
            return (
              <Card
                key={source.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedSource(source)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${typeColor}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${status.dotColor}`} />
                      <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base mt-3">{source.name}</CardTitle>
                  <CardDescription className="text-xs uppercase tracking-wider">
                    {source.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {source.tables && source.tables.length > 0 && (
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Table2 className="h-3.5 w-3.5" />
                          Tables
                        </span>
                        <span className="font-medium text-foreground">{source.tables.length}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                      </span>
                      <span className="font-medium text-foreground">{formatRefreshInterval(source.refreshInterval)}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Last Sync
                      </span>
                      <span className="font-medium text-foreground">
                        {source.lastSync ? formatDate(source.lastSync, 'MMM dd, HH:mm') : 'Never'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tables</TableHead>
                  <TableHead>Refresh</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSources.map((source) => {
                  const TypeIcon = getSourceTypeIcon(source.type)
                  const typeColor = getSourceTypeColor(source.type)
                  const status = getStatusConfig(source.isActive, source.lastSync)
                  return (
                    <TableRow key={source.id} className="cursor-pointer" onClick={() => setSelectedSource(source)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-md ${typeColor}`}>
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-sm">{source.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize">{source.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className={`h-2 w-2 rounded-full ${status.dotColor}`} />
                          <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{source.tables?.length || 0}</TableCell>
                      <TableCell className="text-sm">{formatRefreshInterval(source.refreshInterval)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {source.lastSync ? formatDate(source.lastSync, 'MMM dd, HH:mm') : 'Never'}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Sync Now">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Saved Queries */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Saved Queries</CardTitle>
              <CardDescription>Reusable queries across your data sources</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Code className="h-4 w-4 mr-2" />
              New Query
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockQueries.map((query) => {
              const source = allSources.find(s => s.id === query.dataSourceId)
              return (
                <div key={query.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="p-1.5 rounded-md bg-muted">
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{query.name}</p>
                      {query.cache?.enabled && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          Cached {formatRefreshInterval(query.cache.ttl)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{query.description}</p>
                    {query.sql && (
                      <code className="block text-xs bg-muted px-2 py-1.5 rounded mt-2 font-mono text-muted-foreground truncate">
                        {query.sql}
                      </code>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      <Server className="h-3 w-3 mr-1" />
                      {source?.name || query.dataSourceId}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Copy Query">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* Data Source Detail View */
function DataSourceDetail({ source, onBack }: { source: DataSource; onBack: () => void }) {
  const TypeIcon = getSourceTypeIcon(source.type)
  const typeColor = getSourceTypeColor(source.type)
  const status = getStatusConfig(source.isActive, source.lastSync)

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" className="mb-4" onClick={onBack}>
          <span className="mr-1">&larr;</span>
          Back to Data Sources
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${typeColor}`}>
              <TypeIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{source.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="outline" className="text-xs capitalize">{source.type}</Badge>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${status.dotColor}`} />
                  <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Connection Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Refresh Interval</p>
            <p className="text-lg font-semibold mt-1">{formatRefreshInterval(source.refreshInterval)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Last Sync</p>
            <p className="text-lg font-semibold mt-1">
              {source.lastSync ? formatDate(source.lastSync) : 'Never'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tables Available</p>
            <p className="text-lg font-semibold mt-1">{source.tables?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      {source.tables && source.tables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tables</CardTitle>
            <CardDescription>Available tables from this data source</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Columns</TableHead>
                  <TableHead className="text-right">Row Count</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {source.tables.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Table2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium font-mono text-sm">{table.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{table.schema.length} columns</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      {table.rowCount ? formatNumber(table.rowCount) : '-'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {table.lastUpdated ? formatDate(table.lastUpdated) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Schema Details */}
      {source.tables && source.tables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Schema Details</CardTitle>
            <CardDescription>Column definitions for each table</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {source.tables.map((table) => (
                <div key={table.name}>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Table2 className="h-4 w-4 text-muted-foreground" />
                    {table.name}
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {table.schema.map((col) => (
                      <div key={col.key} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border text-sm">
                        <code className="font-mono font-medium">{col.key}</code>
                        <Badge variant="outline" className="text-xs ml-auto">{col.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Configuration</CardTitle>
          <CardDescription>Connection and setup details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {source.connectionString && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Connection String</p>
                  <code className="text-sm font-mono">
                    {source.connectionString.replace(/:[^:@]*@/, ':***@')}
                  </code>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Copy">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
            {Object.entries(source.config)
              .filter(([key]) => !['password', 'apiKey'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm font-medium font-mono">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
