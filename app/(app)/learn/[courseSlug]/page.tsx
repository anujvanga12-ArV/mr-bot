import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { getCourse } from "@/content/registry";
import { getCourseProgressDetail } from "@/services/progress-service";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CoursePage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }

  const progressDetail = await getCourseProgressDetail(user.id, courseSlug);
  const statusBySlug = new Map(
    (progressDetail ?? []).flatMap((mod) =>
      mod.lessons.map((lesson) => [lesson.slug, lesson.status] as const),
    ),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="text-muted-foreground mt-1">{course.description}</p>
      </div>

      <div className="flex flex-col gap-6">
        {course.modules.map((mod, i) => (
          <Card key={mod.slug}>
            <CardHeader>
              <CardTitle className="text-base">
                Module {i + 1}: {mod.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {mod.lessons.map((lesson) => {
                const status = statusBySlug.get(lesson.slug) ?? "not_started";
                return (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${courseSlug}/${mod.slug}/${lesson.slug}`}
                    className="hover:bg-secondary flex items-center justify-between rounded-md px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      {status === "completed" ? (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      ) : (
                        <Circle className="text-muted-foreground size-4" />
                      )}
                      {lesson.title}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {lesson.estimatedMinutes} min
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
