import type { Lesson } from "@/content/types";

export const privacySettingsAndOversharing: Lesson = {
  slug: "privacy-settings-and-oversharing",
  title: "Privacy Settings and Oversharing",
  estimatedMinutes: 8,
  objective: "Apply privacy-setting awareness specifically to social media, including location data.",
  blocks: [
    {
      type: "text",
      body: "Module 2 covered personal information in general. Social media adds a specific wrinkle: platforms are built to encourage sharing, and their default settings often favor visibility over privacy — because more visible content is, from the platform's perspective, more engaging.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Geotagging",
        simpleDefinition:
          "When a photo or post automatically includes your location, sometimes without you realizing it's attached.",
        technicalDefinition:
          "The embedding of geographic location metadata (latitude/longitude, often from GPS) into a file or post, either automatically by the device's camera/app settings or through an explicit location tag. Many platforms strip this metadata from displayed images but still use it internally, while some display it directly on the post itself.",
      },
    },
    {
      type: "scenario",
      setup:
        "You post a photo from a trip, tagged with your exact current location, saying \"Having a great time away from home for the week!\"",
      choices: [
        {
          id: "seems-harmless",
          text: "Post it as is — it's just sharing your trip with friends.",
          isSafe: false,
          feedback:
            "This combines two things worth separating: an exact current location, and a public statement that your home is unoccupied for a known period. Neither alone is unusual, but together, on a public or loosely private account, it's a specific and avoidable disclosure.",
        },
        {
          id: "adjust-post",
          text: "Post it, but skip the exact location tag and the mention of being away for a week — or share it only with close friends.",
          isSafe: true,
          feedback:
            "Good instinct. You don't have to stop sharing trips — just consider posting after you're back, or limiting the audience, rather than broadcasting real-time \"away from home\" details publicly.",
        },
      ],
    },
    {
      type: "text",
      body: "A practical habit: periodically check who can actually see your posts, not just what the posts say. Default audiences (\"public,\" \"friends of friends\") sometimes reach far more people than you'd assume, and platforms occasionally reset settings after updates.",
    },
    {
      type: "question",
      prompt: "What's the main reason geotagging deserves specific caution, beyond general oversharing?",
      options: [
        { id: "a", text: "It reveals exact location data, which combined with other posts can reveal patterns like when you're not home" },
        { id: "b", text: "It has no real privacy implications" },
      ],
      correctOptionId: "a",
      explanation:
        "Precise location, especially combined with timing information, is a specific and concrete kind of disclosure — more so than a vague mention of a place.",
    },
  ],
};
