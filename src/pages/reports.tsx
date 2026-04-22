export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage automated reports
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Scheduled Reports</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Automated report generation and delivery
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Custom Reports</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Build custom reports with drag-and-drop
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Report History</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Access previously generated reports
          </p>
        </div>
      </div>
    </div>
  )
}
