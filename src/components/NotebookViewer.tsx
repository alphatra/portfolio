import React from 'react';

interface NotebookViewerProps {
  children?: React.ReactNode;
}

export default function NotebookViewer({ children }: NotebookViewerProps) {
  return (
    <div className="notebook-viewer dark bg-neutral-950 rounded-lg p-4 overflow-x-auto">
      {children || (
        <div className="text-gray-400">
          Tu możesz pisać swoje eksperymenty, artykuły lub notatki. Obsługa notebooków została wyłączona.
        </div>
      )}
    </div>
  );
} 