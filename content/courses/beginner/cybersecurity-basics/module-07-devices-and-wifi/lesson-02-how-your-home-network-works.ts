import type { Lesson } from "@/content/types";

export const howYourHomeNetworkWorks: Lesson = {
  slug: "how-your-home-network-works",
  title: "How Your Home Network Works",
  estimatedMinutes: 9,
  objective:
    "Explain, in plain terms, what a router does and what an IP address and DNS actually are.",
  blocks: [
    {
      type: "text",
      body: "Every device that connects to the internet needs an address, the same way every house on a street needs one for mail to find it. A router is the device in your home that manages this — it connects your home network to the wider internet, and it hands out local addresses to every device that joins your Wi-Fi.",
    },
    {
      type: "vocabulary",
      term: {
        term: "IP address",
        simpleDefinition:
          "A unique number that identifies a device on a network, the way a street address identifies a house.",
        technicalDefinition:
          "A numerical label assigned to each device on a network, used to route data to the correct destination. Most home devices use a private IP address, valid only within the home network, while the router itself has a public IP address that represents the whole household to the wider internet.",
      },
    },
    {
      type: "vocabulary",
      term: {
        term: "MAC address",
        simpleDefinition:
          "A unique ID number built into a specific device's network hardware — it doesn't change even if you move to a different network.",
        technicalDefinition:
          "A hardware identifier (Media Access Control address) assigned to a network interface at the time of manufacture. Unlike an IP address, which changes depending on the network you join, a MAC address is tied to the physical hardware itself — which is why some networks use MAC filtering as one (limited) layer of access control.",
      },
    },
    {
      type: "vocabulary",
      term: {
        term: "DNS",
        simpleDefinition:
          "The system that translates a website name you type (like a search engine's address) into the numerical IP address computers actually use to find it.",
        technicalDefinition:
          "The Domain Name System is a distributed directory service that resolves human-readable domain names into IP addresses. Without it, you'd need to memorize a numerical address for every site you visit — DNS is what makes typing a name instead of a number possible.",
      },
    },
    {
      type: "text",
      body: "Put together: you type a website's name, DNS translates that name into an IP address, and your router directs the request out to the internet and routes the response back to your specific device. It's a lot like calling a business by name and having a directory service look up the actual phone number for you behind the scenes.",
    },
    {
      type: "scenario",
      setup:
        "You're setting up a new home router. It comes with a default administrator password printed on a sticker, and default Wi-Fi network name. What's worth changing before you start using it?",
      choices: [
        {
          id: "leave-defaults",
          text: "Nothing — the defaults are there for a reason and should be fine.",
          isSafe: false,
          feedback:
            "Default administrator passwords are frequently the same across every unit of that router model, and lists of them are easy to find. Leaving it unchanged means anyone who can guess or look up your router's model has a real shot at its admin panel.",
        },
        {
          id: "change-admin-password",
          text: "Change the default administrator password to something unique.",
          isSafe: true,
          feedback:
            "Right — this is the single most important router setting to change, since the admin panel controls your entire home network's configuration.",
        },
      ],
    },
    {
      type: "question",
      prompt: "What does DNS actually do?",
      options: [
        {
          id: "a",
          text: "It translates a website name into the IP address needed to actually reach it",
        },
        { id: "b", text: "It encrypts your internet traffic" },
        { id: "c", text: "It's another name for a router" },
      ],
      correctOptionId: "a",
      explanation:
        "DNS is purely a translation/lookup service — the name-to-address directory that makes typing memorable names possible.",
    },
  ],
};
