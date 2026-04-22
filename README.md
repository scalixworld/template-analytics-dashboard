# scalix-analytics-dashboard - Analytics Dashboard

A comprehensive business intelligence and analytics dashboard built with React, TypeScript, Recharts, and Shadcn/ui. Features interactive data visualizations, KPI tracking, real-time metrics, and customizable dashboards for data-driven decision making.

## 🚀 Features

### **📊 Advanced Data Visualization**
- **Interactive Charts**: Line, bar, area, pie, donut, scatter, and radar charts
- **Real-time Updates**: Live data refresh and streaming metrics
- **Custom Dashboards**: Drag-and-drop dashboard builder
- **Multiple Chart Types**: 8+ chart types with customization options
- **Responsive Design**: Charts adapt to all screen sizes

### **📈 KPI & Metrics Tracking**
- **Metric Cards**: Beautiful KPI displays with trend indicators
- **Performance Tracking**: Historical comparisons and growth metrics
- **Custom Calculations**: Computed metrics and derived KPIs
- **Threshold Alerts**: Automated alerts for metric thresholds
- **Time Range Filtering**: Flexible date range selections

### **📋 Data Management**
- **Multiple Data Sources**: Database, API, and file connections
- **Data Tables**: Sortable, filterable, and paginated data tables
- **Export Capabilities**: CSV and JSON export functionality
- **Query Builder**: Visual query construction for data analysis
- **Data Caching**: Intelligent caching for performance optimization

### **🔔 Alert System**
- **Smart Alerts**: Configurable alerts based on KPI thresholds
- **Multiple Channels**: Email, Slack, webhook, and SMS notifications
- **Alert History**: Complete audit trail of triggered alerts
- **Escalation Rules**: Automated escalation for critical alerts
- **Cooldown Periods**: Prevent alert fatigue with cooldown settings

### **📋 Report Generation**
- **Automated Reports**: Scheduled report generation and delivery
- **Custom Report Builder**: Drag-and-drop report creation
- **Multiple Formats**: PDF, Excel, CSV, and JSON exports
- **Report Scheduling**: Daily, weekly, monthly, and quarterly schedules
- **Report History**: Version control and historical report access

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Charts**: Recharts (React charting library)
- **State Management**: React hooks with local state
- **Styling**: Tailwind CSS + Shadcn/ui
- **Icons**: Lucide React
- **Data Export**: xlsx, jspdf, html2canvas
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Mock Data**: Faker.js for realistic sample data

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/ui components
│   ├── layout/                # Layout components (Sidebar, Header)
│   └── analytics/             # Analytics-specific components
│       ├── dashboard.tsx      # Main dashboard layout
│       ├── metricCard.tsx     # KPI metric cards
│       ├── chart.tsx          # Chart component with Recharts
│       └── dataTable.tsx      # Data table with sorting/filtering
├── pages/                     # Page components
│   ├── dashboard.tsx          # Main dashboard page
│   ├── reports.tsx            # Reports management
│   ├── alerts.tsx             # Alert configuration
│   ├── dataSources.tsx        # Data source management
│   └── settings.tsx           # User settings
├── lib/                       # Utility functions
├── types/                     # TypeScript type definitions
├── data/                      # Mock data and data utilities
└── store/                     # State management (future expansion)
```

## 🎯 Key Analytics Features

### **Dashboard Builder**
- **Widget System**: Modular dashboard widgets (metrics, charts, tables)
- **Grid Layout**: Responsive grid system for widget positioning
- **Drag & Drop**: Intuitive widget rearrangement
- **Widget Library**: Pre-built widget templates
- **Layout Persistence**: Save and restore dashboard layouts

### **Chart Visualization**
```typescript
// Multiple chart types supported
const chartConfig: ChartConfig = {
  type: 'line', // line, bar, area, pie, donut, scatter, radar
  data: timeSeriesData,
  xAxisKey: 'timestamp',
  yAxisKey: 'value',
  colors: ['#10b981', '#3b82f6'],
  showLegend: true,
  smooth: true
}
```

### **KPI Metrics**
```typescript
// Comprehensive metric tracking
const metric: Metric = {
  id: 'revenue',
  name: 'Total Revenue',
  value: 284750,
  change: 15.9,
  changeType: 'increase',
  format: 'currency',
  trend: 'up',
  icon: 'DollarSign'
}
```

### **Data Tables**
```typescript
// Advanced data table features
const tableConfig: TableConfig = {
  columns: [
    { key: 'name', label: 'Product', type: 'text', sortable: true },
    { key: 'revenue', label: 'Revenue', type: 'currency', sortable: true }
  ],
  data: productData,
  sortable: true,
  filterable: true,
  pagination: true,
  pageSize: 25
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Run ESLint
```

## 🎨 Key Components

### **Metric Card Component**
```tsx
<MetricCard
  metric={{
    name: "Total Revenue",
    value: 284750,
    change: 15.9,
    format: "currency",
    trend: "up"
  }}
/>
```

Features:
- Trend indicators with icons
- Percentage change display
- Multiple format types (currency, number, percentage)
- Color-coded change indicators
- Responsive design

### **Chart Component**
```tsx
<ChartComponent
  config={{
    type: 'area',
    data: revenueData,
    title: 'Revenue Trend',
    colors: ['#10b981'],
    smooth: true
  }}
/>
```

Features:
- 8+ chart types (line, bar, area, pie, donut, scatter, radar)
- Interactive tooltips and legends
- Responsive scaling
- Custom color palettes
- Grid and axis customization

### **Data Table Component**
```tsx
<DataTable
  config={{
    columns: tableColumns,
    data: tableData,
    sortable: true,
    pagination: true
  }}
  onExport={(format) => exportData(format)}
/>
```

Features:
- Column sorting and filtering
- Pagination with page size control
- Search functionality
- CSV/JSON export
- Responsive design

### **Dashboard Layout**
```tsx
<Dashboard dashboard={dashboardData}>
  {/* Widgets are automatically arranged in grid */}
</Dashboard>
```

Features:
- Responsive grid system
- Widget positioning
- Layout persistence
- Real-time updates

## 💰 Business Intelligence Features

### **Data Sources Integration**
- **Database Connections**: PostgreSQL, MySQL, MongoDB support
- **API Integration**: REST and GraphQL API connections
- **File Upload**: CSV, Excel, JSON file processing
- **Streaming Data**: Real-time data streams and WebSocket connections
- **Data Warehouses**: BigQuery, Snowflake, Redshift integration

### **Query Builder**
```typescript
// Visual query construction
const query: Query = {
  sql: 'SELECT * FROM sales WHERE date >= $start_date',
  parameters: [
    {
      name: 'start_date',
      type: 'date',
      defaultValue: '2024-01-01'
    }
  ],
  cache: {
    enabled: true,
    ttl: 300
  }
}
```

### **Alert System**
```typescript
// Configurable KPI alerts
const alert: Alert = {
  metricId: 'revenue',
  condition: {
    operator: 'lt',
    threshold: 5000,
    timeWindow: 1440 // 24 hours
  },
  channels: ['email', 'slack'],
  severity: 'high',
  cooldown: 60 // minutes
}
```

## 📊 Analytics Use Cases

### **E-commerce Analytics**
- **Sales Performance**: Revenue, orders, conversion rates
- **Product Analytics**: Best-selling products, inventory turnover
- **Customer Behavior**: Purchase patterns, cart abandonment
- **Marketing ROI**: Campaign performance and attribution

### **SaaS Metrics**
- **User Growth**: New signups, churn rate, retention
- **Revenue Analytics**: MRR, ARR, expansion revenue
- **Product Usage**: Feature adoption, engagement metrics
- **Customer Success**: NPS, support tickets, satisfaction

### **Business Operations**
- **Financial KPIs**: Profit margins, cash flow, budget vs actual
- **Operational Metrics**: Efficiency, quality, productivity
- **Supply Chain**: Inventory levels, supplier performance
- **HR Analytics**: Employee turnover, satisfaction, productivity

### **Marketing Analytics**
- **Campaign Performance**: CTR, conversion rates, ROI
- **Audience Insights**: Demographics, behavior patterns
- **Content Analytics**: Engagement, shares, time on page
- **Attribution Modeling**: Multi-touch attribution analysis

## 🔧 Customization

### **Adding New Chart Types**
```typescript
// Extend ChartConfig type
type ExtendedChartType = ChartType | 'heatmap' | 'treemap'

// Add chart rendering logic
const renderExtendedChart = (config: ChartConfig) => {
  switch (config.type) {
    case 'heatmap':
      return <HeatmapChart data={config.data} />
    case 'treemap':
      return <TreemapChart data={config.data} />
    // ... existing chart types
  }
}
```

### **Custom Metrics**
```typescript
// Define custom metric calculations
const customMetrics: Metric[] = [
  {
    id: 'customer-lifetime-value',
    name: 'Customer Lifetime Value',
    value: calculateCLV(customerData),
    format: 'currency',
    icon: 'Users'
  },
  {
    id: 'churn-rate',
    name: 'Churn Rate',
    value: calculateChurnRate(customerData),
    format: 'percentage',
    icon: 'TrendingDown'
  }
]
```

### **Dashboard Templates**
```typescript
// Pre-built dashboard templates
const eCommerceTemplate: Dashboard = {
  name: 'E-commerce Overview',
  widgets: [
    { type: 'metric', config: revenueMetric, position: { x: 0, y: 0, width: 3, height: 1 } },
    { type: 'chart', config: salesChart, position: { x: 0, y: 1, width: 6, height: 4 } },
    // ... more widgets
  ],
  tags: ['ecommerce', 'sales', 'revenue']
}
```

## 📈 Advanced Features

### **Real-time Data Streaming**
```typescript
// WebSocket data streaming
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080/analytics')

  ws.onmessage = (event) => {
    const newData = JSON.parse(event.data)
    updateDashboardData(newData)
  }

  return () => ws.close()
}, [])
```

### **Predictive Analytics**
```typescript
// Machine learning predictions
const predictions = await predictRevenue({
  historicalData: salesData,
  forecastPeriod: 30,
  confidence: 0.95
})

// Display prediction charts
<ChartComponent
  config={{
    type: 'line',
    data: predictions,
    title: 'Revenue Forecast',
    colors: ['#3b82f6', '#ef4444'] // actual vs predicted
  }}
/>
```

### **Custom Dashboards**
```typescript
// Dynamic dashboard creation
const customDashboard = await createDashboard({
  name: 'Custom Sales Dashboard',
  widgets: selectedWidgets,
  layout: 'grid',
  permissions: ['admin', 'sales-team']
})
```

## 🗄️ Data Architecture

### **Data Models**
```sql
-- Metrics table
CREATE TABLE metrics (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value DECIMAL,
  change_percentage DECIMAL,
  last_updated TIMESTAMP
);

-- Charts table
CREATE TABLE charts (
  id UUID PRIMARY KEY,
  dashboard_id UUID REFERENCES dashboards(id),
  type VARCHAR(50),
  config JSONB,
  position JSONB
);

-- Dashboards table
CREATE TABLE dashboards (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  layout VARCHAR(50),
  created_by UUID,
  created_at TIMESTAMP
);
```

### **API Endpoints**
```typescript
// REST API endpoints
GET    /api/dashboards     # List dashboards
POST   /api/dashboards     # Create dashboard
GET    /api/metrics        # Get metrics data
POST   /api/alerts         # Create alert
GET    /api/reports        # List reports
POST   /api/reports/generate # Generate report
```

## 🔐 Security Features

### **Data Access Control**
- **Role-Based Access**: Admin, editor, viewer permissions
- **Row-Level Security**: User-specific data filtering
- **Audit Logging**: Complete activity tracking
- **Data Encryption**: Sensitive data encryption at rest and in transit

### **Authentication**
- **JWT Tokens**: Secure API authentication
- **Multi-factor Authentication**: Enhanced security
- **Session Management**: Secure session handling
- **SSO Integration**: Single sign-on support

## 📱 Mobile Analytics

### **Responsive Design**
- **Mobile Charts**: Touch-friendly chart interactions
- **Swipe Navigation**: Swipe between dashboard views
- **Mobile Tables**: Horizontal scroll for data tables
- **Progressive Web App**: Offline functionality

### **Mobile Optimizations**
- **Performance**: Optimized for mobile networks
- **Touch Gestures**: Pinch-to-zoom, swipe actions
- **Simplified UI**: Mobile-first design approach
- **Push Notifications**: Real-time alerts on mobile

## 🔍 SEO & Performance

### **Performance Optimization**
- **Lazy Loading**: Components load on demand
- **Data Virtualization**: Large datasets handled efficiently
- **Caching Strategies**: Intelligent data caching
- **Bundle Splitting**: Optimized bundle sizes

### **SEO Features**
- **Meta Tags**: Dynamic meta descriptions for dashboards
- **Structured Data**: Analytics schema markup
- **Sitemap Generation**: Automatic sitemap creation
- **Social Sharing**: Dashboard sharing capabilities

## 🧪 Testing Strategy

### **Unit Tests**
```tsx
describe('MetricCard', () => {
  it('displays metric value correctly', () => {
    const metric = {
      name: 'Revenue',
      value: 100000,
      format: 'currency'
    }

    render(<MetricCard metric={metric} />)
    expect(screen.getByText('$100,000.00')).toBeInTheDocument()
  })
})
```

### **Integration Tests**
```tsx
describe('Dashboard Flow', () => {
  it('loads and displays dashboard data', async () => {
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    })

    expect(screen.getByText('$284,750.00')).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### **Production Build**
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### **Deployment Options**

#### **Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

#### **Docker**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

#### **AWS/Cloud**
```bash
# Deploy to AWS Amplify
amplify init
amplify add hosting
amplify publish
```

## 💰 Business Value

### **Data-Driven Decisions**
- **Real-time Insights**: Make informed decisions with live data
- **Predictive Analytics**: Forecast trends and business outcomes
- **Performance Monitoring**: Track KPIs against business goals
- **Automated Reporting**: Reduce manual reporting efforts

### **Cost Savings**
- **Operational Efficiency**: Automate data collection and analysis
- **Faster Insights**: Reduce time to insight from weeks to minutes
- **Scalable Solution**: Handle growing data volumes cost-effectively
- **Self-Service Analytics**: Reduce dependency on data teams

### **Competitive Advantage**
- **Market Intelligence**: Stay ahead with comprehensive market analysis
- **Customer Insights**: Understand customer behavior and preferences
- **Performance Optimization**: Identify and fix performance issues quickly
- **Innovation**: Data-driven product and service improvements

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Analytics Best Practices](https://www.tableau.com/learn/articles/data-analytics)

## 🤝 Contributing

1. Follow the established TypeScript patterns and component structure
2. Add proper type definitions for new features
3. Include comprehensive tests for new functionality
4. Update documentation for changes and new features
5. Ensure mobile responsiveness and accessibility
6. Follow the existing code style and formatting conventions

---

Built with ❤️ using Scalix Scaffold
