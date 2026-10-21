export const profile = {
  name: 'Ranbeer Kamlapure',
  location: 'Solapur, Maharashtra, India',
  email: 'ranbeerk036@gmail.com',
  github: 'https://github.com/RanbeerKamlapure',
  linkedin: 'https://www.linkedin.com/in/ranbeer-kamlapure-77b514259/',
  headline: 'Full-Stack Developer | Backend-Focused | Building Practical Web Applications',
  identity: 'Full-Stack Developer',
  secondary: 'Backend Development and Software Engineering',
  narrative:
    'My mind is the interface. My code is the language. My projects are the evidence.',
  about: [
    "I'm Ranbeer Kamlapure, an Electronics and Computer Engineering student at Walchand Institute of Technology, Solapur, graduating in 2027. I enjoy building web applications and exploring how frontend interfaces, backend systems, APIs, and databases work together to solve practical problems.",
    'My primary focus is full-stack web development, particularly JavaScript, Node.js, Express.js, and MongoDB. Through my projects, I am developing practical experience with RESTful APIs, CRUD operations, database modelling, backend validation, and modular application architecture.',
    "I'm also interested in problem-solving, software engineering fundamentals, and exploring new technologies through hands-on projects. My goal is to build useful applications, strengthen my technical skills, and develop the ability to design, implement, test, and explain software solutions.",
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
    role: 'Full-Stack Web Application',
    status: 'Ongoing',
    priority: 1,
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS'],
    summary:
      'Modular MVC full-stack application with REST/CRUD flows, Mongoose schemas, reusable middleware, centralized and async error handling, and server-side validation.',
    notes: [
      'Primary featured project.',
      'Verified GitHub URL, live demo, and screenshots are not yet available — listed honestly as ongoing work.',
    ],
    github: null,
    demo: null,
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
