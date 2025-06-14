import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
          {metrics.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No compliance data available</div>
          ) : (
            metrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className={`text-sm font-medium ${getComplianceColor(metric.status)}`}>
                    {metric.percentage}%
                  </span>
                </div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
