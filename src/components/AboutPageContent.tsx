import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Languages, GraduationCap, Briefcase, Settings } from 'lucide-react';
import { cn } from "@/lib/utils"; 

// --- Data from User ---
const contactInfo = {
  email: 'zieemianskigracjna@icloud.com',
  phone: '+48 511 235 401',
  address: 'Italy, Torino 10126',
  linkedin: 'https://linkedin.com/in/gracjan-ziemiański/',
  github: 'https://github.com/alphatra',
  facebook: 'https://facebook.com/alpphatra/',
  // whatsappQr: 'path/to/whatsapp-qr.png' // Add QR code path if available
};

const education = [
  {
    title: 'Applied Computer Science and Measurement Systems',
    institution: 'Univeristy of Wroclaw',
    degree: 'BACHELOR DEGREE',
    years: '2022 - 2026',
    icon: <GraduationCap className="h-4 w-4" />
  },
  {
    title: '“MOST” Student Exchange program',
    institution: 'AGH University of Krakow',
    years: '2025 Sep - Feb',
    icon: <GraduationCap className="h-4 w-4" />
  },
  {
    title: '“ERASMUS” Student Exchange program',
    institution: 'University of Turin',
    years: '2025 Feb - Jul',
    icon: <GraduationCap className="h-4 w-4" />
  },
];

const workExperience = [
  {
    title: 'Junior Full-stack developer (AI specialist)',
    company: "Bright Coders' Factory & Tauron",
    years: 'Sept 2024 - Currently',
    description: 'Developing mobile applications using Flutter, integrating AI models (YOLO v8) for computer vision tasks, designing and implementing APIs, performing testing.',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    title: 'Full-stack developer Intern',
    company: "Bright Coders' Factory",
    years: 'Jun - Sept 2024',
    description: 'Programming mobile and web applications, preparing and training ai model based on YOLO v8, building API, testing and debuging.',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    title: 'President - Pointer UWR (academic circle)',
    company: 'University of Wroclaw',
    years: 'Oct 2023 - Currently',
    description: 'Organizing meetings, exchanging information, creating IT projects.',
    icon: <Briefcase className="h-4 w-4" /> // Maybe a different icon?
  },
  {
    title: 'System and Network Configuration Intern',
    company: 'T.H. ALPLAST / Poland',
    years: 'Nov - Dec 2019',
    description: 'Configuring IT systems, customising software, network settings, managing databases.',
    icon: <Settings className="h-4 w-4" />
  },
];

const languages = [
  { name: 'Polish', level: 'Native', icon: <Languages className="h-4 w-4" /> },
  { name: 'English', level: 'B2 / C1 Upper-Intermediate', icon: <Languages className="h-4 w-4" /> },
  { name: 'German', level: 'A2 Basic Knowledge - Learning', icon: <Languages className="h-4 w-4" /> },
  { name: 'Italian', level: 'A2 Basic Knowledge - Learning', icon: <Languages className="h-4 w-4" /> },
];

// Simplified expertise structure - no image/tooltip needed now
const expertise = [
  { id: 1, name: 'Flutter & Dart' }, 
  { id: 2, name: 'Java' },
  { id: 3, name: 'Python' },
  { id: 4, name: 'Next.js' },
  { id: 5, name: 'ANSYS' }, 
  { id: 6, name: 'SolidWorks' },
  { id: 7, name: 'Kotlin' },
  { id: 8, name: 'C++' },
  { id: 9, name: 'Julia' },
  { id: 10, name: 'PHP' },
  { id: 11, name: 'Matlab' },
];

const aboutMeText = "I am a third-year student of Applied Computer Science and Measurement Systems at the University of Wrocław. I have extensive experience in programming, both in web and mobile languages. I have participated in many programming projects, both commercial and student-based. I am a creative person and I learn quickly. I see my future in creating modern software and in developing deep learning networks. Currently working on AI thesis project.";

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const listVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {}, 
};

// --- Section Title Component ---
interface SectionTitleProps {
  children: React.ReactNode;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">
    {children}
  </h2>
);

// --- Main Component ---
const AboutPageContent: React.FC = () => {
  return (
    <div className="px-4 py-16 md:py-24 min-h-screen relative space-y-16 md:space-y-24">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Gracjan Ziemiański
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400">Full Stack Developer & AI Enthusiast</p>
      </motion.div>

      {/* About Me Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-3xl mx-auto text-center"
        aria-labelledby="about-me-title"
      >
        <SectionTitle>About Me</SectionTitle>
        <motion.p 
          variants={itemVariants}
          className="text-neutral-300 text-lg leading-relaxed"
        >
          {aboutMeText}
        </motion.p>
      </motion.section>

      {/* Expertise Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        aria-labelledby="expertise-title"
      >
        <SectionTitle>Expertise</SectionTitle>
        <motion.div 
          variants={listVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {expertise.map((skill) => (
            <motion.div 
              key={skill.id} 
              variants={itemVariants} 
              className="bg-card/50 border border-border/30 rounded-lg p-3 text-center hover:border-neon-blue/50 transition-colors duration-200"
            >
              <p className="text-sm font-medium text-neutral-200">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Combined Experience & Education Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
        
        {/* Work Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          aria-labelledby="work-experience-title"
        >
          <SectionTitle>Work Experience</SectionTitle>
          <motion.div variants={listVariants} className="space-y-8">
            {workExperience.map((exp, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="relative pl-10 border-l-2 border-neon-blue/30 hover:border-neon-blue/70 transition-colors duration-200"
              >
                 {/* Icon absolutely positioned */}
                 <div className="absolute -left-4 top-1 p-1.5 bg-primary rounded-full text-primary-foreground">
                   {exp.icon || <Briefcase className="h-4 w-4" />}
                 </div>
                 <h3 className="text-lg font-medium text-neutral-100 mb-1">{exp.title}</h3>
                 <p className="text-sm font-semibold text-accent mb-1">{exp.company} / {exp.years}</p>
                 <p className="text-neutral-300 text-sm">
                   {exp.description}
                 </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          aria-labelledby="education-title"
        >
          <SectionTitle>Education</SectionTitle>
          <motion.div variants={listVariants} className="space-y-8">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="relative pl-10 border-l-2 border-neon-green/30 hover:border-neon-green/70 transition-colors duration-200"
              >
                {/* Icon absolutely positioned */}
                <div className="absolute -left-4 top-1 p-1.5 bg-secondary rounded-full text-secondary-foreground">
                  {edu.icon || <GraduationCap className="h-4 w-4" />}
                </div>
                <h3 className="text-lg font-medium text-neutral-100 mb-1">{edu.title}</h3>
                <p className="text-sm font-semibold text-accent mb-1">{edu.institution} {edu.degree ? `(${edu.degree})` : ''}</p>
                <p className="text-neutral-400 text-xs">{edu.years}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Languages Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-3xl mx-auto"
        aria-labelledby="languages-title"
      >
        <SectionTitle>Languages</SectionTitle>
        <motion.div 
          variants={listVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {languages.map((lang, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex items-center p-4 bg-card/50 border border-border/30 rounded-lg hover:border-accent/50 transition-colors duration-200"
            >
              <div className="p-1.5 bg-muted rounded-full mr-3 text-muted-foreground">
                {lang.icon || <Languages className="h-4 w-4" />}
              </div>
              <div>
                <h4 className="font-medium text-neutral-100">{lang.name}</h4>
                <p className="text-xs text-neutral-400">{lang.level}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-3xl mx-auto text-center p-8 bg-card/50 border border-border/20 rounded-xl"
      >
        <SectionTitle>Contact</SectionTitle>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-6 text-neutral-300 text-sm">
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">
            <Mail className="h-4 w-4" /> {contactInfo.email}
          </a>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> {contactInfo.phone}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {contactInfo.address}
          </span>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-neutral-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm p-1">
            <Linkedin size={24} />
          </a>
          <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-neutral-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm p-1">
            <Github size={24} />
          </a>
          <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile" className="text-neutral-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm p-1">
            <Facebook size={24} />
          </a>
          {/* Add WhatsApp QR code image if available */}
          {/* {contactInfo.whatsappQr && <img src={contactInfo.whatsappQr} alt="WhatsApp QR Code" className="w-20 h-20" />} */}
        </div>
      </motion.div>

    </div>
  );
};

export default AboutPageContent; 