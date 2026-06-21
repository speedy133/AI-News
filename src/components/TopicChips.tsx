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
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !selectedSlug
            ? 'bg-gray-900 text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        All News
      </Link>
      
      {topics.map((topic) => {
        const isSelected = selectedSlug === topic.slug;
        return (
          <Link
            key={topic.id}
            href={`/?topic=${topic.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {topic.label}
          </Link>
        );
      })}
    </div>
  );
}
