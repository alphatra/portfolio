import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Type, Eye, MousePointer2, AlignJustify, X } from 'lucide-react';

// --- Configuration ---
const textSizes = [
  { name: 'Small', value: 'sm', label: 'A-' },
  { name: 'Default', value: 'base', label: 'A' },
  { name: 'Large', value: 'lg', label: 'A+' },
];

const lineHeights = [
  { name: 'Normal', value: 'normal', label: '1.0' },
  { name: 'Relaxed', value: 'relaxed', label: '1.5' },
  { name: 'Loose', value: 'loose', label: '2.0' },
];

const saturations = [
  { name: 'Normal', value: 'normal' },
  { name: 'Low', value: 'low' },
  { name: 'High', value: 'high' },
];

// --- Helper Functions ---
const getLocalStorageItem = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};

interface AccessibilityMenuProps {
  onClose: () => void;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ onClose }) => {
  // --- State ---
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => getLocalStorageItem('acc-high-contrast', false));
  const [isDyslexiaFont, setIsDyslexiaFont] = useState<boolean>(() => getLocalStorageItem('acc-dyslexia-font', false));
  const [textSize, setTextSize] = useState<string>(() => getLocalStorageItem('acc-text-size', 'base'));
  const [lineHeight, setLineHeight] = useState<string>(() => getLocalStorageItem('acc-line-height', 'normal'));
  const [saturation, setSaturation] = useState<string>(() => getLocalStorageItem('acc-saturation', 'normal'));
  const [cursorSize, setCursorSize] = useState<string>(() => getLocalStorageItem('acc-cursor-size', 'normal'));

  // --- Effects ---

  // High Contrast
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    setLocalStorageItem('acc-high-contrast', isHighContrast);
  }, [isHighContrast]);

  // Dyslexia Font
  useEffect(() => {
    document.documentElement.classList.toggle('dyslexia-font', isDyslexiaFont);
    setLocalStorageItem('acc-dyslexia-font', isDyslexiaFont);
  }, [isDyslexiaFont]);

  // Text Size
  useEffect(() => {
    textSizes.forEach(s => document.documentElement.classList.remove(`text-size-${s.value}`));
    document.documentElement.classList.add(`text-size-${textSize}`);
    setLocalStorageItem('acc-text-size', textSize);
  }, [textSize]);

  // Line Height
  useEffect(() => {
    lineHeights.forEach(s => document.documentElement.classList.remove(`line-height-${s.value}`));
    document.documentElement.classList.add(`line-height-${lineHeight}`);
    setLocalStorageItem('acc-line-height', lineHeight);
  }, [lineHeight]);

  // Saturation
  useEffect(() => {
    document.documentElement.classList.remove('saturation-low', 'saturation-high');
    if (saturation !== 'normal') {
      document.documentElement.classList.add(`saturation-${saturation}`);
    }
    setLocalStorageItem('acc-saturation', saturation);
  }, [saturation]);

  // Cursor Size
  useEffect(() => {
    document.documentElement.classList.toggle('cursor-large', cursorSize === 'large');
    setLocalStorageItem('acc-cursor-size', cursorSize);
  }, [cursorSize]);

  return (
    <div
      className="absolute right-0 mt-4 w-80 bg-background/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2"
      aria-labelledby="accessibility-menu-title"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 id="accessibility-menu-title" className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-accent" />
          Display Settings
        </h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">

        {/* Font & Text Group */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Type className="w-3 h-3" /> Typography
          </label>

          {/* Text Size */}
          <div className="grid grid-cols-3 gap-2">
            {textSizes.map((size) => (
              <Button
                key={size.value}
                variant={textSize === size.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTextSize(size.value)}
                className={cn("w-full", textSize === size.value && "bg-accent text-white hover:bg-accent/90")}
              >
                {size.label}
              </Button>
            ))}
          </div>

          {/* Line Height */}
          <div className="grid grid-cols-3 gap-2">
            {lineHeights.map((lh) => (
              <Button
                key={lh.value}
                variant={lineHeight === lh.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLineHeight(lh.value)}
                className={cn("w-full", lineHeight === lh.value && "bg-accent text-white hover:bg-accent/90")}
              >
                <AlignJustify className={cn("w-4 h-4", {
                  "scale-y-75": lh.value === 'normal',
                  "scale-y-100": lh.value === 'relaxed',
                  "scale-y-125": lh.value === 'loose',
                })} />
              </Button>
            ))}
          </div>

          {/* Dyslexia Font Toggle */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Dyslexia Friendly</span>
            <input
              type="checkbox"
              checked={isDyslexiaFont}
              onChange={(e) => setIsDyslexiaFont(e.target.checked)}
              className="toggle-checkbox h-5 w-9"
            />
          </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Visuals Group */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-3 h-3" /> Visuals
          </label>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">High Contrast</span>
            <input
              type="checkbox"
              checked={isHighContrast}
              onChange={(e) => setIsHighContrast(e.target.checked)}
              className="toggle-checkbox h-5 w-9"
            />
          </div>

          {/* Saturation */}
          <div className="grid grid-cols-3 gap-2">
            {saturations.map((sat) => (
              <Button
                key={sat.value}
                variant={saturation === sat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSaturation(sat.value)}
                className={cn("w-full text-xs", saturation === sat.value && "bg-accent text-white hover:bg-accent/90")}
              >
                {sat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Cursor Group */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <MousePointer2 className="w-3 h-3" /> Cursor
          </label>

          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Large Cursor</span>
            <input
              type="checkbox"
              checked={cursorSize === 'large'}
              onChange={(e) => setCursorSize(e.target.checked ? 'large' : 'normal')}
              className="toggle-checkbox h-5 w-9"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccessibilityMenu; 