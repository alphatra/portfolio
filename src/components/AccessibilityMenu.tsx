import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming Button component exists
// import { Switch } from '@/components/ui/switch'; // Removed Switch import
import { cn } from '@/lib/utils';

// Define available text sizes
const textSizes = [
  { name: 'Small', value: 'sm', className: 'text-size-sm' },
  { name: 'Default', value: 'base', className: 'text-size-base' },
  { name: 'Large', value: 'lg', className: 'text-size-lg' },
];

// Helper function to safely access localStorage
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

// Helper function to safely set localStorage
const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};


interface AccessibilityMenuProps {
  onClose: () => void; // Function to close the menu
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ onClose }) => {
  // --- State Management ---
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => getLocalStorageItem('accessibility-high-contrast', false));
  const [selectedTextSize, setSelectedTextSize] = useState<string>(() => getLocalStorageItem('accessibility-text-size', 'base'));

  // --- Effects to apply settings ---
  useEffect(() => {
    // Apply high contrast class
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    setLocalStorageItem('accessibility-high-contrast', isHighContrast);
  }, [isHighContrast]);

  useEffect(() => {
    // Remove previous size classes and add current one
    textSizes.forEach(size => {
      document.documentElement.classList.remove(size.className);
    });
    const currentSize = textSizes.find(size => size.value === selectedTextSize);
    if (currentSize) {
      document.documentElement.classList.add(currentSize.className);
    } else {
      // Default to base if something goes wrong
      document.documentElement.classList.add('text-size-base');
    }
    setLocalStorageItem('accessibility-text-size', selectedTextSize);
  }, [selectedTextSize]);

  // --- Handlers ---
  const handleContrastChange = (checked: boolean) => {
    setIsHighContrast(checked);
  };

  const handleTextSizeChange = (value: string) => {
    setSelectedTextSize(value);
  };

  return (
    <div 
      className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-lg p-4 z-50" // Changed background, increased width
      aria-labelledby="accessibility-menu-title"
    >
      <h3 id="accessibility-menu-title" className="text-sm font-medium text-popover-foreground mb-4">
        Accessibility Settings
      </h3>

      {/* High Contrast Toggle */}
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="high-contrast-toggle" className="text-sm text-popover-foreground cursor-pointer">
          High Contrast
        </label>
        {/* Replaced Switch with a styled checkbox */}
        <input 
          type="checkbox"
          role="switch" // Use role="switch" for semantics
          id="high-contrast-toggle"
          checked={isHighContrast}
          onChange={(e) => handleContrastChange(e.target.checked)}
          aria-label="Toggle high contrast mode"
          className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 checked:bg-primary dark:checked:bg-primary"
        />
        {/* Basic styling for the toggle switch appearance could be added here or in global CSS */}
        {/* Example inline style or dedicated class needed for the inner circle movement */}
      </div>

      {/* Text Size Adjustment */}
      <div className="mb-2">
        <p className="text-sm text-popover-foreground mb-2">Text Size</p>
        <div className="flex items-center justify-between space-x-2">
          {textSizes.map((size) => (
            <Button
              key={size.value}
              variant={selectedTextSize === size.value ? 'default' : 'outline'}
              size="sm" // Make buttons smaller
              onClick={() => handleTextSizeChange(size.value)}
              className={cn(
                "flex-1 text-xs px-2", // Ensure consistent padding and text size
                selectedTextSize === size.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background hover:bg-muted'
              )}
              aria-pressed={selectedTextSize === size.value}
            >
              {size.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Optional: Add a close button if needed, though clicking outside already closes it */}
      {/* <Button variant="ghost" size="sm" onClick={onClose} className="w-full mt-2">Close</Button> */}
    </div>
  );
};

export default AccessibilityMenu; 