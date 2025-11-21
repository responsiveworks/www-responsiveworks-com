export interface PortfolioProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  technologies: string[];
  challenge: string;
  solution: string;
  results: string[];
  year: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "Custom online store with inventory management and payment processing.",
    longDescription: "Built a complete e-commerce solution for a growing retail business, handling thousands of products and daily transactions.",
    tags: ["Web Development", "E-Commerce"],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    challenge: "The client needed a scalable platform to handle rapid business growth while maintaining excellent performance and user experience.",
    solution: "We developed a modern, responsive platform with real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.",
    results: [
      "300% increase in online sales",
      "99.9% uptime achieved",
      "Load time reduced to under 2 seconds",
      "Successfully handling 10,000+ monthly orders"
    ],
    year: "2024"
  },
  {
    id: 2,
    slug: "crm-integration",
    title: "CRM Integration System",
    description: "Seamless integration between legacy systems and modern CRM platform.",
    longDescription: "Connected disparate business systems to create a unified view of customer data and streamline operations.",
    tags: ["Integration", "API Development"],
    technologies: ["Python", "REST APIs", "Salesforce", "MySQL"],
    challenge: "Multiple legacy systems were creating data silos and inefficiencies in customer management processes.",
    solution: "We built custom API integrations and middleware to synchronize data across all platforms in real-time.",
    results: [
      "Reduced data entry time by 75%",
      "Eliminated duplicate customer records",
      "Real-time data synchronization across 5 systems",
      "Improved customer service response time by 40%"
    ],
    year: "2024"
  },
  {
    id: 3,
    slug: "inventory-management",
    title: "Inventory Management App",
    description: "Mobile-first inventory tracking system with barcode scanning.",
    longDescription: "Developed a comprehensive inventory management solution for warehouse operations with real-time tracking and analytics.",
    tags: ["Mobile App", "Enterprise"],
    technologies: ["React Native", "TypeScript", "Firebase", "Node.js"],
    challenge: "Manual inventory tracking was causing errors and inefficiencies in warehouse operations.",
    solution: "Created a mobile app with barcode scanning, real-time updates, and predictive analytics for stock management.",
    results: [
      "Inventory accuracy improved to 99.5%",
      "Reduced stockouts by 85%",
      "Saved 20 hours per week in manual tracking",
      "ROI achieved within 6 months"
    ],
    year: "2023"
  },
  {
    id: 4,
    slug: "booking-system",
    title: "Service Booking Platform",
    description: "Online booking and scheduling system for service-based business.",
    longDescription: "Built an automated booking platform that handles scheduling, payments, and customer communications.",
    tags: ["Web Development", "SaaS"],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Twilio"],
    challenge: "Manual booking process was limiting business growth and creating scheduling conflicts.",
    solution: "Developed an automated system with calendar integration, payment processing, and SMS notifications.",
    results: [
      "Bookings increased by 200%",
      "Zero scheduling conflicts",
      "Automated 90% of customer communications",
      "Customer satisfaction score: 4.8/5"
    ],
    year: "2023"
  },
  {
    id: 5,
    slug: "data-analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Real-time business intelligence dashboard with custom reporting.",
    longDescription: "Created a comprehensive analytics platform that consolidates data from multiple sources into actionable insights.",
    tags: ["Analytics", "Dashboard"],
    technologies: ["React", "Python", "PostgreSQL", "D3.js"],
    challenge: "Business data was scattered across multiple platforms with no unified view for decision-making.",
    solution: "Built a custom dashboard that aggregates and visualizes data from all business systems in real-time.",
    results: [
      "Reduced reporting time from days to minutes",
      "Identified $500K in cost savings opportunities",
      "100% adoption rate across management team",
      "Improved decision-making speed by 60%"
    ],
    year: "2023"
  },
  {
    id: 6,
    slug: "workflow-automation",
    title: "Workflow Automation Suite",
    description: "Custom automation tools to streamline repetitive business processes.",
    longDescription: "Developed automation solutions that eliminated manual tasks and improved operational efficiency.",
    tags: ["Automation", "Integration"],
    technologies: ["Python", "JavaScript", "Zapier", "AWS Lambda"],
    challenge: "Team was spending 30+ hours per week on repetitive manual tasks that could be automated.",
    solution: "Created custom automation workflows and integrations between existing business tools.",
    results: [
      "Saved 120+ hours per month",
      "Reduced human error by 95%",
      "Automated 15 critical business processes",
      "Payback period: 3 months"
    ],
    year: "2022"
  },
];
