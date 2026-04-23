export const mockDb = {
  profile: {
    name: "John Doe",
    level: "Intermediate Trader",
    joined: "January 2026",
    totalXP: "14,500",
    batch: "Batch A",
    teacher: "Sarah Chen"
  },
  
  upcomingLiveClass: {
    title: "Options Pricing Models",
    instructor: "Sarah Chen",
    batch: "Batch A",
    countdown: "00:45:12"
  },

  schedule: [
    { id: 1, date: "Oct 25, 2026", time: "10:00 AM", teacher: "Sarah Chen", batch: "Batch A", topic: "Options Pricing Models" },
    { id: 2, date: "Oct 26, 2026", time: "02:00 PM", teacher: "Sarah Chen", batch: "Batch A", topic: "Macroeconomics Recap" },
    { id: 3, date: "Oct 28, 2026", time: "10:00 AM", teacher: "Sarah Chen", batch: "Batch A", topic: "Algorithmic Trading Intro" },
  ],

  courses: [
    { id: "c1", name: "Advanced Technical Analysis", progress: 68, modulesCompleted: 8, totalModules: 12 },
    { id: "c2", name: "Risk Management 101", progress: 100, modulesCompleted: 5, totalModules: 5 },
    { id: "c3", name: "Trading Psychology", progress: 10, modulesCompleted: 1, totalModules: 10 },
  ],

  attendance: {
    totalClasses: 48,
    attended: 44,
    rate: "91.6%",
    records: [
      { id: 1, date: "Oct 24, 2026", class: "Options Pricing Models", teacher: "Sarah Chen", status: "Present" },
      { id: 2, date: "Oct 22, 2026", class: "Macroeconomics Recap", teacher: "Sarah Chen", status: "Absent" },
      { id: 3, date: "Oct 20, 2026", class: "Algorithmic Trading Intro", teacher: "Sarah Chen", status: "Present" },
      { id: 4, date: "Oct 18, 2026", class: "Risk Management 101", teacher: "Sarah Chen", status: "Present" },
    ]
  },

  reminders: [
    { id: 1, title: "Module 3 Assignment Due", type: "Assignment", date: "Today, 11:59 PM", status: "error" },
    { id: 2, title: "Mid-term Exam Prep", type: "Exam", date: "Tomorrow, 10:00 AM", status: "warning" },
    { id: 3, title: "Options Pricing Live Class", type: "Live Class", date: "Friday, 10:00 AM", status: "info" },
    { id: 4, title: "Review Fibonacci Material", type: "Study", date: "Sunday, Evening", status: "neutral" },
  ],

  announcements: [
    { id: 1, title: "Class Timing Updated", content: "Due to scheduling adjustments, our Thursday live classes will now start at 10:30 AM.", time: "2 hours ago" }
  ],

  marketNews: [
    { id: 1, tag: "Market Flash", title: "Federal Reserve Holds Rates Steady at 5.25%", abstract: "In a widely expected move, the Fed opted to keep benchmark interest rates unchanged, citing 'balanced' risks to the economic outlook.", time: "45 mins ago", trending: true },
    { id: 2, tag: "Crypto", title: "Bitcoin Surges Past $85k After ETF Accumulation Phase", abstract: "Institutional inflows have reached a new high as spot ETFs purchased over 12,000 BTC in the last 48 hours.", time: "2 hours ago", trending: false },
    { id: 3, tag: "Equities", title: "Tech Sector Rallies on AI-Driven Earnings Beats", abstract: "Major cloud providers blew past Q3 expectations, signaling that the enterprise AI spending boom is continuing to accelerate.", time: "5 hours ago", trending: false }
  ],

  recordings: [
    { id: "r1", chapter: 3, title: "Fibonacci Retracements Part 2", time: "1 hour ago", duration: "45m", date: "Oct 24, 2026", instructor: "Sarah Chen", description: "In this video, we dive deeper into advanced retracement strategies and how to combine them with Elliot Wave theory to effectively identify reversal zones during high volatility." },
    { id: "r2", chapter: 2, title: "Market Open Analysis", time: "Yesterday", duration: "1h 12m", date: "Oct 23, 2026", instructor: "Sarah Chen", description: "A deep dive into opening market conditions." },
    { id: "r3", chapter: 1, title: "Intro to Price Action", time: "1 week ago", duration: "55m", date: "Oct 15, 2026", instructor: "Sarah Chen", description: "Beginners guide to reading price action." }
  ],

  activeDevice: {
    hardwareId: "MAC-99A1-B3C4",
    name: "iPhone 14 Pro Max",
    status: "Authorised",
    lastActive: "Active now"
  },

  deviceRequests: [
    { id: "req-1", studentName: "Julian Mayer", studentId: "AZ-44821", deviceReqName: "iPad Pro 12.9\"", type: "Permanent", reqDate: "2026-04-18" },
    { id: "req-2", studentName: "Kevin Dubois", studentId: "AZ-55677", deviceReqName: "Dell XPS 15", type: "Temporary", reqDate: "2026-04-18", duration: "24 Hours" }
  ]
};

// Fake async DB service
export const db = {
  user: {
    getStudentData: async () => mockDb,
    getAdminDevices: async () => mockDb.deviceRequests
  }
};
