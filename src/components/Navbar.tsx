import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import SearchModal from './SearchModal'; // Import the modal
import AccessibilityMenu from './AccessibilityMenu'; // Import new menu (uncommented)
import { Accessibility } from 'lucide-react'; // Corrected icon import
import { cn } from "@/lib/utils"; // Import cn for potential future use
import ClientThemeToggle from './ClientThemeToggle';

// Importujemy ClientThemeToggle, ale nie za pomocą importu ES6, tylko jako komponent Astro
// import ClientThemeToggle from './ClientThemeToggle.astro';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Guestbook', href: '/guestbook' },
];

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);
  const accessibilityMenuRef = useRef<HTMLDivElement>(null); // Ref for dropdown
  const accessibilityTriggerRef = useRef<HTMLButtonElement>(null); // Ref for trigger button

  // Effect to listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Effect to handle clicks outside the accessibility menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accessibilityMenuRef.current && 
        !accessibilityMenuRef.current.contains(event.target as Node) &&
        accessibilityTriggerRef.current &&
        !accessibilityTriggerRef.current.contains(event.target as Node)
      ) {
        setIsAccessibilityMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accessibilityMenuRef, accessibilityTriggerRef]);

  return (
    <>
      {/* Re-added backdrop-blur, changed bg to semi-transparent, border to semi-transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Left side: Logo/Name Placeholder - Use foreground color */}
          <div className="text-xl font-bold text-foreground">
            <a href="/" className="focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">Logo</a> {/* Replace with actual logo or name */}
          </div>

          {/* Center: Navigation Links - Use foreground color, remove neon hover */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side: Search Placeholder - Updated styles */}
          <div className="flex items-center space-x-4">
            {/* Use muted bg, border, foreground text/placeholder */}
            <input
              type="text"
              onClick={() => setIsSearchOpen(true)}
              placeholder="Press Ctrl+K"
              readOnly
              aria-label="Open search"
              className="bg-muted border border-border rounded-md py-1 px-3 text-sm text-foreground placeholder:text-foreground/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
            />
            
            <ClientThemeToggle />
            
            {/* Accessibility Menu Trigger Button */}
            <div className="relative">
              <button 
                ref={accessibilityTriggerRef} // Assign ref to button
                onClick={() => setIsAccessibilityMenuOpen(!isAccessibilityMenuOpen)}
                aria-label="Accessibility Settings"
                aria-haspopup="true"
                aria-expanded={isAccessibilityMenuOpen}
                className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
              >
                <Accessibility className="h-5 w-5 text-foreground" />
              </button>
              {/* Accessibility Menu - Rendered conditionally */}
              {isAccessibilityMenuOpen && (
                <div ref={accessibilityMenuRef}> {/* Added ref to the container div */}
                  <AccessibilityMenu onClose={() => setIsAccessibilityMenuOpen(false)} />
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
      {/* Render the modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar; 