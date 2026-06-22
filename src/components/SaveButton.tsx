'use client';

import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

export default function SaveButton({ articleId, initialSaved }: { articleId: string, initialSaved: boolean }) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  const toggleSave = async () => {
    setIsLoading(true);
    // Optimistic UI update
    setIsSaved(!isSaved);

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, action: isSaved ? 'unsave' : 'save' }),
      });

      if (!res.ok) {
        // Revert on failure
        setIsSaved(isSaved);
        console.error('Failed to save article');
      }
    } catch (e) {
      setIsSaved(isSaved);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleSave} 
      disabled={isLoading}
      className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
        isSaved 
          ? 'text-primary drop-shadow-[0_0_8px_rgba(173,198,255,0.4)]' 
          : 'text-on-surface-variant hover:text-on-surface'
      }`}
      aria-label={isSaved ? "Unsave article" : "Save article"}
    >
      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
      <span>{isSaved ? 'Saved' : 'Save for later'}</span>
    </button>
  );
}
