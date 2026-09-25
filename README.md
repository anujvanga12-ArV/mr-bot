# MR.BOT

A cybersecurity education platform: beginner-friendly lessons, scenarios, quizzes, and an AI
tutor, with a path from "I know nothing about this" to serious technical depth.

This repo is the **Phase 2 foundation** — auth, database, design tokens, and one real vertical
slice of the product (sign up → dashboard), not the full curriculum yet. See "What's here vs.
what's next" below.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`) + a small shadcn-style UI kit
- **Supabase** — Postgres + Auth
- **Drizzle ORM** — schema, migrations, and Row-Level Security policies, all declared in code
- **Vitest** — unit/component tests
- Deploys to **Vercel**

## Getting started

### 1. Install dependencies

```bash
npm install
```

> Dependency versions in `package.json` reflect what was current as of this project's
> generation (September 2026). Run `npm outdated` after cloning and bump anything that's moved
> on — this was written without the ability to hit the npm registry to verify live versions.

### 2. Create a Supabase project

Create a project at [supabase.com](https://supabase.com), then from **Project Settings → API**
and **Project Settings → Database**, copy the values into a `.env` file:

```bash
cp .env.example .env
```

Fill in `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL` (the pooled,
port-6543 connection string), and `DIRECT_URL`. For `DIRECT_URL`, don't use Supabase's raw
"direct connection" string (`db.<ref>.supabase.co:5432`) — it's IPv6-only and will silently hang
on plenty of home networks (confirmed in practice: `db:push` sits on "Pulling schema from
database..." forever, creates nothing, no clear error). Use **session mode** instead, which gives
the same direct-connection behavior over IPv4: same pooler host as `DATABASE_URL`, port 5432
instead of 6543 — `postgresql://postgres.<ref>:[password]@<pooler-host>:5432/postgres`.

`ANTHROPIC_API_KEY` is optional — get one from the [Anthropic Console](https://console.anthropic.com/)
if you want the AI tutor working; everything else in the app runs fine without it, and `/tutor`
shows a plain "not configured" message instead of failing.

### 3. Set up the database

```bash
npm run db:push
```

This creates every table in `db/schema.ts` **and** the Row-Level Security policies — RLS is
declared in the schema itself (via Drizzle's `pgPolicy`), not bolted on separately.

One thing Drizzle doesn't model: the trigger that creates a `profiles` row when someone signs
up. Open the Supabase SQL editor and run `db/sql/001_handle_new_user.sql` once.

### 4. Sync the curriculum

```bash
npm run content:sync
```

Reads every course/module/lesson defined under `content/courses/`, plus the skill and
achievement definitions in `content/skills.ts` and `content/achievements.ts`, and upserts their
identity into the database. Run this again any time content, skills, or achievements change.

### 5. Run it

```bash
npm run dev
```

Visit `http://localhost:3000`, sign up, and go to **Learn → Cybersecurity Basics**. All 9
modules are built — the full beginner curriculum, 25 lessons — from "what is cybersecurity" to
a final capstone challenge mixing every topic together, each with interactive scenarios,
knowledge checks, and a review quiz. A second course, **Python for Security** (linked as
"Coding" in the nav), covers Python fundamentals through security-flavored examples.

## Project structure

```
app/            Routes (App Router). (marketing) is public, (app) requires auth.
features/       UI + logic grouped by feature (auth, and more as they're built).
services/       Business logic — the only layer allowed to query the database directly.
db/             Drizzle schema, client, and the one hand-written SQL trigger.
content/        Course/lesson content types. Lesson content itself lands here in Phase 5.
components/ui/  Small design-system primitives.
lib/            Cross-cutting utilities: Supabase clients, env validation, cn().
```

## Content architecture

Lesson content is **not** stored in the database. It's written as typed TypeScript files under
`content/courses/`, validated against the `ContentBlock` union in `content/types.ts`, and
reviewed through pull requests like any other code change. The database only stores identity and
ordering (`courses`, `modules`, `lessons` tables) so that progress, quizzes, and skills have
something stable to reference — kept in sync by `npm run content:sync`.

This is a deliberate trade-off for the current stage: only the team authors lessons, so a CMS
and admin UI would be speculative infrastructure. If non-engineers need to author content later,
that's the trigger to migrate to a database-backed CMS — not before.

Module 1 (`content/courses/beginner/cybersecurity-basics/module-01-welcome/`) is the reference
implementation for every content block type currently built: text, vocabulary (with a
simple/technical toggle), interactive scenarios, knowledge checks, and a module-ending quiz. All
nine modules follow the same shape.

## Defensive Tools

Four tools at `/tools`, each built around one honesty rule: **never claim to know something a
browser genuinely can't verify.**

- **URL Analyzer** (`lib/tools/url-analysis.ts`) — checks structure only (HTTPS, IP-address
  hosts, the `@`-symbol trick, punycode, excessive subdomains, hyphen-heavy domains). Explicitly
  never returns a safe/malicious verdict — there's a test (`url-analysis.test.ts`) that asserts
  the result type doesn't even have an `isSafe` field, specifically to catch a future edit that
  tries to add one.
- **Password Checker** (`lib/tools/password-analysis.ts`) — entirely client-side, nothing typed
  here is ever sent anywhere. Qualitative strength buckets (weak/fair/strong), never a fake
  precise "time to crack" number. The UI explicitly tells people to use made-up example strings.
- **File Analyzer** (`lib/tools/file-analysis.ts`) — checks name, extension (including the
  classic double-extension trick, e.g. `invoice.pdf.exe`), and size, plus a real SHA-256 hash via
  the Web Crypto API. The file is never uploaded. It's explicit that this isn't a real antivirus
  scan — it can't see file contents.
- **Wi-Fi & Connection Checker** (`lib/tools/connection-safety.ts`) — a browser genuinely cannot
  detect a Wi-Fi network's encryption type (WPA2 vs. WPA3 vs. open); that's hidden from web pages
  on purpose. Rather than fake that capability, this tool reports the one real, checkable fact
  (whether the current page itself is HTTPS) and pairs it with a guided self-assessment. There's
  a test asserting the output never mentions "WPA2"/"WPA3" by name, to keep it that way.

All four have full unit test coverage on their pure logic (`lib/tools/*.test.ts`) — the UI
components (`features/tools/`) are thin wrappers around tested functions, not where the logic
lives.

## Search

`/search` — instant, client-side, over a small static index built from content at module load
(`lib/search.ts`, `content/vocabulary-index.ts`). Covers every vocabulary term across the
curriculum, every lesson title/objective, and all four tools, ranked so an exact or prefix match
on the primary field (a term name, a lesson title) beats a match only found in a description. A
proper search backend would be overkill at this content volume — worth revisiting once
Foundations/Intermediate/Advanced make the corpus meaningfully bigger.

## Coding Section

`Python for Security` at `/learn/python-for-security` (also linked as "Coding" in the nav) —
reuses the exact same content architecture as the security curriculum: same `Lesson`/
`ContentBlock` types, same renderer, same server-graded quizzes. Three modules, six lessons:
Python Basics, Control Flow, and Functions & a mini project.

One deliberate scope decision worth being upfront about: **there's no live code execution.**
Running real Python in-browser means WebAssembly (Pyodide is the standard choice) — a large
download, real loading-state UX, and its own sandboxing considerations. Rather than half-build
that, lessons teach through worked code examples and "what does this print?" knowledge checks,
which is a genuinely different (smaller) thing than an interactive coding environment. The
capstone mini-project deliberately reimplements the platform's own Password Checker tool in
Python, so the connection between the web tool and the code is concrete rather than abstract.
Live execution would be a real, valuable follow-up — just not a small one.

## Skills & Achievements

Six beginner skills and five achievements, defined in `content/skills.ts` and
`content/achievements.ts` — matching the spec's "no fake achievements" rule, only ones with real
content behind them are included (the spec's example list also has Network Explorer, Linux
Learner, etc., which need Foundations/Intermediate content that doesn't exist yet, so they're
left out rather than faked).

- A skill unlocks once every module it depends on has all its lessons completed (e.g. "Online
  Safety" needs both Staying Safe Online and Devices & Wi-Fi).
- Achievements cover: completing your first lesson, finishing the Passwords & Accounts module,
  finishing the Phishing & Online Scams module, completing the entire beginner course, and
  completing the entire Python for Security course.
- `services/skill-service.ts` re-evaluates the user's _actual_ completion state from `progress`
  after every lesson completion — it never trusts a flag saying "a module just finished," which
  matters if someone completes lessons out of order.
- Newly unlocked skills/achievements surface immediately on the lesson page (`completeLesson`
  returns what was newly awarded), and everything earned so far shows on the dashboard.

## AI Tutor

`/tutor` is a streaming chat backed by Claude, implemented as a real service layer rather than a
prompt bolted onto a UI component:

- `lib/ai-tutor/system-prompt.ts` builds the system prompt from the student's learning level, a
  chosen explanation level (Simple/Normal/Technical), and the current lesson if the student got
  there via "Ask the AI tutor about this lesson." The firm safety boundaries (no real attack
  instructions, no working malware/phishing artifacts, no evasion techniques, regardless of
  framing) live here, in code, not just in this document.
- `app/api/tutor/route.ts` is the only place that calls the Anthropic API — the key never reaches
  the client. It streams the response back as plain text as it's generated.
- `lib/ai-tutor/rate-limit.ts` caps each user to 30 tutor messages/hour via a DB query, rather
  than requiring a separate rate-limiting service (Upstash Redis, say) for the MVP. Revisit this
  if the app ever runs across multiple regions where that query becomes a bottleneck.
- The "Quiz Me" and "Give Me a Scenario" quick actions are informal, conversational practice —
  deliberately separate from the platform's graded quizzes, which are content-authored and
  server-graded (see Module content above). Letting the model's own quiz questions count toward
  real progress would mean skill unlocks resting on whatever the model decided was correct that
  turn, which isn't a risk worth taking.

One real gap I want to be upfront about: **the RLS policies in `db/schema.ts` don't currently
protect anything queried through Drizzle.** `db/client.ts` connects with Supabase's pooled
connection string, not a per-request connection carrying the signed-in user's JWT — Postgres
only evaluates RLS when that JWT context is present, which it isn't here. The actual
authorization boundary today is the application layer: every service function that touches user
data takes a `userId` obtained server-side from `supabase.auth.getUser()`, never from client
input, and `services/tutor-service.ts` specifically verifies conversation ownership via a join
rather than trusting that the caller already checked it earlier in the request. The RLS policies
are still correct and worth keeping — they'd take effect immediately if a future feature reads
this data through `@supabase/supabase-js` instead of Drizzle — but claiming they protect today's
Drizzle queries would be exactly the "fake security result" this project rules out. See the
comment block above `authUsers` in `db/schema.ts` for the same note in context.

## Testing

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

Two real suites so far: `lib/utils.test.ts` (the `cn()` helper) and `lib/quiz-scoring.test.ts` —
the latter matters more than it looks, since quiz grading is deliberately done server-side
against the content file, never trusting a client-submitted score. Next priority per the product
spec: auth and RLS/permissions.

## What's here vs. what's next

**Real and working:** auth (sign up/in/out, session refresh middleware, route protection),
database schema with RLS (see the trust-boundary caveat above), the design token system, a
dashboard that reads real data and shows a genuine empty state, CI (lint/typecheck/test on every
PR), the full lesson experience (content-as-code lessons, an interactive block renderer, module
quizzes with server-side grading, lesson completion, course/module listing with real per-lesson
progress), **the entire beginner curriculum** (9 modules, 25 lessons), **the AI tutor**
(streaming chat, level-aware explanations, quick actions, an hourly rate limit, lesson-context
conversations), **skills and achievements** (real unlock criteria, surfaced on the lesson page
and dashboard), **four defensive tools** with full test coverage on their logic, **search** across
vocabulary/lessons/tools, and now **the coding section** (3 modules, 6 lessons, reusing the exact
same content architecture as the security curriculum).

That's the spec's entire own MVP definition (§50, "Must Have" + "Should Have") — all of it, now
built for real. What's left is everything the spec itself calls "Later": Foundations/
Intermediate/Advanced courses, advanced sandboxed labs, deeper analytics, community features,
leaderboards.

**Known, deliberate gaps, stated plainly:**

- Live Python code execution — not built; see the Coding Section note above for why.
- Foundations/Intermediate/Advanced courses, and the higher-level skills/achievements that
  depend on them (Network Explorer, Linux Learner, etc.) — no content exists yet, so nothing
  fakes those unlocks.
- Drag-and-drop/matching/ordering activity kinds (`ActivityBlock`) — typed, not implemented.
- Vocabulary terms are clickable within the lesson that introduces them, not yet auto-linked
  everywhere a term is mentioned in passing.
- A "New conversation" control for the tutor — it currently always continues the most recent
  conversation per lesson context.
- `tool_results` (for saving analyzer history) exists in the schema; nothing writes to it yet —
  the tools are stateless per-visit by design for now.
- **Nothing in this entire project has been run.** Every line was written in a sandboxed
  container with no npm registry access, so `npm install` here is the real first test — budget
  time for at least a small version mismatch or two, per the versioning notes throughout this
  README.

One content note worth flagging: Module 8, Lesson 2 touches on a message pattern (pressure to
move a conversation to another app) that shows up in both scams and more serious situations. It's
written to point a student toward telling a trusted adult, deliberately staying at the pattern
level rather than cataloguing tactics — worth keeping that framing if this lesson gets edited.

**Not verified by running it.** This was generated in a sandboxed environment without npm
registry access, so nothing here has actually been through `npm install` or `next build`. Treat
the first `npm install` as the real smoke test, and expect to fix at least a small version
mismatch or two.
