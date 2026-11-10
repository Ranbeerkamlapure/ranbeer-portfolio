export const profile = {
  name: 'Ranbeer Kamlapure',
  location: 'Solapur, Maharashtra, India',
  email: 'ranbeerk036@gmail.com',
  github: 'https://github.com/RanbeerKamlapure',
  linkedin: 'https://www.linkedin.com/in/ranbeer-kamlapure-77b514259/',
  headline: 'Full-Stack Developer | Backend-Focused | Building Practical Web Applications',
  identity: 'Full-Stack Developer',
  secondary: 'Backend Development and Software Engineering',
  about: [
    "I'm Ranbeer Kamlapure, an Electronics and Computer Engineering student at Walchand Institute of Technology, Solapur, graduating in 2027. I'm passionate about building practical software applications and understanding the engineering that powers them — from designing intuitive interfaces to developing backend systems and managing data.",
    'My primary focus is full-stack development, with a strong interest in backend engineering. I work primarily with JavaScript, Node.js, Express.js, and MongoDB, building applications involving RESTful APIs, authentication, database design, and server-side logic.',
    "Through projects like Orbit, a full-stack property listing platform, and Samjhao, an AI-powered multilingual document explainer, I've gained hands-on experience translating ideas into working applications and solving practical development challenges.",
    "I'm continuously strengthening my problem-solving abilities, data structures and algorithms, and software engineering fundamentals. I enjoy learning by building, exploring how systems work, and developing solutions that are useful, reliable, and thoughtfully engineered.",
  ],
  languages: ['English', 'Hindi', 'Marathi', 'Kannada'],
}

export const navLinks = [
  { id: 'signal', label: 'Signal' },
  { id: 'human', label: 'About' },
  { id: 'mind', label: 'Mind' },
  { id: 'craft', label: 'Craft' },
  { id: 'proof', label: 'Projects' },
  { id: 'evolution', label: 'Evolution' },
  { id: 'contact', label: 'Contact' },
]

export const mindPoints = [
  {
    title: 'Learn by building',
    body: 'I pick up systems by implementing them — routes, schemas, validation, and error paths — then refining until the architecture is explainable.',
  },
  {
    title: 'Backend as the spine',
    body: 'Most of my depth sits in Node.js, Express, and MongoDB: modular MVC, middleware, REST/CRUD, and server-side validation.',
  },
  {
    title: 'Frontend that serves the system',
    body: 'I use React, EJS, and solid HTML/CSS/JS to surface data clearly — interfaces that respect the API contract rather than hide it.',
  },
  {
    title: 'Fundamentals first',
    body: 'DSA in Java, software engineering habits, and careful reading of how APIs, databases, and clients collaborate.',
  },
]

export const skillGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'Java', 'Python (project exposure)'],
  },
  {
    label: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap', 'EJS'],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'CRUD',
      'MVC',
      'Middleware',
      'Centralized & async error handling',
      'Server-side validation',
    ],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'Mongoose', 'SQL', 'MySQL'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Hoppscotch', 'VS Code'],
  },
]

export const projects = [
  {
    id: 'orbit',
    title: 'Orbit',
    role: 'Full-Stack Property Listing Platform',
    status: 'Live Demo',
    priority: 1,
    featured: true,
    stack: [
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Mongoose',
      'EJS',
      'JavaScript',
      'Passport.js',
      'Bootstrap 5',
      'HTML',
      'CSS',
    ],
    summary:
      'An Airbnb-inspired full-stack property rental platform for discovering properties, creating listings, uploading property images, and sharing reviews.',
    notes: [
      'Passport.js authentication supports signup, login, and logout; protected listing and review operations control who can manage content.',
      'Users can create, edit, and delete listings, upload property images, and share reviews and ratings.',
      'Includes MongoDB-backed session management and flash messages.',
    ],
    github: 'https://github.com/Ranbeerkamlapure/Orbit',
    demo: 'https://orbit-d5q8.onrender.com',
  },
  {
    id: 'samjhao',
    title: 'Samjhao',
    role: 'AI-Powered Multilingual Document Explainer',
    status: 'Live Demo',
    priority: 2,
    featured: true,
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Gemini API', 'JWT', 'bcrypt.js'],
    summary:
      'Built a full-stack document intelligence application that converts complex bills, notices, and agreements into simplified, actionable explanations.',
    notes: [
      'Gemini multimodal AI analyzes PDFs and images, extracting summaries, financial amounts, important dates, action steps, and potential warnings.',
      'Supports English, Hindi, and Marathi, with JWT authentication, bcrypt password hashing, and user-specific document history.',
      'Protected REST APIs support document processing and history retrieval; the app uses MongoDB Atlas and Mongoose.',
    ],
    github: 'https://github.com/Ranbeerkamlapure/Samjhao',
    demo: 'https://samjhao-five.vercel.app/',
  },
  {
    id: 'quora',
    title: 'Quora REST API',
    role: 'CRUD Application',
    status: 'Available on GitHub',
    priority: 3,
    stack: ['Node.js', 'Express.js', 'EJS', 'UUID', 'Method-Override'],
    summary:
      'CRUD posts with REST routing, EJS views, and PATCH/DELETE support — a practical exercise in Express request lifecycle and view rendering.',
    notes: [
      'Known limitation: in-memory storage — posts are lost on server restart.',
      'No verified live demo.',
    ],
    github: 'https://github.com/Ranbeerkamlapure/Quora-rest-app',
    demo: null,
  },
  {
    id: 'solace',
    title: 'Solace',
    role: 'AI Mental Wellness Support Chatbot',
    status: 'WIP — status needs confirmation',
    priority: 4,
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'MongoDB'],
    summary:
      'Supportive conversation experience only — not a psychologist, and not for diagnosis or prescription. Stack and features listed only as discussed; treat as work in progress until repo and demo are verified.',
    notes: [
      'Repository URL and live demo are not verified.',
      'Do not overstate AI/retrieval capabilities beyond what is implemented.',
    ],
    github: 'https://github.com/Ranbeerkamlapure/solace-mental-health-chatbot',
    demo: ' https://solace-mental-health-chatbot.vercel.app/',
  },
  {
    id: 'lost-found',
    title: 'Lost & Found Portal',
    role: 'Campus utility concept',
    status: 'Verify implementation',
    priority: 5,
    stack: ['Web'],
    summary:
      'Campus lost-and-found utility concept. Implementation completeness should be verified before treating this as a flagship project.',
    notes: ['GitHub repository exists; depth of implementation not fully verified for this portfolio.'],
    github: 'https://github.com/RanbeerKamlapure/lost-found-portal',
    demo: null,
  },
]

export const education = [
  {
    title: 'B.Tech — Electronics and Computer Engineering',
    place: 'Walchand Institute of Technology, Solapur',
    meta: 'Expected May 2027 · CGPA 8.1 · Minor: Information Technology',
  },
  {
    title: 'Higher Secondary (XII)',
    place: 'Dayanand College of Arts and Science, Solapur',
    meta: 'Completed June 2023',
  },
]

export const achievements = [
  {
    title: 'Eclearnix National Hackathon — Finalist',
    year: '2025',
    detail:
      'Presented a strategic solution to improve student engagement.',
  },
]

export const certifications = [
  {
    title: 'AWS Academy Graduate — AWS Cloud Foundations',
    org: 'Amazon Web Services',
    when: '2025',
  },
  {
    title: 'Data Structures & Algorithms in Java',
    org: 'Apna College',
    when: 'January 2025',
  },
  {
    title: 'Soft Skills and Personality — Elite',
    org: 'NPTEL, IIT Kanpur',
    when: 'April 2025 · 8 weeks · 64% proctored',
  },
  {
    title: 'Robotics',
    org: 'NPTEL, IIT Kharagpur',
    when: 'July–September 2025',
  },
]

export const interests = [
  'DSA in Java — arrays/strings, patterns, LeetCode, Striver A–Z',
  'Backend engineering — REST, Express, MongoDB/Mongoose, MVC, validation',
  'Frontend — HTML/CSS/JS, React, Bootstrap, EJS',
  'AI applications — Solace (verified tech only)',
]
