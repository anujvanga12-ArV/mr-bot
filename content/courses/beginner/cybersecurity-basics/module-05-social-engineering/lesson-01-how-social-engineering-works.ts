import type { Lesson } from "@/content/types";

export const howSocialEngineeringWorks: Lesson = {
  slug: "how-social-engineering-works",
  title: "How Social Engineering Works",
  estimatedMinutes: 8,
  objective:
    "Name the core psychological levers social engineering relies on, and why they work on everyone.",
  blocks: [
    {
      type: "text",
      body: "Phishing (Module 4) is one specific form of a bigger idea: social engineering — manipulating people, rather than computers, into doing something they wouldn't otherwise do. It doesn't require any technical skill at all. It requires understanding how people react under pressure.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Social engineering",
        simpleDefinition:
          "Tricking a person — not a computer — into giving up information or access, usually by creating pressure or false trust.",
        technicalDefinition:
          "The use of psychological manipulation to induce individuals to divulge confidential information or perform actions that compromise security, exploiting cognitive biases rather than technical vulnerabilities. It's often considered the most reliable attack method precisely because it bypasses technical defenses entirely.",
      },
    },
    {
      type: "text",
      body: 'A handful of levers show up again and again, in different disguises:\n\n• Urgency — "act now or lose access."\n• Fear — "something bad has already happened."\n• Authority — "I\'m from IT / support / an admin."\n• Curiosity — "you won\'t believe this."\n• Trust — impersonating someone you already know.\n\nNone of these require any hacking. They work by short-circuiting the moment you\'d normally pause and think.',
    },
    {
      type: "text",
      body: "It's worth saying directly: falling for this isn't about being unintelligent or careless. These techniques are specifically designed to work on careful people too, by targeting a moment of distraction or genuine emotion rather than a gap in knowledge. Recognizing the pattern in the moment is the actual skill — not being naturally \"too smart to fall for it.\"",
    },
    {
      type: "question",
      prompt: "Social engineering is most accurately described as...",
      options: [
        { id: "a", text: "A technical hacking method that exploits software bugs" },
        {
          id: "b",
          text: "Manipulating a person's psychology to get them to act against their own interest",
        },
        { id: "c", text: "Something that only works on people who aren't paying attention" },
      ],
      correctOptionId: "b",
      explanation:
        "It targets people, not systems — which is exactly why it can work regardless of how technically secure the underlying systems are.",
    },
  ],
};
