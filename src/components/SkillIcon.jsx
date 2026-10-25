/**
 * Official brand icons for listed skills.
 * Devicon originals (local) + Simple Icons where Devicon lacks a mark.
 * Abstract concepts without an official logo render no icon.
 */

const ICONS = {
  JavaScript: { src: '/icons/skills/javascript.svg', label: 'JavaScript' },
  Java: { src: '/icons/skills/java.svg', label: 'Java' },
  'Python (project exposure)': { src: '/icons/skills/python.svg', label: 'Python' },
  HTML5: { src: '/icons/skills/html5.svg', label: 'HTML5' },
  CSS3: { src: '/icons/skills/css3.svg', label: 'CSS3' },
  'React.js': { src: '/icons/skills/react.svg', label: 'React' },
  Bootstrap: { src: '/icons/skills/bootstrap.svg', label: 'Bootstrap' },
  EJS: { src: '/icons/skills/ejs.svg', label: 'EJS' },
  'Node.js': { src: '/icons/skills/nodejs.svg', label: 'Node.js' },
  'Express.js': { src: '/icons/skills/express.svg', label: 'Express.js' },
  MongoDB: { src: '/icons/skills/mongodb.svg', label: 'MongoDB' },
  Mongoose: { src: '/icons/skills/mongoose.svg', label: 'Mongoose' },
  MySQL: { src: '/icons/skills/mysql.svg', label: 'MySQL' },
  Git: { src: '/icons/skills/git.svg', label: 'Git' },
  GitHub: { src: '/icons/skills/github.svg', label: 'GitHub' },
  Hoppscotch: { src: '/icons/skills/hoppscotch.svg', label: 'Hoppscotch' },
  'VS Code': { src: '/icons/skills/vscode.svg', label: 'VS Code' },
}

export function hasSkillIcon(name) {
  return Boolean(ICONS[name])
}

export default function SkillIcon({ name, size = 16 }) {
  const icon = ICONS[name]
  if (!icon) return null

  return (
    <img
      src={icon.src}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className="skill-icon shrink-0 transition-transform duration-200 group-hover:scale-105"
      style={{ width: size, height: size }}
      aria-hidden
    />
  )
}
