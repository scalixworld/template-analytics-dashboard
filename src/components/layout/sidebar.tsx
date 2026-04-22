import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import {
  BarChart3,
  FileText,
  Bell,
  Database,
  Settings,
  Home,
  TrendingUp,
  PieChart,
  Users,
  DollarSign
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Data Sources', href: '/data-sources', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const quickStats = [
  { label: 'Revenue', value: '$284.7k', change: '+15.9%', icon: DollarSign, color: 'text-green-600' },
  { label: 'Users', value: '12.4k', change: '+4.7%', icon: Users, color: 'text-blue-600' },
  { label: 'Conversion', value: '3.24%', change: '+0.26%', icon: TrendingUp, color: 'text-yellow-600' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      {/* Logo */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-900 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">scalix-analytics-dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'h-6 w-6 shrink-0',
                            isActive ? 'text-primary-foreground' : 'text-gray-400 group-hover:text-primary'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Quick Stats */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider">
                Quick Stats
              </div>
              <ul role="list" className="mt-2 space-y-1">
                {quickStats.map((stat) => (
                  <li key={stat.label} className="flex items-center gap-2 rounded-md p-2 text-sm">
                    <stat.icon className={cn('h-4 w-4', stat.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {stat.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                    </div>
                    <span className={cn('text-xs font-medium', stat.color)}>
                      {stat.change}
                    </span>
                  </li>
                ))}
              </ul>
            </li>

            {/* Recent Dashboards */}
            <li className="mt-auto">
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider">
                Recent
              </div>
              <ul role="list" className="mt-2 space-y-1">
                <li>
                  <Link
                    to="/dashboard/main-dashboard"
                    className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <PieChart className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                    Main Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/sales-dashboard"
                    className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                    Sales Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
