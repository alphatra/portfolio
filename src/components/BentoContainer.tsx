import * as React from "react";
import { motion, useReducedMotion } from 'framer-motion';
import { Book, FolderGit2 } from 'lucide-react'; // Removed unused User, MessageSquare
import GitHubCard from './GitHubCard';
import SpotifyCard from './SpotifyCard'; // Import new card
import LinkedInCard from './LinkedInCard'; // Import new card
import GlobeCard from './GlobeCard'; // Import new card
import ContactCard from './ContactCard'; // Import new card
import LetterboxdCard from './LetterboxdCard'; // Import LetterboxdCard
// Removed StatsCard and LastFmCard imports
import { cn } from "@/lib/utils";
import { useI18n } from '@/i18n';

// Define a base style for all cards to apply Y2K elements
// Define a base style for all cards to apply Y2K elements
const cardBaseStyle = cn(
  'group relative flex flex-col items-start justify-between p-6 h-full',
  'bg-background/40 backdrop-blur-md border border-white/10',
  'hover:border-white/20 transition-all duration-300',
  'shadow-lg shadow-black/5 overflow-hidden rounded-xl'
);

export const BentoContainer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useI18n();
  // Animation variants (can be kept or removed if cards handle their own)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger
      },
    },
  };

  // Simple motion variant for basic cards
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Removed py-20, added mb-16 for spacing below
    <section className="container mx-auto px-4 mb-16 md:mb-24">
      {/* Title can stay, maybe adjust margin */}
      <h2 className="text-3xl font-extrabold text-center mb-12 tracking-tight text-foreground">
        {t('home.section.activity') || "What I'm Up To"}
      </h2>
      {/* Changed to 3 columns */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]" // 3 columns, fixed row height example (adjust height as needed)
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        {/* GitHub Card - Row 1, Span 2 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2" // Removed row-span-2
        >
          <GitHubCard className={cardBaseStyle} />
        </motion.div>

        {/* Spotify Card - Row 1, Col 3 */}
        <motion.div
          variants={itemVariants}
          className="md:col-start-3 md:row-start-1"
        >
          <SpotifyCard /> {/* Assuming SpotifyCard applies cardBaseStyle internally or similar */}
        </motion.div>

        {/* Globe Card - Row 2, Col 1 (Square) */}
        <motion.div
          variants={itemVariants}
          className="md:col-start-1 md:row-start-2"
        >
          {/* Make sure GlobeCard applies aspect-square internally or add it here */}
          <GlobeCard className="aspect-square" />
        </motion.div>

        {/* LinkedIn Card - Row 2, Col 2 */}
        <motion.div
          variants={itemVariants}
          className="md:col-start-2 md:row-start-2"
        >
          <LinkedInCard /> {/* Assuming LinkedInCard applies cardBaseStyle internally */}
        </motion.div>

        {/* Blog Link Card - Row 2, Col 3 */}
        <motion.div
          variants={itemVariants}
          className={cn(cardBaseStyle, "md:col-start-3 md:row-start-2")}
        >
          <div>
            <Book className="w-6 h-6 mb-3 text-foreground/80" />
            <h3 className="text-lg font-semibold mb-1 text-foreground">{t('nav.blog')}</h3>
            <p className="text-sm text-foreground/60 mb-3">{t('home.cards.blog.subtitle') || 'Read my latest posts'}</p>
          </div>
          <a href="/blog" className="text-sm accent-underline self-end focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">{t('home.cards.blog.cta') || 'Go to Blog →'}</a>
        </motion.div>

        {/* Projects Link Card - Row 3, Col 1 */}
        <motion.div
          variants={itemVariants}
          className={cn(cardBaseStyle, "md:col-start-1 md:row-start-3")}
        >
          <div>
            <FolderGit2 className="w-6 h-6 mb-3 text-foreground/80" />
            <h3 className="text-lg font-semibold mb-1 text-foreground">{t('nav.projects')}</h3>
            <p className="text-sm text-foreground/60 mb-3">{t('home.cards.projects.subtitle') || 'Explore my projects'}</p>
          </div>
          <a href="/projects" className="text-sm accent-underline self-end focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">{t('home.cards.projects.cta') || 'Go to Projects →'}</a>
        </motion.div>

        {/* Contact Card - Row 3, Col 2 */}
        <motion.div
          variants={itemVariants}
          className="md:col-start-2 md:row-start-3"
        >
          <ContactCard /> {/* Assuming ContactCard applies cardBaseStyle internally */}
        </motion.div>

        {/* Letterboxd Card - Row 3, Col 3 */}
        <motion.div
          variants={itemVariants}
          className="md:col-start-3 md:row-start-3"
        >
          <LetterboxdCard /> {/* Assuming internal style */}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default BentoContainer; 