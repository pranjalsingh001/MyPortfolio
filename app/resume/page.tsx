"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, ChevronDown, ChevronUp, Briefcase, GraduationCap, Award, Code } from "lucide-react"

export default function ResumePage() {
  type SectionKey = 'experience' | 'education' | 'skills' | 'certifications';

  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    experience: false,
    education: false,
    skills: false,
    certifications: false,
  });

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
            Resume & CV
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            My professional background, skills, and qualifications
          </p>

          {/* Download buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.a
              href="/resume.pdf" // You would need to add this file
              download
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 200, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-medium text-white flex items-center gap-2 transition-all duration-200"
            >
              <Download className="w-5 h-5" /> Download Resume
            </motion.a>

            <motion.a
              href="/cv.pdf" // You would need to add this file
              download
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(176, 38, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-3 bg-transparent border border-neon-purple rounded-lg font-medium text-white flex items-center gap-2 transition-all duration-200"
            >
              <Download className="w-5 h-5" /> Download Full CV
            </motion.a>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Resume Header */}
          <div className="bg-darker/40 backdrop-blur-xl rounded-xl border border-white/10 p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neon-blue/30">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Pranjal Singh"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-orbitron font-bold text-white mb-2">Pranjal Singh</h2>
                <h3 className="text-xl text-neon-blue mb-4">Full Stack Developer</h3>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/70">
                  <div>📧 pjlv1007@gmail.com</div>
                  <div>📱 +91 9140931990</div>
                  <div>📍bangaluru, India</div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/pranjal-singh-0b3799315" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/70 hover:text-neon-blue transition-colors duration-200 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/pranjalsingh001" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-neon-purple transition-colors duration-200 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="/" 
                    target=""
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-neon-pink transition-colors duration-200 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" /> Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <ResumeSection
            title="Work Experience"
            icon={<Briefcase className="w-6 h-6" />}
            isExpanded={expandedSections.experience}
            toggleExpanded={() => toggleSection("experience")}
            color="var(--neon-blue)"
          >
            <div className="space-y-8">
              <ExperienceItem
                title="Fullstack Developer (Self-Initiated Projects)"
                company="Personal Portfolio & Resume Builder"
                period="2024 - Present"
                description="Built personal portfolio and resume builder apps using HTML, CSS (Bootstrap), JavaScript, and React. Focused on responsive UI, animation, and real-time DOM updates."
                achievements={[
                  "Created a modern animated personal portfolio with glowing shapes, navbar, and 3D effects",
                  "Built a dynamic resume builder with form inputs, real-time preview, and export options",
                  "Practiced DOM manipulation, event handling, and form validation",
                ]}
              />

              <ExperienceItem
                title="Frontend Developer"
                company="Wordle Clone, Currency Converter & World Atlas"
                period="2024"
                description="Developed interactive frontend projects that strengthened core JavaScript, React, and API handling skills. These projects emphasized real-world UI, logic building, and user interaction."
                achievements={[
                  "Built a Wordle clone with React using state management and custom keyboard UI",
                  "Developed a currency converter using live API data and JavaScript",
                  "Created World Atlas app with REST API to explore countries, flags, population, and more",
                ]}
              />

              <ExperienceItem
                title="Student Developer"
                company="PW Institute of Innovation"
                period="2022 - Present"
                description="Learning core Computer Science with real-world application in C, Java, Git, and Web Development. Participated in Java-based projects, problem-solving, and smart web ideas."
                achievements={[
                  "Built a Guesser Game in Java using OOP concepts taught by Jabi Sir",
                  "Solved 100+ coding problems on CodeChef, HackerRank, and Codeforces",
                  "Learning MERN stack, DevOps basics, and integrated blockchain concepts into learning app",
                ]}
              />

            </div>
          </ResumeSection>

          {/* Education Section */}
          <ResumeSection
            title="Education"
            icon={<GraduationCap className="w-6 h-6" />}
            isExpanded={expandedSections.education}
            toggleExpanded={() => toggleSection("education")}
            color="var(--neon-purple)"
          >
            <div className="space-y-8">
              <EducationItem
                degree="Bachelor of Technology in Computer Science"
                institution="PW Institute of Inovation"
                period="2024 - 2028"
                description="Focused on web development, algorithms, and data structures. Participated in coding competitions and hackathons."
                courses={[
                  "Data Structures and Algorithms",
                  "Web Development",
                  "Database Management Systems",
                  "Object-Oriented Programming",
                ]}
              />

              <EducationItem
                degree="High School Diploma"
                institution="Nehru Balodyan School"
                period="20222 - 2023"
                description="Specialized in Computer Science and Mathematics."
                courses={["Computer Science", "Mathematics", "Physics", "English,Chemestry"]}
              />
            </div>
          </ResumeSection>

          {/* Skills Section */}
          <ResumeSection
            title="Technical Skills"
            icon={<Code className="w-6 h-6" />}
            isExpanded={expandedSections.skills}
            toggleExpanded={() => toggleSection("skills")}
            color="var(--neon-green)"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCategory
                title="Frontend Development"
                skills={[
                  { name: "React.js", level: 90 },
                  { name: "JavaScript (ES6+)", level: 95 },
                  { name: "TypeScript", level: 85 },
                  { name: "HTML5 & CSS3", level: 90 },
                  { name: "Tailwind CSS", level: 85 },
                  { name: "GSAP", level: 80 },
                ]}
              />

              <SkillCategory
                title="Backend Development"
                skills={[
                  { name: "Node.js", level: 20 },
                  { name: "Express.js", level: 0 },
                  { name: "MongoDB", level: 50 },
                  { name: "REST APIs", level: 0 },
                  { name: "GraphQL", level: 0 },
                ]}
              />

              <SkillCategory
                title="Tools & Workflow"
                skills={[
                  { name: "Git & GitHub", level: 90 },
                  { name: "VS Code", level: 95 },
                  { name: "Webpack", level: 75 },
                  { name: "Figma", level: 70 },
                  { name: "CI/CD", level: 0 },
                ]}
              />

              <SkillCategory
                title="Other Skills"
                skills={[
                  { name: "Responsive Design", level: 90 },
                  { name: "Web Accessibility", level: 80 },
                  { name: "SEO Basics", level: 75 },
                  { name: "Performance Optimization", level: 85 },
                  { name: "UI/UX Principles", level: 80 },
                ]}
              />
            </div>
          </ResumeSection>

          {/* Certifications Section */}
          <ResumeSection
            title="Certifications & Achievements"
            icon={<Award className="w-6 h-6" />}
            isExpanded={expandedSections.certifications}
            toggleExpanded={() => toggleSection("certifications")}
            color="var(--neon-pink)"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <CertificationItem
                title="JavaScript Algorithms and Data Structures"
                issuer="PW Institute Of Inovation"
                date="present - 2025"
                credentialId="FCC-654321"
              />

              <CertificationItem
                title="Advanced React and Redux"
                issuer="Udemy"
                date="2025"
                credentialId="UCC-1234567890"
              />

              <CertificationItem
                title="Responsive Web Design"
                issuer="ChaiAurcode"
                date="2025"
                credentialId="FCC-789012"
              />
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

// Resume Section Component
function ResumeSection({ title, icon, children, isExpanded, toggleExpanded, color }: { title: string; icon: JSX.Element; children: React.ReactNode; isExpanded: boolean; toggleExpanded: () => void; color: string }) {
  return (
    <div className="mb-8">
      <motion.div
        className="bg-darker/40 backdrop-blur-xl rounded-t-xl border border-white/10 p-4 flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
        whileHover={{ backgroundColor: "rgba(30, 30, 40, 0.6)" }}
        style={{ borderColor: isExpanded ? `${color}30` : "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {icon}
          </div>
          <h2 className="text-xl font-orbitron font-bold text-white">{title}</h2>
        </div>

        <div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-white/70" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/70" />
          )}
        </div>
      </motion.div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-darker/20 backdrop-blur-xl rounded-b-xl border-x border-b border-white/10 p-6"
          style={{ borderColor: `${color}30` }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

// Experience Item Component
interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
}

function ExperienceItem({ title, company, period, description, achievements }: ExperienceItemProps) {
  return (
    <div className="border-l-2 border-neon-blue/30 pl-6 relative">
      <div className="absolute w-4 h-4 bg-neon-blue rounded-full -left-[9px] top-0"></div>

      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="flex flex-wrap justify-between items-center mb-2">
        <h4 className="text-neon-blue">{company}</h4>
        <span className="text-white/50 text-sm">{period}</span>
      </div>

      <p className="text-white/70 mb-4">{description}</p>

      {achievements && achievements.length > 0 && (
        <div>
          <h5 className="text-white font-medium mb-2">Key Achievements:</h5>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Education Item Component
interface EducationItemProps {
  degree: string;
  institution: string;
  period: string;
  description: string;
  courses: string[];
}

function EducationItem({ degree, institution, period, description, courses }: EducationItemProps) {
  return (
    <div className="border-l-2 border-neon-purple/30 pl-6 relative">
      <div className="absolute w-4 h-4 bg-neon-purple rounded-full -left-[9px] top-0"></div>

      <h3 className="text-xl font-bold text-white">{degree}</h3>
      <div className="flex flex-wrap justify-between items-center mb-2">
        <h4 className="text-neon-purple">{institution}</h4>
        <span className="text-white/50 text-sm">{period}</span>
      </div>

      <p className="text-white/70 mb-4">{description}</p>

      {courses && courses.length > 0 && (
        <div>
          <h5 className="text-white font-medium mb-2">Relevant Courses:</h5>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Skill Category Component
function SkillCategory({ title, skills }: { title: string; skills: { name: string; level: number }[] }) {
  return (
    <div className="bg-darker/30 backdrop-blur-sm rounded-lg p-4 border border-white/5">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-white/80">{skill.name}</span>
              <span className="text-white/50">{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-darker/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(to right, var(--neon-blue), var(--neon-purple))`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Certification Item Component
function CertificationItem({ title, issuer, date, credentialId }: { title: string; issuer: string; date: string; credentialId: string }) {
  return (
    <div className="bg-darker/30 backdrop-blur-sm rounded-lg p-4 border border-white/5">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-neon-pink">{issuer}</span>
        <span className="text-white/50 text-sm">{date}</span>
      </div>

      <div className="text-white/70 text-sm">Credential ID: {credentialId}</div>
    </div>
  )
}
