// Lazy Font Loader Utility

interface FontFaceConfig {
  family: string;
  style?: string;
  weight?: string | number;
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  source: string;
}

const fontCache: Set<string> = new Set();

/**
 * Lazy loads a web font and applies it to the document
 */
export async function loadFont({
  family,
  style = 'normal',
  weight = 'normal',
  display = 'swap',
  source
}: FontFaceConfig): Promise<void> {
  // Create a unique key for this font configuration
  const fontKey = `${family}-${style}-${weight}`;
  
  // Skip if already loaded
  if (fontCache.has(fontKey)) return;
  
  // Add to cache immediately to prevent duplicate loading
  fontCache.add(fontKey);

  try {
    // Create a new FontFace object
    const font = new FontFace(family, `url(${source})`, {
      style,
      weight: String(weight),
      display
    });
    
    // Start loading the font
    const loadedFont = await font.load();
    
    // Add the font to the document
    document.fonts.add(loadedFont);
    
    // Update cache status
    console.log(`Font ${family} (${style}, ${weight}) loaded successfully`);
  } catch (error) {
    // Remove from cache if loading failed
    fontCache.delete(fontKey);
    console.error(`Failed to load font ${family}:`, error);
  }
}

/**
 * Preload essential fonts as soon as possible
 */
export function preloadCriticalFonts(): void {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  const preloadLinks = [
    // Inter font - adjust paths as needed
    { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
  ];
  
  // Create preload link elements
  preloadLinks.forEach(link => {
    const linkElement = document.createElement('link');
    linkElement.rel = link.rel;
    linkElement.href = link.href;
    linkElement.as = link.as;
    linkElement.crossOrigin = 'anonymous';
    document.head.appendChild(linkElement);
  });
}

/**
 * Load non-critical fonts when the page is idle
 */
export function loadNonCriticalFonts(): void {
  if (typeof window === 'undefined') return;
  
  // Use requestIdleCallback if available, or fall back to timeout
  const requestIdleCallback = 
    window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1));
  
  requestIdleCallback(() => {
    // Add additional fonts here
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@800;900&display=swap';
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
} 