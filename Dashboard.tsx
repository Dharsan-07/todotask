import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { ActivityItem } from "@/components/ui/activity-item";
import { QuickAction } from "@/components/ui/quick-action";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  Folder, 
  TrendingUp,
  Plus,
  UserPlus,
  FileText,
  Settings,
  Crown,
  FolderPlus,
  CheckCircle,
  Upload
} from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
  });

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="stats-card animate-pulse">
              <div className="h-24 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={stats?.totalRevenue || "$0"}
          change="+15.3% this quarter"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
        />
        <StatsCard
          title="Active Users"
          value={stats?.activeUsers?.toString() || "0"}
          change="+5.2% from last week"
          changeType="positive"
          icon={Users}
          iconColor="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          title="Projects"
          value={stats?.totalProjects?.toString() || "0"}
          change="+8 new this month"
          changeType="neutral"
          icon={Folder}
          iconColor="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
        />
        <StatsCard
          title="Conversion Rate"
          value={stats?.conversionRate || "0%"}
          change="+0.5% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue Overview</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">7D</Button>
              <Button variant="default" size="sm" className="text-xs">30D</Button>
              <Button variant="outline" size="sm" className="text-xs">90D</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">Revenue Chart</p>
                <p className="text-xs text-muted-foreground mt-1">Chart implementation ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Activity</CardTitle>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">Activity Chart</p>
                <p className="text-xs text-muted-foreground mt-1">Real-time data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="link" size="sm">View all</Button>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 animate-pulse">
                    <div className="h-8 w-8 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {activities?.map((activity: any) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    icon={
                      activity.action.includes("created") ? (
                        <FolderPlus className="h-4 w-4 text-green-500" />
                      ) : activity.action.includes("completed") ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Upload className="h-4 w-4 text-blue-500" />
                      )
                    }
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickAction
              icon={Plus}
              iconColor="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
              label="New Project"
              onClick={() => console.log("New Project")}
            />
            <QuickAction
              icon={UserPlus}
              iconColor="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
              label="Invite User"
              onClick={() => console.log("Invite User")}
            />
            <QuickAction
              icon={FileText}
              iconColor="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
              label="Generate Report"
              onClick={() => console.log("Generate Report")}
            />
            <QuickAction
              icon={Settings}
              iconColor="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
              label="Settings"
              onClick={() => console.log("Settings")}
            />

            {/* Upgrade Prompt */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-blue-100/50 rounded-lg border border-primary/20">
              <div className="flex items-start">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Crown className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Upgrade to Pro</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unlock advanced features and analytics
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-primary">
                    Learn more →
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
