import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3
} from "lucide-react";

const reportTypes = [
  {
    id: 1,
    name: "Monthly Revenue Report",
    type: "Financial",
    generated: "2024-01-15",
    status: "Ready",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "User Activity Analysis",
    type: "Analytics",
    generated: "2024-01-12",
    status: "Ready",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Project Performance Review",
    type: "Operations",
    generated: "2024-01-10",
    status: "Ready",
    size: "3.2 MB"
  },
  {
    id: 4,
    name: "Customer Satisfaction Survey",
    type: "Feedback",
    generated: "2024-01-08",
    status: "Processing",
    size: "0.9 MB"
  }
];

export default function Reports() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Financial": return <DollarSign className="h-4 w-4" />;
      case "Analytics": return <BarChart3 className="h-4 w-4" />;
      case "Operations": return <TrendingUp className="h-4 w-4" />;
      case "Feedback": return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Ready": return "default";
      case "Processing": return "secondary";
      case "Failed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="mt-2 text-muted-foreground">
            Generate, view, and export comprehensive business reports and analytics.
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="w-full">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-10 w-64"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">All Reports</Button>
          <Button variant="outline" size="sm">Financial</Button>
          <Button variant="outline" size="sm">Analytics</Button>
          <Button variant="outline" size="sm">Operations</Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{report.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Type: {report.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Size: {report.size}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        Generated: {report.generated}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant={getStatusVariant(report.status)}>
                    {report.status}
                  </Badge>
                  {report.status === "Ready" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Download</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Available now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Auto-generated
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
