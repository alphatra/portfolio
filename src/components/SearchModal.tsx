import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { cn } from '@/lib/utils';
import { Home, Book, FolderGit2, User, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react'; // Example icons

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
  // Optional: Add logic to dynamically load items or perform actual search

  // Close on Escape key
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange, open]);

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={onOpenChange}
      label="Global Command Menu"
      // Apply custom styling using Tailwind
      className={cn(
        "fixed inset-0 z-[100]", // Ensure it's on top
        "backdrop-blur-sm bg-black/60", // Background overlay
        "flex items-start justify-center pt-[15vh]" // Center the dialog
      )}
    >
      <Command 
        className={cn(
          "bg-gray-950 border border-gray-800 rounded-lg shadow-xl",
          "w-[90vw] max-w-[600px]", // Responsive width
          "overflow-hidden flex flex-col"
        )}
      >
        <Command.Input 
          placeholder="Type a command or search..."
          className={cn(
            "w-full px-4 py-3 text-lg bg-transparent",
            "border-b border-gray-800",
            "text-gray-200 placeholder:text-gray-500",
            "focus:outline-none flex-shrink-0"
          )}
        />
        <Command.List className="max-h-[400px] overflow-y-auto p-2 flex-grow">
          <Command.Empty className="p-4 text-center text-gray-500">No results found.</Command.Empty>

          {/* Example Groups and Items */}
          <Command.Group heading="Navigation" className="text-xs text-gray-500 px-2 py-1.5">
            <Command.Item onSelect={() => { onOpenChange(false); window.location.href = '/'; }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <Home className="w-4 h-4" /> Home
            </Command.Item>
            <Command.Item onSelect={() => { onOpenChange(false); window.location.href = '/blog'; }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <Book className="w-4 h-4" /> Blog
            </Command.Item>
            {/* Add Projects, About, Guestbook similarly */}
             <Command.Item onSelect={() => { onOpenChange(false); document.getElementById('projects')?.scrollIntoView(); }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <FolderGit2 className="w-4 h-4" /> Projects
            </Command.Item>
             <Command.Item onSelect={() => { onOpenChange(false); document.getElementById('about')?.scrollIntoView(); }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <User className="w-4 h-4" /> About
            </Command.Item>
             <Command.Item onSelect={() => { onOpenChange(false); window.location.href = '/guestbook'; }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <MessageSquare className="w-4 h-4" /> Guestbook
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-gray-800 my-1" />

          <Command.Group heading="Links" className="text-xs text-gray-500 px-2 py-1.5">
            <Command.Item onSelect={() => { onOpenChange(false); window.open('#', '_blank'); }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <Github className="w-4 h-4" /> GitHub
            </Command.Item>
            <Command.Item onSelect={() => { onOpenChange(false); window.open('#', '_blank'); }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </Command.Item>
            <Command.Item onSelect={() => { onOpenChange(false); window.open('#', '_blank'); }} className="cmdk-item flex items-center gap-3 p-2 rounded-md text-gray-300 aria-selected:bg-gray-800 cursor-pointer">
              <Twitter className="w-4 h-4" /> Twitter
            </Command.Item>
          </Command.Group>

        </Command.List>
      </Command>
    </Command.Dialog>
  );
};

export default SearchModal; 