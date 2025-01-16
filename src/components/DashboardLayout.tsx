import React from "react";
import { Bell, Settings, Home, Activity, LineChart, Shield, FileText, BarChart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <h2 className="text-lg font-semibold">GUARDIAN-IO</h2>
            <p className="text-xs text-muted-foreground">Ethical Supply Chain Solutions</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/monitoring">
                        <Activity className="h-4 w-4" />
                        <span>Monitoring</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/esg">
                        <LineChart className="h-4 w-4" />
                        <span>ESG Tracker</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/risk">
                        <Shield className="h-4 w-4" />
                        <span>Risk Management</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/reports">
                        <FileText className="h-4 w-4" />
                        <span>Reports & Analytics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Africa Fortune 500 Ethical Supply Chain Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Empowering corporations with real-time insights, ESG compliance, and risk management tools
                </p>
              </div>
              <nav className="flex items-center space-x-2">
                <button className="w-9 px-0 h-9 flex items-center justify-center">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="w-9 px-0 h-9 flex items-center justify-center">
                  <Settings className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="container flex-1 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t py-4 text-center text-sm text-muted-foreground">
            <p>GUARDIAN-IO: Redefining ethical supply chains with innovation and integrity. Join us in creating a sustainable future.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;