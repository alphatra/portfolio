import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Languages as LanguagesIcon, GraduationCap, Briefcase } from 'lucide-react';

export interface AboutData {
  name: string;
  specialty: string;
  aboutMe: string;
  links?: { github?: string; linkedin?: string; facebook?: string; website?: string };
  contact?: { email?: string; phone?: string; address?: string };
  experience?: Array<{ title: string; company: string; years: string; desc?: string }>;
  education?: Array<{ title: string; institution: string; degree?: string; years: string }>;
  skills?: string[];
  languages?: Array<{ name?: string; level?: string }>;
  projects?: Array<{ title: string; stage?: string; stack?: string[]; desc?: string; link?: string }>;
  certificates?: Array<{ title: string; issuer: string; date: string }>;
  softSkills?: string[];
  interests?: Array<{ title: string; desc?: string }>;
  gdpr?: string;
  achievements?: string[];
}

const sectionVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };

export default function AboutClassic({ data, raw, currentLocale }: { data: AboutData; raw?: any; currentLocale?: string }) {
  const reduce = useReducedMotion();
  const [locale, setLocale] = React.useState<string>(
    currentLocale || (typeof document !== 'undefined' ? (document.documentElement.getAttribute('lang') || 'pl') : 'pl')
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const obs = new MutationObserver(() => {
      const lang = document.documentElement.getAttribute('lang') || 'pl';
      setLocale(lang);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    const onStorage = (e: StorageEvent) => { if (e.key === 'locale' && e.newValue) setLocale(e.newValue); };
    window.addEventListener('storage', onStorage);
    return () => { obs.disconnect(); window.removeEventListener('storage', onStorage); };
  }, []);

  const merged = React.useMemo<AboutData>(() => {
    if (!raw) return data;
    const l = locale;
    return {
      name: raw.name ?? data.name,
      specialty: raw.specialty?.[l] ?? raw.specialty?.en ?? data.specialty,
      aboutMe: raw.aboutMe?.[l] ?? raw.aboutMe?.en ?? data.aboutMe,
      links: raw.links ?? data.links,
      contact: raw.contact ?? data.contact,
      experience: (raw.experience || []).map((e: any) => ({
        title: e.title,
        company: e.company,
        years: e.years,
        desc: e.desc?.[l] ?? e.desc?.en,
      })),
      education: raw.education || data.education,
      skills: raw.skills || data.skills,
      languages: (raw.languages || []).map((ln: any) => ({ name: ln.name?.[l] ?? ln.name?.en, level: ln.level?.[l] ?? ln.level?.en })),
      projects: (raw.projects || []).map((p: any) => ({ title: p.title, stage: p.stage, stack: p.stack, desc: p.desc?.[l] ?? p.desc?.en, link: p.link })),
      certificates: raw.certificates || data.certificates,
      softSkills: raw.softSkills || data.softSkills,
      interests: (raw.interests || []).map((it: any) => ({ title: it.title, desc: it.desc?.[l] ?? it.desc?.en })),
      gdpr: raw.gdpr?.[l] ?? raw.gdpr?.en ?? (data as any).gdpr,
      achievements: (data as any).achievements,
    };
  }, [raw, data, locale]);

  const downloadLabel = React.useMemo(() => {
    switch (locale) {
      case 'pl': return 'Pobierz CV';
      case 'de': return 'CV herunterladen';
      case 'it': return 'Scarica CV';
      case 'zh': return '下载简历';
      default: return 'Download CV';
    }
  }, [locale]);

  return (
    <div className="px-4 py-16 md:py-24 min-h-screen space-y-16">
      <motion.div initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
          {merged.name}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-xl md:text-2xl text-muted-foreground">{merged.specialty}</p>
          <a
            href={`/api/cv-download?locale=${locale}`}
            className="inline-flex items-center px-3 py-1.5 text-sm rounded-md border border-border/40 bg-card/60 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
            aria-label={downloadLabel}
          >
            {downloadLabel}
          </a>
        </div>
        <p className="max-w-3xl mx-auto text-foreground/90 text-lg leading-relaxed mt-6">{merged.aboutMe}</p>
      </motion.div>

      {merged.skills && merged.skills.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Expertise</h2>
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {merged.skills.map((s, i) => (
              <div key={i} className="bg-card/50 border border-border/30 rounded-lg p-3 text-center">{s}</div>
            ))}
          </motion.div>
        </motion.section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
        {merged.experience && merged.experience.length > 0 && (
          <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">Work Experience</h2>
            <div className="space-y-8">
              {merged.experience.map((exp, i) => (
                <motion.div key={i} variants={itemVariants} className="relative pl-10 border-l-2 border-neon-blue/50">
                  <div className="absolute -left-4 top-1 p-1.5 bg-primary rounded-full text-primary-foreground">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">{exp.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-1">{exp.company} / {exp.years}</p>
                  {exp.desc && <p className="text-muted-foreground text-sm">{exp.desc}</p>}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {merged.education && merged.education.length > 0 && (
          <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">Education</h2>
            <div className="space-y-8">
              {merged.education.map((ed, i) => (
                <motion.div key={i} variants={itemVariants} className="relative pl-10 border-l-2 border-neon-green/50">
                  <div className="absolute -left-4 top-1 p-1.5 bg-secondary rounded-full text-secondary-foreground">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">{ed.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-1">{ed.institution}{ed.degree ? ` (${ed.degree})` : ''}</p>
                  <p className="text-muted-foreground text-xs">{ed.years}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {(merged.languages?.length || 0) > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {merged.languages!.map((l, i) => (
              <div key={i} className="flex items-center p-4 bg-card/50 border border-border/30 rounded-lg">
                <div className="p-1.5 bg-muted rounded-full mr-3 text-muted-foreground">
                  <LanguagesIcon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{l.name || ''}</h4>
                  <p className="text-xs text-muted-foreground">{l.level || ''}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {merged.projects && merged.projects.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merged.projects.map((p, i) => (
              <a key={i} href={p.link || '#'} target={p.link ? '_blank' : undefined} rel={p.link ? 'noopener noreferrer' : undefined} className="block bg-card/50 border border-border/30 rounded-xl p-5 hover:border-accent/60 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  {p.stage && (
                    <span className={
                      `text-xs px-2 py-0.5 rounded border ${
                        p.stage === 'Commercial' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30' :
                        p.stage === 'Ongoing' ? 'bg-amber-500/10 text-amber-300 border-amber-400/30' :
                        'bg-sky-500/10 text-sky-300 border-sky-400/30'
                      }`
                    }>{p.stage}</span>
                  )}
                </div>
                {p.desc && <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>}
                {p.stack && p.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {p.stack.map((s, si) => (<span key={si} className="px-2 py-0.5 rounded bg-background border border-border/40">{s}</span>))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </motion.section>
      )}

      {merged.certificates && merged.certificates.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Certificates</h2>
          <ul className="space-y-3">
            {merged.certificates.map((c, i) => (
              <li key={i} className="flex items-center justify-between bg-card/50 border border-border/30 rounded-lg px-4 py-3">
                <div>
                  <p className="text-foreground font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                <span className="text-xs text-muted-foreground">{c.date}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {merged.achievements && merged.achievements.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Achievements & Activities</h2>
          <ul className="list-disc list-inside text-foreground/85 space-y-2">
            {merged.achievements.map((a, i) => (<li key={i}>{a}</li>))}
          </ul>
        </motion.section>
      )}

      {merged.softSkills && merged.softSkills.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Soft Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {merged.softSkills.map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-card/50 border border-border/30 text-sm">{s}</span>
            ))}
          </div>
        </motion.section>
      )}

      {merged.interests && merged.interests.length > 0 && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merged.interests.map((iItem, i) => (
              <div key={i} className="bg-card/50 border border-border/30 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-foreground">{iItem.title}</h3>
                {iItem.desc && <p className="mt-2 text-sm text-muted-foreground">{iItem.desc}</p>}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {merged.gdpr && (
        <motion.section initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground text-center border-t border-border/30 pt-6">{merged.gdpr}</p>
        </motion.section>
      )}

      <motion.div initial={reduce ? false : 'hidden'} animate="visible" variants={sectionVariants} className="max-w-3xl mx-auto text-center p-8 bg-card/50 border border-border/20 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact</h2>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-6 text-neutral-300 text-sm">
          {data.contact?.email && <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"><Mail className="h-4 w-4" /> {data.contact.email}</a>}
          {data.contact?.phone && <span className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {data.contact.phone}</span>}
          {data.contact?.address && <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {data.contact.address}</span>}
        </div>
        <div className="flex justify-center items-center space-x-6">
          {data.links?.linkedin && <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-1"><Linkedin size={24} /></a>}
          {data.links?.github && <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-1"><Github size={24} /></a>}
          {data.links?.facebook && <a href={data.links.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-1"><Facebook size={24} /></a>}
        </div>
      </motion.div>
    </div>
  );
}


