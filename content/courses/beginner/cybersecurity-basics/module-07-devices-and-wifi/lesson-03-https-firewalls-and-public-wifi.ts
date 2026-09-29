import type { Lesson } from "@/content/types";

export const httpsFirewallsAndPublicWifi: Lesson = {
  slug: "https-firewalls-and-public-wifi",
  title: "HTTPS, Firewalls, and Public Wi-Fi",
  estimatedMinutes: 9,
  objective: "Explain what HTTPS and a firewall actually protect, and apply that to public Wi-Fi safety.",
  blocks: [
    {
      type: "text",
      body: "Module 2 mentioned that HTTPS matters more on public Wi-Fi than almost anywhere else, without fully explaining why. This lesson closes that loop.",
    },
    {
      type: "vocabulary",
      term: {
        term: "HTTPS",
        simpleDefinition:
          "The secure version of the connection your browser uses to load a website — it scrambles the data so others on the same network can't read it.",
        technicalDefinition:
          "HTTP over TLS (Transport Layer Security): it encrypts data in transit between your browser and the website's server, and verifies the server's identity via a certificate. The padlock icon in a browser's address bar indicates an active HTTPS connection — it confirms the connection is encrypted and the certificate is valid, though it says nothing about whether the site's content itself is trustworthy.",
      },
    },
    {
      type: "vocabulary",
      term: {
        term: "Firewall",
        simpleDefinition:
          "A security system that controls what network traffic is allowed in or out of a device or network.",
        technicalDefinition:
          "A network security system that monitors and filters incoming and outgoing traffic based on a defined set of rules, acting as a barrier between a trusted internal network (or device) and untrusted external networks. Firewalls exist both as dedicated hardware (often built into routers) and as software running on individual devices.",
      },
    },
    {
      type: "text",
      body: "Here's why this connects to public Wi-Fi specifically: on a network you don't control, other devices may share that same network. HTTPS means that even if someone else on the network could technically see your traffic pass by, what they'd see is scrambled — not your actual password or messages. A site without HTTPS offers no such protection on any network, but the risk becomes concrete specifically when the network itself isn't private.",
    },
    {
      type: "scenario",
      setup:
        "You're at a coffee shop and need to log into an account. The site's address bar shows no padlock icon, and the address starts with \"http://\" instead of \"https://\". What should you do?",
      choices: [
        {
          id: "log-in-anyway",
          text: "Log in anyway — you need to get this done now.",
          isSafe: false,
          feedback:
            "Without HTTPS, whatever you type could potentially be visible to others on the same public network. This is exactly the situation where that theoretical risk becomes practical.",
        },
        {
          id: "wait-or-switch",
          text: "Wait until you're on a trusted network, or avoid entering sensitive information on that site here.",
          isSafe: true,
          feedback:
            "Right call. In practice, the large majority of real websites use HTTPS today — a login page that doesn't is itself worth treating with suspicion, separate from the public Wi-Fi question entirely.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Why does HTTPS matter more on public Wi-Fi specifically?",
      options: [
        { id: "a", text: "Because public Wi-Fi doesn't work without it" },
        { id: "b", text: "Because other devices may share that network, and HTTPS keeps your data unreadable to them even so" },
      ],
      correctOptionId: "b",
      explanation:
        "The encryption matters everywhere, but the practical risk of an untrusted shared network is what makes it especially relevant on public Wi-Fi.",
    },
  ],
  quiz: {
    slug: "module-07-devices-and-wifi-review",
    questions: [
      {
        type: "question",
        prompt: "What does an IP address do?",
        options: [
          { id: "a", text: "Identifies a device on a network, similar to a street address" },
          { id: "b", text: "Encrypts your internet traffic" },
        ],
        correctOptionId: "a",
        explanation: "It's an addressing system for routing data to the right device, not an encryption mechanism.",
      },
      {
        type: "question",
        prompt: "What's the most important router setting to change from its default?",
        options: [
          { id: "a", text: "The administrator password" },
          { id: "b", text: "The router's brand name" },
        ],
        correctOptionId: "a",
        explanation: "Default admin passwords are often shared across every unit of a router model and easy to look up.",
      },
      {
        type: "question",
        prompt: "What does the padlock icon in a browser's address bar actually confirm?",
        options: [
          { id: "a", text: "That the connection is encrypted (HTTPS) and the certificate is valid" },
          { id: "b", text: "That the website's content is definitely trustworthy" },
        ],
        correctOptionId: "a",
        explanation: "It's a statement about the connection's security, not a judgment about whether the site itself is legitimate or safe.",
      },
      {
        type: "question",
        prompt: "A firewall's main job is to...",
        options: [
          { id: "a", text: "Monitor and filter what network traffic is allowed in or out" },
          { id: "b", text: "Translate website names into IP addresses" },
        ],
        correctOptionId: "a",
        explanation: "That's DNS's job — a firewall is specifically about filtering traffic based on rules.",
      },
    ],
  },
};
