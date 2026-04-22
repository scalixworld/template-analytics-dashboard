import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig } from "../../types/analytics"
import { generateColorPalette, formatDate } from "../../lib/utils"

interface ChartComponentProps {
  config: ChartConfig
  className?: string
}

export function ChartComponent({ config, className }: ChartComponentProps) {
  const colors = config.colors || generateColorPalette(config.data.length)

  const formatTooltipValue = (value: any, name: string) => {
    if (typeof value === 'number') {
      return [value.toLocaleString(), name]
    }
    return [value, name]
  }

  const formatXAxisLabel = (tickItem: any) => {
    if (tickItem instanceof Date) {
      return formatDate(tickItem, 'MMM dd')
    }
    return tickItem
  }

  const renderChart = () => {
    const commonProps = {
      data: config.data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (config.type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey={config.xAxisKey || 'name'}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
            <Line
              type={config.smooth ? "monotone" : "linear"}
              dataKey={config.yAxisKey || 'value'}
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2 }}
            />
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey={config.xAxisKey || 'name'}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
            <Area
              type={config.smooth ? "monotone" : "linear"}
              dataKey={config.yAxisKey || 'value'}
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
            />
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey={config.xAxisKey || 'name'}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
            <Bar
              dataKey={config.yAxisKey || 'value'}
              fill={colors[0]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={config.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={config.yAxisKey || 'value'}
            >
              {config.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
          </PieChart>
        )

      case 'donut':
        return (
          <PieChart>
            <Pie
              data={config.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey={config.yAxisKey || 'value'}
            >
              {config.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
          </PieChart>
        )

      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={config.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={config.xAxisKey || 'name'} />
            <PolarRadiusAxis />
            <Radar
              name={config.title}
              dataKey={config.yAxisKey || 'value'}
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
            />
            <Tooltip />
          </RadarChart>
        )

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey={config.xAxisKey || 'name'}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            {config.showLegend && <Legend />}
            <Scatter
              name={config.title}
              dataKey={config.yAxisKey || 'value'}
              fill={colors[0]}
            />
          </ScatterChart>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Chart type "{config.type}" not supported
          </div>
        )
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        {config.title !== config.title.toLowerCase() && (
          <CardDescription>
            {config.title.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={config.height || 300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
