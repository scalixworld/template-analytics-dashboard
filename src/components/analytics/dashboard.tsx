import { Dashboard as DashboardType, DashboardWidget } from "../../types/analytics"
import { MetricCard } from "./metricCard"
import { ChartComponent } from "./chart"
import { DataTable } from "./dataTable"
import { exportToCSV, exportToJSON } from "../../lib/utils"

interface DashboardProps {
  dashboard: DashboardType
  className?: string
}

export function Dashboard({ dashboard, className }: DashboardProps) {
  const renderWidget = (widget: DashboardWidget) => {
    const widgetClass = `col-span-${widget.position.width} row-span-${widget.position.height}`

    switch (widget.type) {
      case 'metric':
        return (
          <div key={widget.id} className={widgetClass}>
            <MetricCard metric={widget.config as any} />
          </div>
        )

      case 'chart':
        return (
          <div key={widget.id} className={widgetClass}>
            <ChartComponent config={widget.config as any} />
          </div>
        )

      case 'table':
        const handleExport = (format: 'csv' | 'json') => {
          const data = (widget.config as any).data
          const filename = `${widget.title || 'export'}-${new Date().toISOString().split('T')[0]}`

          if (format === 'csv') {
            exportToCSV(data, filename)
          } else {
            exportToJSON(data, filename)
          }
        }

        return (
          <div key={widget.id} className={widgetClass}>
            <DataTable
              config={widget.config as any}
              title={widget.title}
              description={widget.description}
              onExport={handleExport}
            />
          </div>
        )

      case 'text':
        return (
          <div key={widget.id} className={widgetClass}>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
              {widget.description && (
                <p className="text-sm text-muted-foreground mb-4">{widget.description}</p>
              )}
              <div className="prose prose-sm max-w-none">
                {(widget.config as any).content}
              </div>
            </div>
          </div>
        )

      case 'image':
        return (
          <div key={widget.id} className={widgetClass}>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{widget.title}</h3>
              {widget.description && (
                <p className="text-sm text-muted-foreground mb-4">{widget.description}</p>
              )}
              <img
                src={(widget.config as any).src}
                alt={(widget.config as any).alt}
                className="w-full h-auto rounded-md"
                style={{
                  objectFit: (widget.config as any).fit || 'cover'
                }}
              />
            </div>
          </div>
        )

      default:
        return (
          <div key={widget.id} className={widgetClass}>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
              <div className="text-muted-foreground">
                Widget type "{widget.type}" not supported
              </div>
            </div>
          </div>
        )
    }
  }

  const getGridClasses = () => {
    switch (dashboard.layout) {
      case 'grid':
        return 'grid grid-cols-12 gap-6'
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
      case 'flex':
        return 'flex flex-wrap gap-6'
      default:
        return 'grid grid-cols-12 gap-6'
    }
  }

  return (
    <div className={className}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{dashboard.name}</h1>
        {dashboard.description && (
          <p className="text-muted-foreground mt-2">{dashboard.description}</p>
        )}
        {dashboard.tags && dashboard.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {dashboard.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dashboard Widgets */}
      <div className={getGridClasses()}>
        {dashboard.widgets
          .sort((a, b) => {
            // Sort by position (top to bottom, left to right)
            if (a.position.y !== b.position.y) {
              return a.position.y - b.position.y
            }
            return a.position.x - b.position.x
          })
          .map(renderWidget)}
      </div>

      {/* Dashboard Footer */}
      <div className="mt-12 pt-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>Last updated: {dashboard.updatedAt.toLocaleString()}</p>
          <p className="mt-1">
            Created by {dashboard.createdBy} • {dashboard.widgets.length} widgets
          </p>
        </div>
      </div>
    </div>
  )
}
