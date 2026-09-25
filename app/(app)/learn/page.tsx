import Link from "next/link";
import { COURSES } from "@/content/registry";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {COURSES.map((course) => (
          <Link key={course.slug} href={`/learn/${course.slug}`}>
            <Card className="hover:bg-secondary/50 h-full transition-colors">
              <CardHeader>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {course.level}
                </p>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {course.modules.length} module{course.modules.length === 1 ? "" : "s"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
