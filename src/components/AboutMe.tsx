import * as React from 'react';
import { cn } from '@/lib/utils';
import { Atom, BrainCircuit, Sparkles, Code2 } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <div
      className={cn(
        'group relative flex flex-col h-full overflow-hidden rounded-xl',
        'bg-background/40 backdrop-blur-md border border-white/10',
        'hover:border-white/20 transition-all duration-500',
        'shadow-lg shadow-black/5'
      )}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8 z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">
            <Atom className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold font-heading tracking-tight">
            The Singularity of Code & Matter
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6 flex-grow">
          <p className="text-muted-foreground leading-relaxed">
            I view software engineering through the lens of <span className="text-foreground font-medium">Physics</span>.
            Just as entropy dictates the flow of energy, code complexity tends to increase over time.
            My goal is to apply the principles of <span className="text-foreground font-medium">optimization</span> and <span className="text-foreground font-medium">elegance</span> to reverse this trend.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <BrainCircuit className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">AI & Neural Architectures</h3>
                <p className="text-xs text-muted-foreground">
                  Exploring the intersection of deterministic algorithms and probabilistic models.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <Code2 className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Full-Stack Systems</h3>
                <p className="text-xs text-muted-foreground">
                  Building scalable, type-safe architectures with Rust, TypeScript, and Python.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Signature */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Researching & Building</span>
          </div>
          <div className="text-xs font-mono text-white/20">
            E = mc² + AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 