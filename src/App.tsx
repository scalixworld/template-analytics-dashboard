import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/layout/sidebar'
import { Header } from './components/layout/header'
import { DashboardPage } from './pages/dashboard'
import { ReportsPage } from './pages/reports'
import { SettingsPage } from './pages/settings'
import { AlertsPage } from './pages/alerts'
import { DataSourcesPage } from './pages/dataSources'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-64">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard/:id" element={<DashboardPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/data-sources" element={<DataSourcesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
