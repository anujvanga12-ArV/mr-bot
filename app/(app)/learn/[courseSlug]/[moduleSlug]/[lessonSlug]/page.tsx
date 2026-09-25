import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdjacentLessons, getLesson } from "@/content/registry";
import { getLessonBySlug } from "@/services/course-service";
import { getLessonProgressStatus } from "@/services/progress-service";
import { createClient } from "@/lib/supabase/server";
import { LessonRenderer } from "@/features/learn/lesson-renderer";
import { LessonQuizRunner } from "@/features/learn/lesson-quiz";
import { MarkCompleteButton } from "@/features/learn/mark-complete-button";
import { buttonVariants } from "@/components/ui/button";

interface LessonParams {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}

export default async function LessonPage({ params }: { params: Promise<LessonParams> }) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;

  const lesson = getLesson(courseSlug, moduleSlug, lessonSlug);
  if (!lesson) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The (app) layout already redirects signed-out visitors; this is just
  // narrowing `user` for the query below.
  if (!user) {
    notFound();
  }

  const lessonRow = await getLessonBySlug(lessonSlug);
  const isCompleted = lessonRow
    ? (await getLessonProgressStatus(user.id, lessonRow.id)) === "completed"
    : false;

  const { next } = getAdjacentLessons(courseSlug, moduleSlug, lessonSlug);

  return (
    <article className="flex flex-col gap-8">
      <div>
        <p className="text-muted-foreground text-sm">{lesson.estimatedMinutes} min</p>
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.objective}</p>
      </div>

      <LessonRenderer blocks={lesson.blocks} />

      <Link
        href={`/tutor?lesson=${lessonSlug}`}
        className="text-muted-foreground hover:text-foreground w-fit text-sm underline underline-offset-4"
      >
        Ask the AI tutor about this lesson
      </Link>

      {lesson.quiz ? <LessonQuizRunner quiz={lesson.quiz} /> : null}

      <div className="border-border flex items-center justify-between border-t pt-6">
        <MarkCompleteButton lessonSlug={lessonSlug} initiallyCompleted={isCompleted} />
        {next ? (
          <Link
            href={`/learn/${courseSlug}/${moduleSlug}/${next.slug}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Next lesson →
          </Link>
        ) : (
          <Link href={`/learn/${courseSlug}`} className={buttonVariants({ variant: "outline" })}>
            Back to course
          </Link>
        )}
      </div>
    </article>
  );
}
