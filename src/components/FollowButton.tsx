'use client';

import { useState } from 'react';

export default function FollowButton({ topicId, initialFollowed }: { topicId: string, initialFollowed: boolean }) {
  const [isFollowed, setIsFollowed] = useState(initialFollowed);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFollow = async () => {
    setIsLoading(true);
    setIsFollowed(!isFollowed);

    try {
      const res = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, action: isFollowed ? 'unfollow' : 'follow' }),
      });

      if (!res.ok) {
        setIsFollowed(isFollowed);
      }
    } catch (e) {
      setIsFollowed(isFollowed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleFollow} 
      disabled={isLoading}
      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
        isFollowed 
          ? 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant border border-white/5' 
          : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-[0_0_10px_rgba(173,198,255,0.1)]'
      }`}
    >
      {isFollowed ? 'Following' : 'Follow Topic'}
    </button>
  );
}
