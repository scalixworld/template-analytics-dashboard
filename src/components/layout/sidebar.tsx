import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import {
  BarChart3,
  FileText,
  Bell,
  Database,
  Settings,
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Users,
  DollarSign,
  X
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
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

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()

  const sidebarContent = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">{'scalix-analytics-dashboard'}</span>
        </Link>
        <button
          type="button"
          className="lg:hidden -m-2.5 p-2.5 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider mb-2">
              Navigation
            </div>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = item.href === '/'
                  ? location.pathname === '/' || location.pathname.startsWith('/dashboard')
                  : location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 shrink-0',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
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
            <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider">
              Quick Stats
            </div>
            <ul role="list" className="mt-2 space-y-1">
              {quickStats.map((stat) => (
                <li key={stat.label} className="flex items-center gap-2 rounded-md p-2 text-sm">
                  <stat.icon className={cn('h-4 w-4', stat.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">
                      {stat.label}
                    </p>
                    <p className="text-sm font-semibold">
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
            <div className="text-xs font-semibold leading-6 text-muted-foreground uppercase tracking-wider">
              Recent
            </div>
            <ul role="list" className="mt-2 space-y-1">
              <li>
                <Link
                  to="/"
                  onClick={onClose}
                  className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <PieChart className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                  Main Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/sales-dashboard"
                  onClick={onClose}
                  className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                  Sales Dashboard
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div className="relative z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-64 flex-1 animate-slide-in">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {sidebarContent}
      </div>
    </>
  )
}
