import * as React from 'react';
import type { AboutData } from './Classic';

export default function AboutCVStandard({ data, raw, currentLocale }: { data: AboutData; raw?: any; currentLocale?: string }) {
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

  const merged: AboutData = React.useMemo(() => {
    if (!raw) return data;
    const l = locale;
    return {
      name: raw.name ?? data.name,
      specialty: raw.specialty?.[l] ?? raw.specialty?.en ?? data.specialty,
      aboutMe: raw.aboutMe?.[l] ?? raw.aboutMe?.en ?? data.aboutMe,
      links: raw.links ?? data.links,
      contact: raw.contact ?? data.contact,
      experience: (raw.experience || []).map((e: any) => ({ title: e.title, company: e.company, years: e.years, desc: e.desc?.[l] ?? e.desc?.en })),
      education: raw.education || data.education,
      skills: raw.skills || data.skills,
      languages: (raw.languages || []).map((ln: any) => ({ name: ln.name?.[l] ?? ln.name?.en, level: ln.level?.[l] ?? ln.level?.en })),
      projects: (raw.projects || []).map((p: any) => ({ title: p.title, stage: p.stage, stack: p.stack, desc: p.desc?.[l] ?? p.desc?.en, link: p.link })),
      certificates: raw.certificates || data.certificates,
      softSkills: raw.softSkills || data.softSkills,
      interests: (raw.interests || []).map((it: any) => ({ title: it.title, desc: it.desc?.[l] ?? it.desc?.en })),
      gdpr: raw.gdpr?.[l] ?? raw.gdpr?.en ?? (data as any).gdpr,
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
    <div className="px-4 py-16 md:py-24 min-h-screen">
      <div className="max-w-5xl mx-auto bg-card/40 backdrop-blur-md rounded-2xl border border-border/30 shadow-sm overflow-hidden">
        <header className="p-8 md:p-12 border-b border-border/30 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-foreground">{merged.name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <p className="text-lg text-muted-foreground">{merged.specialty}</p>
              <a
                href={`/api/cv-download?locale=${locale}`}
                className="inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-border/40 bg-card/60 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
              >
                {downloadLabel}
              </a>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {merged.contact?.email && <p>{merged.contact.email}</p>}
            {merged.contact?.phone && <p>{merged.contact.phone}</p>}
            {merged.contact?.address && <p>{merged.contact.address}</p>}
          </div>
        </header>
        <main className="grid md:grid-cols-3 gap-8 p-8 md:p-12">
          <section className="md:col-span-2 space-y-6">
            {merged.experience?.map((exp, i) => (
              <article key={i} className="border-l-2 border-accent/50 pl-4">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="text-sm text-accent">{exp.company} • {exp.years}</p>
                {exp.desc && <p className="text-sm text-muted-foreground mt-1">{exp.desc}</p>}
              </article>
            ))}

            {merged.projects && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Projects</h4>
                <ul className="mt-2 space-y-3">
                  {merged.projects.map((p, i) => (
                    <li key={i} className="border border-border/30 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{p.title}</p>
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
                      {p.desc && <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>}
                      {p.stack && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {p.stack.map((s, si) => (<span key={si} className="px-2 py-0.5 rounded bg-card/60 border border-border/30">{s}</span>))}
                        </div>
                      )}
                      {p.link && <a className="text-xs text-accent mt-2 inline-block" href={p.link} target="_blank" rel="noopener noreferrer">Link</a>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
          <aside className="space-y-6">
            {merged.aboutMe && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Profile</h4>
                <p className="text-sm text-foreground/80 mt-1">{merged.aboutMe}</p>
              </section>
            )}
            {merged.skills && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Skills</h4>
                <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {merged.skills.map((s, i) => (<li key={i} className="bg-card/60 rounded px-2 py-1 border border-border/30">{s}</li>))}
                </ul>
              </section>
            )}
            {Array.isArray((data as any).achievements) && (data as any).achievements.length > 0 && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Achievements</h4>
                <ul className="mt-2 list-disc list-inside text-sm text-foreground/85">
                  {(data as any).achievements.map((a: string, i: number) => (<li key={i}>{a}</li>))}
                </ul>
              </section>
            )}
            {merged.education && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Education</h4>
                <ul className="mt-2 space-y-3 text-sm">
                  {merged.education.map((ed, i) => (
                    <li key={i}>
                      <p className="font-medium text-foreground">{ed.title}</p>
                      <p className="text-muted-foreground">{ed.institution}{ed.degree ? ` (${ed.degree})` : ''} • {ed.years}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {merged.languages && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Languages</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  {merged.languages.map((l, i) => (<li key={i}>{l.name} — {l.level}</li>))}
                </ul>
              </section>
            )}

            {merged.certificates && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Certificates</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {merged.certificates.map((c, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{c.title}</p>
                        <p className="text-muted-foreground">{c.issuer}</p>
                      </div>
                      <span className="text-muted-foreground">{c.date}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.softSkills && (
              <section>
                <h4 className="text-sm font-semibold tracking-wide text-muted-foreground">Soft Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {data.softSkills.map((s, i) => (<span key={i} className="px-2 py-1 rounded bg-card/60 border border-border/30">{s}</span>))}
                </div>
              </section>
            )}
          </aside>
        </main>
        {data.gdpr && (
          <footer className="px-8 pb-8">
            <p className="text-[11px] text-muted-foreground border-t border-border/30 pt-4 text-center">{data.gdpr}</p>
          </footer>
        )}
      </div>
    </div>
  );
}


