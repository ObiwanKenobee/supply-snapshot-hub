import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import KPICard from "@/components/KPICard";
import AlertsList from "@/components/AlertsList";
import AfricaMap from "@/components/AfricaMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
];

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <KPICard
            title="Revenue Growth"
            value="12.5%"
            trend={{ value: 2.5, isPositive: true }}
          />
          <KPICard
            title="On-Time Delivery"
            value="94.2%"
            trend={{ value: 1.2, isPositive: true }}
          />
          <KPICard
            title="Carbon Footprint"
            value="28.6 MT"
            trend={{ value: 3.1, isPositive: false }}
          />
          <KPICard
            title="Supplier Compliance"
            value="87%"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Map and Alerts */}
        <div className="grid gap-4 md:grid-cols-4">
          <AfricaMap />
          <AlertsList />
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#C84E31"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;