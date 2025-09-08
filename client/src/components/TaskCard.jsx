import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusVariants = {
  Todo: "secondary",
  "In Progress": "warning",
  Done: "success",
};

export default function TaskCard({ title, description, status }) {
  return (
    <Card className="mb-2 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge
          variant={statusVariants[status] || "secondary"}
          className="text-xs px-2 py-0.5"
        >
          {status}
        </Badge>
      </CardContent>
    </Card>
  );
}
