import { useParams } from 'react-router-dom'
import { Dashboard as DashboardComponent } from '../components/analytics/dashboard'
import { mockDashboard } from '../data/mockData'

export function DashboardPage() {
  const { id } = useParams()

  // For now, just return the main dashboard
  // In a real app, you'd fetch the dashboard by ID
  const dashboard = mockDashboard

  return <DashboardComponent dashboard={dashboard} />
}
