import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Calendar, User, AlertCircle, CheckCircle2, Clock, Flag } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Task } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusIcons = {
  pending: Clock,
  in_progress: AlertCircle,
  completed: CheckCircle2,
  cancelled: AlertCircle,
};

export default function Tasks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "assigned">("all");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    enabled: !!user,
  });

  const { data: users } = useQuery({
    queryKey: ["/api/users"],
    enabled: !!user,
  });

  const { data: projects } = useQuery({
    queryKey: ["/api/projects"],
    enabled: !!user,
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest(`/api/tasks/${id}`, "PUT", { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  if (!user) return null;

  const filteredTasks = (tasks || []).filter((task: Task) => {
    if (filter === "assigned") {
      return task.assigneeId === user.id;
    }
    return true;
  });

  const getUserName = (userId: number | null) => {
    if (!userId) return "Unassigned";
    const foundUser = (users || []).find((u: any) => u.id === userId);
    return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : "Unknown User";
  };

  const getProjectName = (projectId: number | null) => {
    if (!projectId) return "No Project";
    const project = (projects || []).find((p: any) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    updateTaskMutation.mutate({ id: taskId, status: newStatus });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track your tasks across all projects
            </p>
          </div>
          <Link href="/tasks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </Link>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Tasks ({(tasks || []).length})
          </Button>
          <Button
            variant={filter === "assigned" ? "default" : "outline"}
            onClick={() => setFilter("assigned")}
          >
            My Tasks ({(tasks || []).filter((t: Task) => t.assigneeId === user.id).length})
          </Button>
        </div>

        <Separator />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {filter === "assigned" 
                  ? "You haven't been assigned any tasks yet."
                  : "No tasks have been created yet."}
              </p>
              <Link href="/tasks/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Task
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task: Task) => {
              const StatusIcon = statusIcons[task.status as keyof typeof statusIcons];
              const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
              
              return (
                <Card key={task.id} className={`transition-all hover:shadow-md ${isOverdue ? 'border-red-200 dark:border-red-800' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-6">{task.title}</CardTitle>
                      <Badge className={`ml-2 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && (
                      <CardDescription className="text-sm">
                        {task.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {task.status.replace('_', ' ')}
                      </Badge>
                      {task.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(task.id, "in_progress")}
                          disabled={updateTaskMutation.isPending}
                        >
                          Start
                        </Button>
                      )}
                      {task.status === "in_progress" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(task.id, "completed")}
                          disabled={updateTaskMutation.isPending}
                        >
                          Complete
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{getUserName(task.assigneeId)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 mr-2 text-xs">📁</span>
                        <span>{getProjectName(task.projectId)}</span>
                      </div>
                      {task.dueDate && (
                        <div className={`flex items-center ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            Due {format(new Date(task.dueDate), "MMM d, yyyy")}
                            {isOverdue && " (Overdue)"}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}