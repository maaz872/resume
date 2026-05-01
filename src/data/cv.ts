export const profile = {
  name: "Maaz Ahmed",
  title: "Mobile App Sales & Business Growth Leader",
  intro:
    "I help technology companies sell, structure, and scale mobile app and SaaS solutions through consultative selling, strong client communication, and revenue-focused strategy.",
  email: "maaz872@gmail.com",
  phoneDisplay: "0332-22497026",
  phoneTel: "+923322497026",
  linkedin: "https://www.linkedin.com/in/maaz-ahmed-6b957115b",
  badge: "Available for Mobile App Sales Roles",
};

export const summary =
  "Strategic Mobile App Sales Specialist and Business Growth Leader with experience scaling revenue, building high-performing teams, and closing complex B2B technology deals. Known for turning client ideas into structured, high-value mobile app and SaaS solutions while bridging the gap between business goals and technical execution.";

export const metrics = [
  { value: 300, suffix: "%+", label: "Revenue Growth", iconKey: "trending" as const },
  { value: 600, suffix: "%+", label: "Business Unit Scaling", iconKey: "rocket" as const },
  { value: 40, suffix: "%+", label: "Conversion Improvement", iconKey: "target" as const },
  { value: 2, suffix: "x+", label: "Target Overperformance", iconKey: "trophy" as const },
];

export const competencies = [
  "Mobile App Sales",
  "SaaS Sales",
  "B2B Solution Selling",
  "Client Consultation",
  "Requirement Analysis",
  "Proposal Structuring",
  "Deal Negotiation",
  "Sales Strategy",
  "Revenue Growth",
  "Team Leadership",
  "Pipeline Optimization",
  "Cross-functional Collaboration",
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "LaunchBox Pakistan",
    role: "Vice President — Mobile App Sales & Growth",
    period: "2024 – 2025",
    bullets: [
      "Scaled the mobile app business unit by 600%+",
      "Increased monthly sales revenue by 300%+",
      "Built and led a high-performance sales team",
      "Oversaw positioning, pricing strategy, and client engagement",
    ],
  },
  {
    company: "Meta Frolic Labs (Pvt.) Ltd.",
    role: "Assistant Vice President — Sales Strategy",
    period: "2023 – 2024",
    bullets: [
      "Improved sales conversion rates by 40%+",
      "Helped close enterprise-level mobile app deals",
      "Optimized sales funnel efficiency",
      "Worked with technical teams to align solutions with client requirements",
    ],
  },
  {
    company: "Easyfringe",
    role: "Business Unit Manager — Mobile Applications",
    period: "2023",
    bullets: [
      "Managed mobile app sales operations",
      "Increased team output by 50%+",
      "Led client consultations and structured high-value proposals",
    ],
  },
  {
    company: "Binate Digital",
    role: "Business Unit Manager / Senior Associate Manager / Sales Executive",
    period: "2022 – 2023",
    bullets: [
      "Progressed rapidly through multiple sales leadership roles",
      "Contributed to revenue growth of 200%+",
      "Improved team sales performance by 60%+",
      "Managed international clients and complex mobile app deals",
    ],
  },
  {
    company: "Binate Digital",
    role: "Project Manager",
    period: "2022",
    bullets: [
      "Managed project delivery lifecycle",
      "Coordinated between clients and development teams",
      "Improved stakeholder communication",
    ],
  },
  {
    company: "Bank AL Habib Limited",
    role: "Developer Intern",
    period: "2019",
    bullets: [
      "Supported development and testing of financial applications",
      "Assisted with enterprise Java-based projects",
      "Contributed to bug fixing and QA workflows",
    ],
  },
  {
    company: "LAYERS LOGIC-IT SRL",
    role: "Freelance IT Support",
    period: "2018 – 2019",
    bullets: [
      "Provided troubleshooting and system support",
      "Assisted with hardware fixes and software updates",
      "Supported operational reliability",
    ],
  },
];

export const strengths = [
  {
    title: "Consultative Selling",
    body: "I focus on understanding the business problem first, then positioning mobile app solutions around real commercial value.",
    iconKey: "handshake" as const,
  },
  {
    title: "Technical Understanding",
    body: "My technical background helps me communicate clearly with both clients and development teams.",
    iconKey: "cpu" as const,
  },
  {
    title: "Revenue-Focused Leadership",
    body: "I build sales systems, coach teams, and improve conversion through process, clarity, and accountability.",
    iconKey: "chart" as const,
  },
];

export const education = {
  university: {
    name: "Bilkent University",
    degree: "BSc — Computer Technology & Information Systems",
  },
  certification: {
    name: "Stanford University",
    detail: "Code in Place",
  },
  languages: [
    { name: "English", level: "Full Professional" },
    { name: "Turkish", level: "Limited Working" },
  ],
};
