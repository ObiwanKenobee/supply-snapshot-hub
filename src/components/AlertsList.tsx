import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Supplier Delay Alert",
    description: "Major delay detected in Nairobi warehouse shipment",
    icon: Clock,
    severity: "high",
  },
  {
    id: 2,
    title: "Compliance Warning",
    description: "3 suppliers pending ESG documentation update",
    icon: AlertTriangle,
    severity: "medium",
  },
  {
    id: 3,
    title: "Cost Increase Alert",
    description: "15% increase in transportation costs detected",
    icon: TrendingDown,
    severity: "low",
  },
];

const AlertsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className="flex items-start space-x-4 p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className={cn(
                  "p-2 rounded-full",
                  alert.severity === "high" ? "bg-red-500/10 text-red-500" :
                  alert.severity === "medium" ? "bg-yellow-500/10 text-yellow-500" :
                  "bg-blue-500/10 text-blue-500"
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;