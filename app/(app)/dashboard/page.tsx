import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db/client";
import { profiles } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { findLessonLocation, PRIMARY_SECURITY_COURSE_SLUG } from "@/content/registry";
import { getCourseBySlug } from "@/services/course-service";
import { getCourseCompletion, getNextLesson } from "@/services/progress-service";
import { getUserAchievements, getUserSkills } from "@/services/skill-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The layout above already redirects if there's no user; this is just
  // TypeScript narrowing.
  if (!user) return null;

  const [profile, course, earnedSkills, earnedAchievements] = await Promise.all([
    db.query.profiles.findFirst({ where: eq(profiles.id, user.id) }),
    getCourseBySlug(PRIMARY_SECURITY_COURSE_SLUG),
    getUserSkills(user.id),
    getUserAchievements(user.id),
  ]);

  if (!course) {
    return (
      <EmptyState
        title="Your curriculum is on its way"
        description="No courses have been published yet — check back soon."
      />
    );
  }

  const [completion, nextLesson] = await Promise.all([
    getCourseCompletion(user.id, course.slug),
    getNextLesson(user.id, course.slug),
  ]);

  const nextLessonLocation = nextLesson ? findLessonLocation(nextLesson.slug) : null;
  const nextLessonHref = nextLessonLocation
    ? `/learn/${nextLessonLocation.courseSlug}/${nextLessonLocation.moduleSlug}/${nextLesson?.slug}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back{profile ? `, ${profile.displayName}` : ""}
        </h1>
        <p className="text-muted-foreground">Here&apos;s where you left off.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue learning</CardTitle>
          </CardHeader>
          <CardContent>
            {nextLesson && nextLessonHref ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm">{nextLesson.title}</p>
                <Link
                  href={nextLessonHref}
                  className={buttonVariants({ size: "sm", className: "w-fit" })}
                >
                  Continue
                </Link>
              </div>
            ) : nextLesson ? (
              <p className="text-muted-foreground text-sm">{nextLesson.title}</p>
            ) : (
              <p className="text-muted-foreground text-sm">
                You&apos;ve completed every published lesson in this course.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your progress</CardTitle>
          </CardHeader>
          <CardContent>
            {completion && completion.total > 0 ? (
              <>
                <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-[width]"
                    style={{ width: `${completion.percent}%` }}
                  />
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  {completion.completed} of {completion.total} lessons complete
                </p>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                This course doesn&apos;t have any lessons published yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {earnedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {earnedSkills.map(({ skill }) => (
                  <span
                    key={skill.id}
                    className="bg-accent/15 text-accent-foreground rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Complete a module to unlock your first skill.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {earnedAchievements.length > 0 ? (
              <ul className="flex flex-col gap-1.5">
                {earnedAchievements.map(({ achievement }) => (
                  <li key={achievement.id} className="text-sm">
                    <span className="font-medium">{achievement.name}</span>
                    <span className="text-muted-foreground"> — {achievement.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                Complete your first lesson to earn an achievement.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
