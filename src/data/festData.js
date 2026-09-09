export const FEST_DATA = {
  name: "Martinovation",
  year: "2026",
  tagline: "Genesis of Tomorrow — The Anime & Cyberpunk Techno-Cultural Matrix",
  university: "Usha Martin University, Ranchi",
  dates: "October 5 - October 9, 2026",
  startDate: "2026-10-05T09:00:00",
  venue: "Usha Martin University Campus, Angara, Ranchi, Jharkhand",
  totalPrizePool: "₹5,00,000+",
  expectedParticipants: "5,000+",
  participatingColleges: "25+",
  logoText: "MARTINOVATION 2026",
  
  categories: [
    { id: "all", label: "All Quests", icon: "Sparkles" },
    { id: "hackathon", label: "Cyber Code & Hackathons", icon: "Code" },
    { id: "robotics", label: "Robo Wars & Mech Bay", icon: "Cpu" },
    { id: "gaming", label: "Esports & Game Zone", icon: "Gamepad2" },
    { id: "creative", label: "Creative & AI Arts", icon: "Palette" },
    { id: "cultural", label: "Star Night & Cultural", icon: "Music" }
  ],

  events: [
    {
      id: "hackathon-24h",
      title: "Genesis Hackathon (24-Hour)",
      category: "hackathon",
      badge: "Flagship Quest",
      difficulty: "LEGENDARY",
      prize: "₹1,00,000",
      entryFee: "₹400 / Team",
      teamSize: "2 - 4 Members",
      date: "Oct 5 - Oct 6, 2026",
      time: "10:00 AM - 10:00 AM",
      venue: "CS Innovation Lab (Block B)",
      shortDesc: "A 24-hour non-stop code duel to build futuristic solutions in AI, Web3, and Smart Campus Tech.",
      description: "Genesis Hackathon is the flagship coding battle of Martinovation 2026. Teams will tackle real-world problems using cutting-edge AI, IoT, Web3, or Sustainable Tech. Mentors from top tech industries will guide participants.",
      rules: [
        "Plagiarism or pre-built complete solutions result in instant disqualification.",
        "Code must be pushed to a fresh public GitHub repository during the event.",
        "Final presentation includes a 5-minute pitch + live demo in front of expert judges.",
        "Hardware prototypes will receive extra innovation bonus points."
      ],
      coordinators: [
        { name: "Rahul Verma", phone: "+91 98765 43210" },
        { name: "Sneha Roy", phone: "+91 87654 32109" }
      ]
    },
    {
      id: "robo-wars",
      title: "Mech Clash: Battle Bots",
      category: "robotics",
      badge: "High Octane",
      difficulty: "HARDCORE",
      prize: "₹75,000",
      entryFee: "₹500 / Team",
      teamSize: "1 - 5 Members",
      date: "Oct 6, 2026",
      time: "11:00 AM - 04:00 PM",
      venue: "Mechanical Arena (Block A Ground)",
      shortDesc: "Custom-built combat robots clash in a steel cage match for ultimate domination.",
      description: "Engineers unleash heavy metal fury! Bring your custom 15kg or 30kg combat bots into the fortified arena to flip, crush, and incapacitate opponents in head-to-head elimination rounds.",
      rules: [
        "Bot weight must strictly comply with the weight category (+/- 2% buffer allowed).",
        "Wired or wireless control allowed; fail-safe mechanisms are mandatory.",
        "Flame throwers, liquid weapons, and EMP weapons are strictly prohibited.",
        "Round time: 3 minutes per cage match."
      ],
      coordinators: [
        { name: "Vikram Singh", phone: "+91 99887 76655" }
      ]
    },
    {
      id: "robo-race",
      title: "Cyber-Sprint: Robo Race",
      category: "robotics",
      badge: "Speed Quest",
      difficulty: "MEDIUM",
      prize: "₹35,000",
      entryFee: "₹300 / Team",
      teamSize: "1 - 3 Members",
      date: "Oct 6, 2026",
      time: "02:00 PM - 05:00 PM",
      venue: "Outdoor Tech Arena Track",
      shortDesc: "Navigate custom obstacle tracks featuring mud, sand, ramps, and sharp hairpin turns.",
      description: "Test your bot's maneuverability, speed, and suspension across an unpredictable cyber obstacle course filled with mud pits, bridges, and elevation ramps.",
      rules: [
        "Bots must fit inside a 30cm x 30cm x 30cm box.",
        "Skipping obstacles incurs time penalties (+10 seconds).",
        "Fastest total time wins."
      ],
      coordinators: [
        { name: "Priya Sharma", phone: "+91 91234 56789" }
      ]
    },
    {
      id: "bgmi-esports",
      title: "Cyberpunk BGMI Showdown",
      category: "gaming",
      badge: "Esports Arena",
      difficulty: "HARDCORE",
      prize: "₹50,000",
      entryFee: "₹300 / Squad",
      teamSize: "4 Players",
      date: "Oct 7, 2026",
      time: "10:00 AM - 06:00 PM",
      venue: "Main Auditorium Esports Hub",
      shortDesc: "Squad up for Erangel battle royale supremacy with live stage commentary.",
      description: "The ultimate battleground showdown! 32 squads compete across Erangel, Miramar, and Sanhok. Top 16 qualify for the grand stage finals with live LED commentary.",
      rules: [
        "Strictly mobile devices only (Emulators/iPads strictly banned).",
        "Third-party cheats, hacks, or sound enhancers will result in immediate ban.",
        "Point system: Standard official BGMI tournament point chart."
      ],
      coordinators: [
        { name: "Aman Gupta", phone: "+91 95432 10987" }
      ]
    },
    {
      id: "valorant-cyber",
      title: "Valorant Cyber-Strike 5v5",
      category: "gaming",
      badge: "PC Gaming",
      difficulty: "HARDCORE",
      prize: "₹40,000",
      entryFee: "₹500 / Team",
      teamSize: "5 Players",
      date: "Oct 7, 2026",
      time: "11:00 AM - 07:00 PM",
      venue: "High-End Computer Lab 3",
      shortDesc: "Tactical 5v5 FPS tournament on 240Hz mechanical rigs.",
      description: "Plant the spike or defuse the threat! Tactical FPS duel featuring single-elimination bracket up to semifinals, followed by Best of 3 Grand Final.",
      rules: [
        "Tournament map pool: Ascent, Haven, Bind, Sunset, Lotus.",
        "Bring your own peripherals (Mouse/Headset/Keyboard allowed).",
        "Tactical timeouts allowed once per map."
      ],
      coordinators: [
        { name: "Rohan Das", phone: "+91 98111 22233" }
      ]
    },
    {
      id: "ai-prompt-art",
      title: "AI Canvas & Prompt Battle",
      category: "creative",
      badge: "Anime & AI",
      difficulty: "EXPERT",
      prize: "₹25,000",
      entryFee: "₹150 / Person",
      teamSize: "1 Person",
      date: "Oct 8, 2026",
      time: "10:30 AM - 01:30 PM",
      venue: "Design Studio (Block C)",
      shortDesc: "Craft stunning anime/cyberpunk digital art live using advanced generative AI prompts.",
      description: "Challenge your imagination! Participants are given secret futuristic prompt themes live on stage and must engineer the ultimate anime/cyberpunk artwork in 60 minutes.",
      rules: [
        "Platform provided: Midjourney / DALL-E / Stable Diffusion.",
        "Final submission must include raw text prompts used.",
        "Judged on creativity, prompt technique, aesthetic depth, and theme match."
      ],
      coordinators: [
        { name: "Ananya Mehta", phone: "+91 97777 88899" }
      ]
    },
    {
      id: "web-craft",
      title: "WebCraft: Cyber Frontend UI",
      category: "hackathon",
      badge: "UI Speedrun",
      difficulty: "MEDIUM",
      prize: "₹30,000",
      entryFee: "₹200 / Team",
      teamSize: "1 - 2 Members",
      date: "Oct 6, 2026",
      time: "02:00 PM - 05:00 PM",
      venue: "Web Dev Lab 1",
      shortDesc: "Design & code an interactive anime/game themed landing page within 3 hours.",
      description: "Show off your CSS animation, React, and GSAP mastery! Speedrun build a responsive futuristic interface based on a mystery client prompt.",
      rules: [
        "Must use HTML/CSS/JS or React + Tailwind.",
        "Judged on visual polish, responsiveness, animations, and UX flow."
      ],
      coordinators: [
        { name: "Kunal Ghosh", phone: "+91 93333 44455" }
      ]
    },
    {
      id: "star-night",
      title: "Cosmic Star Night & DJ Arena",
      category: "cultural",
      badge: "Grand Finale",
      difficulty: "LEGENDARY",
      prize: "Trophies & Passes",
      entryFee: "Free with Fest Ticket Pass",
      teamSize: "Open Access",
      date: "Oct 9, 2026",
      time: "06:00 PM - 10:00 PM",
      venue: "UMU Central Open Ground",
      shortDesc: "Electrifying celebrity musical concert, EDM DJ performance, and award ceremony.",
      description: "The crown jewel of Martinovation 2026! Featuring live celebrity artist performance, high-energy laser show, anime cosplayers show, and prize distribution for all fest champions.",
      rules: [
        "Valid Martinovation Digital Pass QR code required at entry gates.",
        "Strict university security guidelines enforced."
      ],
      coordinators: [
        { name: "Cultural Committee UMU", phone: "+91 651 223344" }
      ]
    }
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Monday, October 5, 2026",
      events: [
        { time: "09:30 AM", title: "Grand Opening & Genesis Anime Video Reveal", venue: "Main Auditorium", type: "Ceremony" },
        { time: "10:30 AM", title: "24-Hour Genesis Hackathon Kickoff", venue: "CS Innovation Lab", type: "Technical" },
        { time: "01:30 PM", title: "Tech Expo & AI Poster Exhibition", venue: "Central Foyer", type: "Exhibition" },
        { time: "05:00 PM", title: "Keynote: Future of GenAI by Industry Leaders", venue: "Main Auditorium", type: "Talk" }
      ]
    },
    {
      day: "Day 2",
      date: "Tuesday, October 6, 2026",
      events: [
        { time: "10:00 AM", title: "Genesis Hackathon Final Submissions & Pitching", venue: "CS Lab", type: "Technical" },
        { time: "11:00 AM", title: "Mech Clash: Battle Bots Round 1", venue: "Mechanical Arena", type: "Robotics" },
        { time: "02:00 PM", title: "Cyber-Sprint Robo Race & WebCraft UI Speedrun", venue: "Outdoor Arena", type: "Technical" },
        { time: "06:00 PM", title: "Anime Cosplay Showcase & Battle of Bands", venue: "Ampitheatre", type: "Cultural" }
      ]
    },
    {
      day: "Day 3",
      date: "Wednesday, October 7, 2026",
      events: [
        { time: "10:00 AM", title: "BGMI Esports Showdown Qualifying Matches", venue: "Auditorium Hub", type: "Gaming" },
        { time: "11:00 AM", title: "Valorant Cyber-Strike 5v5 Semi-Finals", venue: "Computer Lab 3", type: "Gaming" },
        { time: "03:00 PM", title: "Drone Racing & Sky-Strike Demo", venue: "Sports Ground", type: "Robotics" },
        { time: "06:00 PM", title: "Voice of UMU Singing Championship", venue: "Open Stage", type: "Cultural" }
      ]
    },
    {
      day: "Day 4",
      date: "Thursday, October 8, 2026",
      events: [
        { time: "10:30 AM", title: "AI Canvas & Prompt Art Battle", venue: "Design Studio", type: "Creative" },
        { time: "02:00 PM", title: "BGMI & Valorant Grand Finals Live Broadcast", venue: "Main Auditorium", type: "Gaming" },
        { time: "06:30 PM", title: "Vogue Matrix: Cosmic Cyber Fashion Runway", venue: "Central Stage", type: "Cultural" }
      ]
    },
    {
      day: "Day 5",
      date: "Friday, October 9, 2026",
      events: [
        { time: "04:00 PM", title: "Grand Valedictory & Prize Distribution Ceremony", venue: "Central Ground", type: "Ceremony" },
        { time: "06:00 PM", title: "Cosmic Star Night: Celebrity Artist Performance & EDM DJ", venue: "Central Ground", type: "Star Night" }
      ]
    }
  ],

  campusArenas: [
    { id: "auditorium", name: "Cyber Auditorium", code: "BLOCK-A", desc: "Main stage for Inauguration, BGMI Finals, and Keynotes." },
    { id: "cs-lab", name: "CS Innovation Bay", code: "BLOCK-B", desc: "24-Hour Genesis Hackathon & WebDev Speedruns." },
    { id: "mech-arena", name: "Mech Battle Cage", code: "ARENA-1", desc: "Battle Bots steel enclosure & Robo Race obstacle track." },
    { id: "gaming-hub", name: "Esports Dome", code: "BLOCK-C", desc: "High-spec 240Hz PC setups and tablet gaming zones." },
    { id: "star-ground", name: "Cosmic Open Ground", code: "MAIN-GROUND", desc: "Food Stalls, Star Night Concert, and Valedictory." }
  ],

  sponsors: [
    { name: "Intel", category: "Title Sponsor", logo: "INTEL" },
    { name: "Nvidia", category: "Powered By", logo: "NVIDIA" },
    { name: "GitHub", category: "Hackathon Partner", logo: "GITHUB" },
    { name: "Red Bull", category: "Energy Partner", logo: "REDBULL" },
    { name: "UMU Innovation Lab", category: "Academic Partner", logo: "UMU" }
  ],

  team: [
    { name: "Dr. Ramesh Chandra", role: "Patron & VC, UMU", tag: "FACULTY" },
    { name: "Prof. Alok Kumar", role: "Fest Convener & Head of CSE", tag: "FACULTY" },
    { name: "Abhishek Sharma", role: "Overall Student President", tag: "STUDENT LEAD" },
    { name: "Ananya Roy", role: "Head of Tech & Hackathons", tag: "STUDENT LEAD" },
    { name: "Rishabh Malhotra", role: "Head of Esports & Game Zone", tag: "STUDENT LEAD" }
  ]
};
