import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Metric } from "../../types/analytics"
import { formatCurrency, formatNumber, formatPercentage, getChangeType, getTrend } from "../../lib/utils"
import { TrendingUp, TrendingDown, Minus, DollarSign, Users, ShoppingCart, Activity, Clock } from 'lucide-react'

interface MetricCardProps {
  metric: Metric
  className?: string
}

const iconMap = {
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const formatValue = (value: number | string, format: Metric['format']) => {
    if (typeof value === 'string') return value

    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return formatPercentage(value)
      case 'number':
        return formatNumber(value)
      default:
        return value.toString()
    }
  }

  const changeType = getChangeType(metric.change || 0)
  const trend = getTrend(metric.change || 0)

  const IconComponent = metric.icon ? iconMap[metric.icon as keyof typeof iconMap] || Activity : Activity

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />
      case 'down':
        return <TrendingDown className="w-3 h-3" />
      default:
        return <Minus className="w-3 h-3" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.name}
        </CardTitle>
        <div className="text-muted-foreground">
          <IconComponent className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatValue(metric.value, metric.format)}
        </div>

        {metric.change !== undefined && (
          <div className="flex items-center space-x-2 mt-2">
            <Badge
              variant={changeType === 'increase' ? 'default' : changeType === 'decrease' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {getChangeIcon()}
              <span className="ml-1">
                {metric.change > 0 ? '+' : ''}{formatPercentage(Math.abs(metric.change))}
              </span>
            </Badge>

            {metric.previousValue && (
              <p className="text-xs text-muted-foreground">
                from {formatValue(metric.previousValue, metric.format)}
              </p>
            )}
          </div>
        )}

        {metric.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {metric.description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
