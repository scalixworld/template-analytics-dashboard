import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockUsers } from '../data/mockData'
import { formatDate } from '../lib/utils'
import {
  Settings as SettingsIcon,
  Bell,
  Users,
  Database,
  Shield,
  Globe,
  Clock,
  Palette,
  Save,
  RefreshCw,
  Mail,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Laptop,
  Key,
  Trash2,
  UserPlus,
} from 'lucide-react'

export function SettingsPage() {
  const [dashboardName, setDashboardName] = useState('scalix-analytics-dashboard')
  const [timezone, setTimezone] = useState('America/New_York')
  const [dateFormat, setDateFormat] = useState('MM/dd/yyyy')
  const [language, setLanguage] = useState('en-US')
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [slackNotifications, setSlackNotifications] = useState(true)
  const [alertDigest, setAlertDigest] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [digestFrequency, setDigestFrequency] = useState('daily')

  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState('300')
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [cacheTTL, setCacheTTL] = useState('600')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your analytics dashboard preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            Data & Refresh
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic dashboard settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dashboard-name">Dashboard Name</Label>
                  <Input
                    id="dashboard-name"
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This name appears in the sidebar and page titles
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Berlin">Berlin (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Kolkata">Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <select
                    id="date-format"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                    <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                    <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                    <option value="MMM dd, yyyy">MMM DD, YYYY</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: 'light' as const, icon: Sun, label: 'Light', desc: 'Light theme for daytime' },
                  { value: 'dark' as const, icon: Moon, label: 'Dark', desc: 'Dark theme for low light' },
                  { value: 'auto' as const, icon: Laptop, label: 'System', desc: 'Follow system preference' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                      theme === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <option.icon className={`h-6 w-6 ${theme === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="text-center">
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                Notification Channels
              </CardTitle>
              <CardDescription>Choose how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive alerts and reports via email</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Browser push notifications for real-time alerts</p>
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-green-50 text-green-600">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Slack Notifications</p>
                    <p className="text-xs text-muted-foreground">Send alerts to Slack channels</p>
                  </div>
                </div>
                <Switch
                  checked={slackNotifications}
                  onCheckedChange={setSlackNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure notification frequency and digests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Alert Digest</p>
                  <p className="text-xs text-muted-foreground">Group non-critical alerts into a digest</p>
                </div>
                <Switch
                  checked={alertDigest}
                  onCheckedChange={setAlertDigest}
                />
              </div>
              {alertDigest && (
                <div className="ml-0 pl-4 border-l-2 border-primary/20 space-y-2">
                  <Label htmlFor="digest-frequency" className="text-sm">Digest Frequency</Label>
                  <select
                    id="digest-frequency"
                    value={digestFrequency}
                    onChange={(e) => setDigestFrequency(e.target.value)}
                    className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekly Summary Report</p>
                  <p className="text-xs text-muted-foreground">Receive a weekly summary of all dashboard metrics</p>
                </div>
                <Switch
                  checked={weeklyReport}
                  onCheckedChange={setWeeklyReport}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    Team Members
                  </CardTitle>
                  <CardDescription>Manage who has access to this dashboard</CardDescription>
                </div>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Theme</TableHead>
                    <TableHead>Timezone</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === 'admin' ? 'default' : user.role === 'editor' ? 'secondary' : 'outline'}
                          className="text-xs capitalize"
                        >
                          {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm capitalize">{user.preferences.theme}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.preferences.timezone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs font-medium text-green-700">Active</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit Permissions">
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Remove User">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                Role Permissions
              </CardTitle>
              <CardDescription>Define what each role can do</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                    <TableHead className="text-center">Editor</TableHead>
                    <TableHead className="text-center">Viewer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'View dashboards', admin: true, editor: true, viewer: true },
                    { name: 'Create dashboards', admin: true, editor: true, viewer: false },
                    { name: 'Edit dashboards', admin: true, editor: true, viewer: false },
                    { name: 'Delete dashboards', admin: true, editor: false, viewer: false },
                    { name: 'Manage data sources', admin: true, editor: false, viewer: false },
                    { name: 'Configure alerts', admin: true, editor: true, viewer: false },
                    { name: 'Generate reports', admin: true, editor: true, viewer: true },
                    { name: 'Export data', admin: true, editor: true, viewer: true },
                    { name: 'Manage users', admin: true, editor: false, viewer: false },
                    { name: 'Manage settings', admin: true, editor: false, viewer: false },
                  ].map((perm) => (
                    <TableRow key={perm.name}>
                      <TableCell className="text-sm font-medium">{perm.name}</TableCell>
                      <TableCell className="text-center">
                        {perm.admin ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs">&#10003;</span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs">&#10005;</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.editor ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs">&#10003;</span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs">&#10005;</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {perm.viewer ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs">&#10003;</span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs">&#10005;</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data & Refresh Settings */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                Auto Refresh
              </CardTitle>
              <CardDescription>Configure automatic data refresh settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enable Auto Refresh</p>
                  <p className="text-xs text-muted-foreground">Automatically refresh dashboard data at set intervals</p>
                </div>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>
              {autoRefresh && (
                <>
                  <Separator />
                  <div className="space-y-2 max-w-xs">
                    <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                    <Input
                      id="refresh-interval"
                      type="number"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(e.target.value)}
                      min="30"
                      max="3600"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 30 seconds. Current: every {parseInt(refreshInterval) >= 60 ? `${Math.round(parseInt(refreshInterval) / 60)} minute(s)` : `${refreshInterval} seconds`}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                Caching
              </CardTitle>
              <CardDescription>Configure query result caching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enable Query Cache</p>
                  <p className="text-xs text-muted-foreground">Cache query results to improve performance</p>
                </div>
                <Switch
                  checked={cacheEnabled}
                  onCheckedChange={setCacheEnabled}
                />
              </div>
              {cacheEnabled && (
                <>
                  <Separator />
                  <div className="space-y-2 max-w-xs">
                    <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                    <Input
                      id="cache-ttl"
                      type="number"
                      value={cacheTTL}
                      onChange={(e) => setCacheTTL(e.target.value)}
                      min="60"
                      max="86400"
                    />
                    <p className="text-xs text-muted-foreground">
                      How long query results are cached. Current: {parseInt(cacheTTL) >= 3600 ? `${Math.round(parseInt(cacheTTL) / 3600)} hour(s)` : `${Math.round(parseInt(cacheTTL) / 60)} minute(s)`}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Data Retention
              </CardTitle>
              <CardDescription>Configure how long historical data is kept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Raw event data', value: '90 days', description: 'Individual page views, clicks, and events' },
                  { label: 'Aggregated metrics', value: '2 years', description: 'Daily, weekly, monthly rollups' },
                  { label: 'Report archives', value: '1 year', description: 'Generated report PDFs and exports' },
                  { label: 'Audit logs', value: '6 months', description: 'User actions and system changes' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
