'use client';

import Link from 'next/link';

type Topic = {
  id: string;
  slug: string;
  label: string;
};

type TopicChipsProps = {
  topics: Topic[];
  selectedSlug?: string;
};

export default function TopicChips({ topics, selectedSlug }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          !selectedSlug 
            ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)]' 
            : 'glass text-on-surface hover:glass-hover'
        }`}
      >
        All Feed
      </Link>
      
      {topics.map((topic) => {
        const isSelected = selectedSlug === topic.slug;
        return (
          <Link
            key={topic.id}
            href={`/?topic=${topic.slug}`}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isSelected 
                ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)]' 
                : 'glass text-on-surface hover:glass-hover'
            }`}
          >
            {topic.label}
          </Link>
        );
      })}
    </div>
  );
}
