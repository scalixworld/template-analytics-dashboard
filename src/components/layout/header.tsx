import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, User, LogOut, Menu, Calendar } from 'lucide-react'
import { mockUsers } from '../../data/mockData'

const notifications = [
  {
    id: 1,
    title: 'Revenue Alert',
    message: 'Daily revenue exceeded target by 15%',
    time: '2 minutes ago',
    type: 'success'
  },
  {
    id: 2,
    title: 'System Alert',
    message: 'Database backup completed successfully',
    time: '1 hour ago',
    type: 'info'
  },
  {
    id: 3,
    title: 'Performance Warning',
    message: 'Server response time above threshold',
    time: '3 hours ago',
    type: 'warning'
  }
]

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/reports': 'Reports',
  '/alerts': 'Alerts',
  '/data-sources': 'Data Sources',
  '/settings': 'Settings',
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('30d')
  const location = useLocation()
  const currentUser = mockUsers[0]

  const pageTitle = location.pathname.startsWith('/dashboard/')
    ? 'Dashboard'
    : pageTitles[location.pathname] || 'Dashboard'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-muted-foreground lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Page title + search */}
        <div className="flex items-center gap-x-4 flex-1">
          <h1 className="text-lg font-semibold hidden sm:block">{pageTitle}</h1>
          <form onSubmit={handleSearch} className="relative flex flex-1 max-w-md">
            <Search
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground ml-3"
              aria-hidden="true"
            />
            <Input
              className="h-9 w-full pl-10 text-sm"
              placeholder="Search dashboards, reports..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Time Range Selector */}
          <div className="hidden md:flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${getNotificationColor(notification.type)}`} />
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-4">{notification.message}</p>
                  <span className="text-xs text-muted-foreground mt-1 ml-4">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
