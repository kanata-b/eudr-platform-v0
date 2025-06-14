import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ComplianceMetric {
  name: string
  percentage: number
  status: "good" | "warning" | "danger"
}

interface ComplianceOverviewProps {
  metrics: ComplianceMetric[]
  getComplianceColor: (status: string) => string
}

export function ComplianceOverview({ metrics, getComplianceColor }: ComplianceOverviewProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>Your current EUDR compliance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="flex items-center justify-between">
              <span className="text-sm">{metric.name}</span>
              <span className={`text-sm font-medium ${getComplianceColor(metric.status)}`}>{metric.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
